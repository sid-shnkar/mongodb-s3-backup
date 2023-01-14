import { Module, Logger } from '@nestjs/common';
import { Global } from '@nestjs/common/decorators';
import { MongoClient } from 'mongodb';

@Global()
@Module({
  providers: [
    {
      provide: 'DATABASE_CONNECTION',
      useFactory: async () =>
        new Promise((resolve, reject) => {
          Logger.log('Connecting to Database');
          const MONGO_URL = process.env.MONGO_URL;

          MongoClient.connect(MONGO_URL, {}, async (error, client) => {
            if (error) {
              Logger.error('MongoDb Connection Failed');
              reject(error);
            } else {
              Logger.log('Database Connection Successful');
              let database = client.db(process.env.DATABASE_NAME);
              resolve(database);
            }
          });
        }),
    },
  ],
  exports: ['DATABASE_CONNECTION'],
})
export class DatabaseModule {}