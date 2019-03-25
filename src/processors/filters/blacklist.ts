import * as joi from 'joi';
import { Stream } from 'stream';

import nstashevent from '../../interfaces/NstashEvent';
import processor from '../../interfaces/BaseProcessor';

const optionsSchema = joi.object().keys({
  field: joi.string().default(''),
  terms: joi.array().items(joi.string()).default([]),
});

class BlacklistFilter extends Stream.Transform{
  private readonly name = 'blacklist';
  private readonly options: { field: string, terms: [string]};

  public constructor(options: {field: string, terms:[string]}) {
    super();
    this.validateOptions(options);
    this.options = options;
  }

  validateOptions(options: Object) {
    joi.validate(options, optionsSchema, (validationError: joi.ValidationError, value: any) => {
      if (validationError) {
        throw validationError;
      }
    });
  }

  // tslint:disable-next-line: function-name
  transform(event: nstashevent, encoding: BufferEncoding, callback: Function): void {
    const { field: optField, terms: optTerms } = this.options;
    event.fields().forEach((eventField: {name: string, value: any}) => {
      if (eventField.name === optField && Array.isArray(eventField.value)) {
        eventField.value = eventField.value.filter(
          (value: string) => !optTerms.includes(value));
      }
    });
    callback(null, event);
  }
}

export default BlacklistFilter;