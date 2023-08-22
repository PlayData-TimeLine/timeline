import { DataSource } from 'typeorm';


//TODO 환경변수 작업해주기. 

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: '1q2w3e4r',
        database: 'test3',
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