import json from '../json';
import * as streamtest from 'streamtest';

const chunks = [
    { key1: 'value1', key2: 'value2' }
    , { key3: 'value3', key4: 'value4' }];

const instance = new json();

describe('[Codec] - json', () => {
  test('codec encode', (done) => {
    const encoder = instance.newEncoder();
    streamtest.v2.fromObjects(chunks, 100)
      .pipe(encoder)
      .pipe(streamtest.v2.toText((err, output) => {
        expect(output).toStrictEqual(JSON.stringify(chunks));
        done();
      }));
  });
  test('codec decode', (done) => {
    const decoder = instance.newDecoder();
    streamtest.v2.fromChunks(chunks.map(item => JSON.stringify(item)), 100)
      .pipe(decoder)
      .pipe(streamtest.v2.toObjects((err, output) => {
        expect(output).toStrictEqual(chunks);
        done();
      }));

  });
});