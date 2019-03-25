import * as pinoLog from 'pino';

import CodecJSON from './CodecJSON';
import { BaseCodecInterface } from '../interfaces/codec';

const log = pinoLog({ name: 'codec-resolver' });

class CodecResolver{
  private codecs: Map<string, BaseCodecInterface>;

  constructor() {
    this.codecs = new Map();
  }

  registerCodec(codec: BaseCodecInterface) {
    const { name } = codec;
    log.debug('Registering codec ', { name });
    this.codecs.set(name, codec);
  }

  resolveCodec(name: string) {
    if (!this.codecs.has(name)) {
      log.error('Codec not found', { name });
      throw new Error('Unable to resolve codec. Codec not registered or not found.');
    }
    return this.codecs.get(name);
  }

  getAll(): string[] {
    return Array.from(this.codecs.keys());
  }
}

const codecResolverInstance = new CodecResolver();

codecResolverInstance.registerCodec(new CodecJSON());

export default codecResolverInstance;