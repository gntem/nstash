import { Stream, TransformOptions } from 'stream';
import {
  BaseCodecInterface,
  BaseCodecEncoderInterface,
  BaseCodecDecoderInterface,
 } from '../interfaces/codec';

class CodecJsonEncoder extends Stream.Transform implements BaseCodecEncoderInterface{
  constructor(streamOptions?: TransformOptions) {
    super({ readableObjectMode: true, writableObjectMode: false });
  }

  // tslint:disable-next-line:function-name
  _transform(chunk: any, encoding: BufferEncoding, callback: Function) {
    this.push(JSON.stringify(chunk.toString('utf8')));
    callback(null);
  }
}

class CodecJsonDecoder extends Stream.Transform implements BaseCodecDecoderInterface{
  constructor(streamOptions?: TransformOptions) {
    super({ objectMode: true });
  }
  // tslint:disable-next-line:function-name
  _transform(chunk: any, encoding: BufferEncoding, callback: Function) {
    console.log('>>> decoder', chunk.toString('utf8'), typeof chunk);
    this.push(chunk);
    callback(null);
  }
}

class CodecJson implements BaseCodecInterface{
  newEncoder(options?: TransformOptions) {
    return new CodecJsonEncoder(options);
  }
  newDecoder(options?: TransformOptions) {
    return new CodecJsonDecoder(options);
  }
}

export default CodecJson;