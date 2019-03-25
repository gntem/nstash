import NstashEvent from './NstashEvent';

interface StreamingTransportInterface{
  readonly config: Object;
  readonly debugMode: boolean;
  readonly metrics: Object;

  setConfiguration(options: Object): Function;

  setDebugMode(mode: boolean): boolean;

  connect(): Promise<boolean>;

  disconnect(): Promise<boolean>;

  subscribe(options: Object): Promise<NstashEvent>;

  publish(event: NstashEvent): Promise<boolean>;

  publishAll(events: [NstashEvent]): Promise<[NstashEvent]> ;

  onDisconnect(cb: Function): undefined;

  onPublish(cb: Function): undefined;

  onPrePublish(cb: Function) : undefined;

  onPostPublish(cb: Function) : undefined;

  onConnect(cb: Function) : undefined;

  onReceive(data: any) : NstashEvent;

  onPostReceive(cb: Function) : undefined;

  getMetrics() : Object;

  measure(label: string, value: number) : boolean;

  healthcheck() : Promise<boolean>;
}

export default StreamingTransportInterface;