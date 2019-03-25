import * as fs from 'fs';
import * as assert from 'assert';
import * as joi from 'joi';
import { pipeline, PassThrough } from 'stream';

import codecs from './codecs';
import inputs from './processors/inputs';
import filters from './processors/filters';
import outputs from './processors/outputs';
import transports from './processors/transports';

const config = require('../pipelines/basic.json');

const configSchema = joi
  .object()
  .keys({
    inputs: joi
      .object()
      .pattern(
        joi.string().allow(inputs.getAll()),
        joi.object().required(),
      )
      .required(),
    filters: joi
      .object()
      .pattern(
        joi.string().allow(filters.getAll()),
        joi.object().required(),
      ),
    outputs: joi
      .object()
      .pattern(
        joi.string().allow(outputs.getAll()),
        joi.object().required(),
      )
      .required(),
    transports: joi
      .object()
      .pattern(
        joi.string().allow(Array.from(transports.keys())),
        joi.object().required(),
      ),
  })
  .required();

joi.validate(
  config,
  configSchema,
  (validationError: joi.ValidationError, value: any) => {
    if (validationError) {
      throw validationError;
    }
  },
);

const InputStdin = inputs.resolveProcessor('stdin');
const OutputStdout = outputs.resolveProcessor('stdout');
const CodecJson = codecs.resolveCodec('json');

const codec = new CodecJson();
const xin  = new InputStdin(undefined, { codec });
const xout = new OutputStdout(undefined, { codec });

pipeline(
    xin
  , xout,
);