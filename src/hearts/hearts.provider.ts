import { DataSource } from 'typeorm';
import { Heart } from 'src/hearts/entities/heart.entity';

export const heartsProviders = [
    {
        provide: 'HEART_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(Heart),
        inject: ['DATA_SOURCE'],
    },
];