import nstashevent from './nstashevent';
import { Transform, TransformOptions } from 'stream';

interface BaseCodecEncoderInterface extends Transform {}

interface BaseCodecDecoderInterface extends Transform  {}

interface BaseCodecInterface {
  newEncoder(options?: TransformOptions): BaseCodecEncoderInterface;
  newDecoder(options?: TransformOptions): BaseCodecDecoderInterface;
}

export {
  BaseCodecInterface,
  BaseCodecEncoderInterface,
  BaseCodecDecoderInterface,
};