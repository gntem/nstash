import { Transform, TransformOptions } from 'stream';

import NstashEvent from './NstashEvent';

interface BaseCodecEncoderInterface extends Transform {}

interface BaseCodecDecoderInterface extends Transform  {}

interface BaseCodecInterface {
  name: string;
  newEncoder(options ? : TransformOptions) : BaseCodecEncoderInterface;
  newDecoder(options ? : TransformOptions) : BaseCodecDecoderInterface;
}

export {
  BaseCodecInterface,
  BaseCodecEncoderInterface,
  BaseCodecDecoderInterface,
};