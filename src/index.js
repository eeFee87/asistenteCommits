import { intro, outro, text, select } from '@clack/prompts';
import { COMMIT_TYPES } from './commit-types.js';
import colors from 'picocolors';
intro(colors.inverse('Asistente para la creación de commits'));

const commitType = await select({
  message: colors.cyan('Selecciona el tipo de commit:'),
  options: Object.entries(COMMIT_TYPES).map(([key, value]) => ({
    value: key,
    label: `${value.emoji} ${key} · ${value.description}`,
  })),
});
console.log(commitType);

const commitMsg = await text({
  message: 'Introduce el mensaje del commit:',
  placeholder: 'Add new feature',
});
console.log(commitMsg);

outro('Gracias por usar el asistente');
