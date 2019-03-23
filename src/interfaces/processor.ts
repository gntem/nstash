
import nstashevent from './nstashevent';
import * as joi from 'joi';

interface BaseProcessor{
  readonly simulate?: boolean;
  readonly options: Object;

  newProcessor?(options: Map<string, any>): Function;

  validateOptions(options: Object): joi.ValidationError | void;

  receive(processor: BaseProcessor, event: nstashevent): any;

  send(event: nstashevent): any;

  setSimulate?(sim: boolean): BaseProcessor;
}

export default BaseProcessor;