import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema:
    process.env.NEXT_PUBLIC_HYGRAPH_URL ||
    'https://ap-south-1.cdn.hygraph.com/content/cmh4z7pqr00w807w7drhvwzai/master',
  documents: 'src/lib/graphql/**/*.graphql',
  generates: {
    'src/lib/graphql/generated/graphql.ts': {
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-graphql-request',
      ],
      config: {
        rawRequest: false,
        scalars: {
          DateTime: 'string',
          Date: 'string',
          Json: 'any',
        },
      },
    },
  },
};

export default config;
