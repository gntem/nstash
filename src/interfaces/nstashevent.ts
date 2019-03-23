interface NStashEventInterface{
  readonly eventId: string;

  setEventId(id: string): NStashEventInterface;
  setData(data: Map<string, any>): NStashEventInterface;
  setContext(data: Map<string, any>): NStashEventInterface;

  getEventId(): string;
  getData(): Map<string, any>;
  getContext(): Map<string, any>;
  getTimestamp(): string;

  fields(): [{name: string, value: any}];
}

export default NStashEventInterface;