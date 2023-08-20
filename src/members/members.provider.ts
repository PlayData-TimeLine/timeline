import { DataSource } from 'typeorm';
import { Member } from '../members/entities/member.entity';

export const membersProviders = [
    {
        provide: 'MEMBER_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(Member),
        inject: ['DATA_SOURCE'],
    },
];