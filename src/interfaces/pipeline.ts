import BaseProcessor from './BaseProcessor';

interface Pipeline {
  readonly processors: [BaseProcessor];
  readonly configuration: Map<string, any>;
  readonly debugMode: boolean;
  readonly metrics: [Object];
}