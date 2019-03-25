import * as pinoLog from 'pino';

import OutputStdout from './OutputStdout';
import BaseProcessor from '../../interfaces/BaseProcessor';

const log = pinoLog({ name: 'output-processor-resolver' });

class ProcessorResolver{
  private processors: Map<string, BaseProcessor>;

  constructor() {
    this.processors = new Map();
  }

  registerProcessor(processor: BaseProcessor) {
    const { name } = processor;
    log.debug('Registering processor ', { name });
    this.processors.set(name, processor);
  }

  resolveProcessor(name: string) {
    if (!this.processors.has(name)) {
      log.error('processor not found', { name });
      throw new Error('Unable to resolve processor. Processor not registered or not found.');
    }
    return this.processors.get(name);
  }

  getAll(): string[] {
    return Array.from(this.processors.keys());
  }
}

const processorResolverInstance = new ProcessorResolver();

processorResolverInstance.resolveProcessor(new OutputStdout());

export default processorResolverInstance;