import processor from '../../interfaces/processor';
import { Duplex, DuplexOptions, Stream, ReadableOptions, WritableOptions } from 'stream';
import { BaseCodecInterface } from '../../interfaces/codec';

class OutputStdout extends Stream.Writable{
  private readonly options?: {codec: BaseCodecInterface, codecOptions?: Object};

  constructor(
    streamOptions: WritableOptions | undefined,
    options: {
      codec: BaseCodecInterface, codecOptions?: Object,
    }) {

    super(streamOptions);

    const { codec, codecOptions } = options;

    this.options = options;

    return codec.newEncoder().pipe(process.stdout);

  }
}

export default OutputStdout;