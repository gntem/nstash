import * as joi from 'joi';

import NstashEvent from './NstashEvent';

interface BaseProcessor{
  readonly name: string;
  readonly simulate?: boolean;
  readonly options: Object;

  newProcessor?(options: Map<string, any>): Function;

  validateOptions(options: Object): joi.ValidationError | void;

  receive(processor: BaseProcessor, event: NstashEvent): any;

  send(event: NstashEvent): any;

  setSimulate?(sim: boolean): BaseProcessor;
}

export default BaseProcessor;