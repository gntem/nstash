import processor from './processor';

interface Pipeline {
  readonly processors: [processor];
  readonly configuration: Map<string, any>;
  readonly debugMode: boolean;
  readonly metrics: [Object];
}