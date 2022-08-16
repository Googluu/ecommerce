/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { HttpModule, HttpService } from '@nestjs/axios';
import * as Joi from 'joi';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';
import { enviroments } from './enviroments';
import config from './config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: enviroments[process.env.NODE_ENV] || '.env', // para que traiga el archivo en solicitado puede ser para desarrollo, production etc.. si no trae ninguno traer el archivo .env por defecto
      load: [config], // para cargar la configuracion de las variables de ambiente con tipado
      isGlobal: true, // para que sea global en toda la aplicacion
      validationSchema: Joi.object({
        API_KEY: Joi.number().required(),
        DATABASE_NAME: Joi.string().required(),
        DATABASE_PORT: Joi.number().required(),
      }),
    }),
    HttpModule,
    ProductsModule,
    UsersModule,
    DatabaseModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      // tiene las caracteristicas de ser asicrono y de recibir inyeccion de dependecias
      provide: 'TASKS',
      useFactory: async (http: HttpService) => {
        const tasks = await http.get('https://jsonplaceholder.typicode.com/todos')
          .toPromise()
        return tasks.data;
      },
      inject: [HttpService],
    }
  ],
})
export class AppModule { }
