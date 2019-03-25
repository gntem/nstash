import BaseProcessor from '../../interfaces/BaseProcessor';
import { DuplexOptions, Duplex } from 'stream';
import { BaseCodecInterface } from '../../interfaces/Codec';

const processorName = 'stdin';

class InputStdin extends Duplex implements BaseProcessor{
  name: string;

  private readonly options?: {codec: BaseCodecInterface, codecOptions?: Object};

  constructor(
    streamOptions?: DuplexOptions | undefined,
    options: {
      codec: BaseCodecInterface, codecOptions?: Object,
    }) {

    super(streamOptions);

    this.name = processorName;

    const { codec, codecOptions } = options;

    return process.stdin.pipe(codec.newDecoder(codecOptions));
  }
}

export default InputStdin;