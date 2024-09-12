/* eslint-disable prettier/prettier */
import { Module, Global } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { MongoClient } from 'mongodb';

import config from '../config';

const API_KEY = '1234434';
const API_KEY_PROD = 'PROD12312';

@Global()
@Module({
  imports: [
    // MongooseModule.forRoot('mongodb://localhost:27017', {
    //   dbName: 'ecommerce',
    // }),
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigType<typeof config>) => {
        const { connection, host, port, dbName } = configService.mongo;
        return {
          uri: `${connection}://${host}:${port}`,
          dbName,
        };
      },
      inject: [config.KEY],
    }),
  ],
  providers: [
    {
      provide: 'API_KEY',
      useValue: process.env.NODE_ENV === 'prod' ? API_KEY_PROD : API_KEY,
    },
    {
      provide: 'MONGO',
      useFactory: async (configService: ConfigType<typeof config>) => {
        const { connection, host, port } = configService.mongo;
        const uri = `${connection}://${host}:${port}/`;
        const client = new MongoClient(uri);
        await client.connect();
        const database = client.db('ecommerce');
        return database;
      },
      inject: [config.KEY],
    },
  ],
  exports: ['API_KEY', 'MONGO', MongooseModule],
})
export class DatabaseModule {}
