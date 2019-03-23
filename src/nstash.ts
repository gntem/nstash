import * as fs from 'fs';
import * as assert from 'assert';
import * as joi from 'joi';

import codecs from './codecs';
import inputs from './processors/inputs';
import filters from './processors/filters';
import outputs from './processors/outputs';
import transports from './processors/transports';
import { pipeline, PassThrough } from 'stream';
import stdin from './processors/inputs/stdin';
import stdout from './processors/outputs/stdout';
import json from './codecs/json';

const config = require('../pipelines/basic.json');

const configSchema = joi
  .object()
  .keys({
    inputs: joi
      .object()
      .pattern(
        joi.string().allow(Array.from(inputs.keys())),
        joi.object().required(),
      )
      .required(),
    filters: joi
      .object()
      .pattern(
        joi.string().allow(Array.from(filters.keys())),
        joi.object().required(),
      ),
    outputs: joi
      .object()
      .pattern(
        joi.string().allow(Array.from(outputs.keys())),
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

const InputStdin = inputs.get('stdin');
const OutputStdout = outputs.get('stdout');
const CodecJson = codecs.get('json');

const codec = new CodecJson();
const xin  = new InputStdin(undefined, { codec });

const xout = new OutputStdout(undefined, { codec });

pipeline(

    xin
  , xout,
    (err) => {
      console.log('done');
    },
);