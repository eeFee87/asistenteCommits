import { intro, outro, text, select, confirm } from '@clack/prompts';
import { COMMIT_TYPES } from './commit-types.js';
import colors from 'picocolors';
import { getChangedFiles, getStagedFiles, gitCommit } from './git.js';
import { trytm } from '@bdsqqq/try';

const [changedFiles, errorChangedFiles] = await trytm(getChangedFiles());
const [stagedFiles, errorStagedFiles] = await trytm(getStagedFiles());

intro(colors.inverse('Asistente para la creación de commits'));

if (errorChangedFiles ?? errorStagedFiles) {
  outro(colors.red('Error: Comprueba que estás en un repositorio de git'));
  process.exit(1);
}

/* if (stagedFiles.length === 0) {
  outro(colors.red('Error: No hay archivos en el stage'));
  process.exit(1);
} */

const commitType = await select({
  message: colors.cyan('Selecciona el tipo de commit:'),
  options: Object.entries(COMMIT_TYPES).map(([key, value]) => ({
    value: key,
    label: ` ${key.padEnd(8, ' ')} · ${value.description}`,
  })),
});

const commitMessage = await text({
  message: 'Introduce el mensaje del commit:',
  placeholder: 'Add new feature',
});
const { release } = COMMIT_TYPES[commitType];
let breakingChange = false;
if (release) {
  breakingChange = await confirm({
    initialValue: false,
    message: `¿Tiene este commit cambios que rompen la compatibilidad anterior?
    
    ${colors.gray(
      'Si la repuesta es sí, deberías crear un commit con el tipo "Breaking Change" y al hacer release se publicará una versión major'
    )}`,
  });
}

let commit = `${commitType}: ${commitMessage}`;

commit = breakingChange ? `${commit} [breaking change]` : commit;

const shouldContinue = await confirm({
  initialValue: true,
  message: `¿Quieres crear el commit con el siguiente mensaje?
  ${colors.green(colors.bold(commit))}
  
  ¿Confirmas?`,
});

if (!shouldContinue) {
  outro(colors.yellow('No se ha creado el commit'));
  process.exit(0);
}

//await gitCommit({ commit });

outro('Gracias por usar el asistente');
