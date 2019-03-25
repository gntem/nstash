import { Stream, TransformOptions } from 'stream';

import {
  BaseCodecInterface,
  BaseCodecEncoderInterface,
  BaseCodecDecoderInterface,
 } from '../interfaces/Codec';

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
    this.push(chunk);
    callback(null);
  }
}

class CodecJson implements BaseCodecInterface{
  name = 'json';
  newEncoder(options?: TransformOptions) {
    return new CodecJsonEncoder(options);
  }
  newDecoder(options?: TransformOptions) {
    return new CodecJsonDecoder(options);
  }
}

export default CodecJson;