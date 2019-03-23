import redis from './redis';

const transports = new Map();

transports.set('redis', redis);

export default transports;
