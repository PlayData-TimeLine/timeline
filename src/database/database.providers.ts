import { DataSource } from 'typeorm';

import * as dotenv from 'dotenv'

//TODO 환경변수 작업해주기. 


const config = dotenv.config().parsed 
// 여기선 이렇게 사용해야함....


export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'mysql',
        host: config.DATABASE_HOST,
        port: Number(config.DATABASE_PORT),
        username: config.DATABASE_USERNAME,
        password: config.DATABASE_PASSWORD,
        database: config.DATABASE_DATABASE,
        logging: true,  
        entities: [
          __dirname + '/../**/*.entity{.ts,.js}',
        ],
        synchronize: true
      });

      return await dataSource.initialize();
    },
  },
]; 