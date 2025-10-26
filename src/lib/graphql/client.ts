import { GraphQLClient } from 'graphql-request';

// Server-side only environment variables (no NEXT_PUBLIC_ prefix)
// These are never exposed to the browser
const endpoint = process.env.HYGRAPH_URL || '';
const token = process.env.HYGRAPH_TOKEN || '';

if (!endpoint) {
  console.warn('HYGRAPH_URL is not set. Hygraph provider will not work.');
}

export const hygraphClient = new GraphQLClient(endpoint, {
  headers: {
    ...(token && { Authorization: `Bearer ${token}` }),
  },
});
