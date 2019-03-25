import * as pinoLog from 'pino';

import Blacklist from './Blacklist';
import { Transform } from 'stream';

const log = pinoLog({ name: 'filter-resolver' });

class FilterResolver{
  private filters: Map<string, Transform>;

  constructor() {
    this.filters = new Map();
  }

  registerFilter(name:string, filter: any) {
    log.debug('Registering filter ', { name });
    this.filters.set(name, filter);
  }

  resolveProcessor(name: string) {
    if (!this.filters.has(name)) {
      log.error('filter not found', { name });
      throw new Error('Unable to resolve filter. Filter not registered or not found.');
    }
    return this.filters.get(name);
  }

  getAll(): string[] {
    return Array.from(this.filters.keys());
  }
}

const filterResolverInstance = new FilterResolver();

filterResolverInstance.registerFilter('blacklist', Blacklist);

export default filterResolverInstance;