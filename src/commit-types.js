export const COMMIT_TYPES = {
  fear: {
    description: 'Add new feature',
    release: true,
  },
  fix: {
    description: 'Submit a fix to a bug',
    release: true,
  },
  perf: {
    description: 'Improve perfomance',
    release: true,
  },
  docs: {
    description: 'Add or update documentation',
    release: false,
  },
  refactor: {
    description: 'Refactor code',
    release: true,
  },
  test: {
    description: 'Add or update test',
    release: false,
  },
  build: {
    description: 'Add or update build scripts',
    release: false,
  },
};
