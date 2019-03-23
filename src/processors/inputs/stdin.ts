import processor from '../../interfaces/processor';
import { Duplex, DuplexOptions, Stream, ReadableOptions } from 'stream';
import { BaseCodecInterface } from '../../interfaces/codec';

class InputStdin extends Stream.Duplex{
  private readonly options?: {codec: BaseCodecInterface, codecOptions?: Object};

  constructor(
    streamOptions: DuplexOptions | undefined,
    options: {
      codec: BaseCodecInterface, codecOptions?: Object,
    }) {

    super(streamOptions);

    const { codec, codecOptions } = options;

    return process.stdin.pipe(codec.newDecoder(codecOptions));
  }
}

export default InputStdin;