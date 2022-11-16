import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: 'https://api.oulunliikenne.fi/proxy/graphql',
  documents: 'src/**/*.ts',
  generates: {
    './src/generated/': {
      preset: 'client',
      plugins: [],
      config: {},
    },
  },
};

export default config;
