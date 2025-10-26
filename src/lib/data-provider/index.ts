import { DataProvider, DataSource } from './types';
import { LocalDataProvider } from './local-provider';
import { HygraphDataProvider } from './hygraph-provider';

export * from './types';

const getDataSource = (): DataSource => {
  // Server-side only environment variable (no NEXT_PUBLIC_ prefix)
  const source = process.env.DATA_SOURCE as DataSource;

  // Default to 'local' if not set or invalid
  if (source !== 'local' && source !== 'hygraph') {
    return 'local';
  }

  return source;
};

let dataProviderInstance: DataProvider | null = null;

export const getDataProvider = (): DataProvider => {
  if (dataProviderInstance) {
    return dataProviderInstance;
  }

  const source = getDataSource();

  console.log(`[Data Provider] Using ${source} data source`);

  switch (source) {
    case 'hygraph':
      dataProviderInstance = new HygraphDataProvider();
      break;
    case 'local':
    default:
      dataProviderInstance = new LocalDataProvider();
      break;
  }

  return dataProviderInstance;
};

// Helper functions for easy access
export const getSections = () => getDataProvider().getSections();
export const getIntroSection = () => getDataProvider().getIntroSection();
export const getSocialLinks = () => getDataProvider().getSocialLinks();
