import BaseProcessor from '../../interfaces/BaseProcessor';
import { Writable, WritableOptions } from 'stream';
import { BaseCodecInterface } from '../../interfaces/Codec';

const processorName = 'stdout';

class OutputStdout extends Writable implements BaseProcessor {
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