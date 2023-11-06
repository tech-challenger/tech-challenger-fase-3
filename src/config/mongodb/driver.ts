import { Injectable } from '@nestjs/common';
import { MongoClient, Db } from 'mongodb';

@Injectable()
export class MongoDriver {
  private singleton: Db;
  async connect() {
    if (this.singleton) return this.singleton;

    const client = new MongoClient(process.env.MONGO_URL, {
      monitorCommands: true,
    });

    //TODO: improve to enable and receive the list of event to listem by env config
    client.on('commandStarted', (event) => console.debug(event));
    //client.on('commandSucceeded', (event) => console.debug(event));
    //client.on('commandFailed', (event) => console.debug(event));

    try {
      await client.connect();
      console.log('Connected successfully to mongo server');
    } catch (error) {
      console.error('Failed to connect to mongo server', error);
      throw new Error(error);
    }

    this.singleton = client.db(process.env.MONGO_DATABASE);
    //TODO: improve to enable profile level
    //this.singleton.setProfilingLevel('slow_only');
    return this.singleton;
  }

  async collection(name: string) {
    return (await this.connect()).collection(name);
  }
}
