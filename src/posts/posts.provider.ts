import { DataSource } from 'typeorm';
import { Post } from '../posts/entities/post.entity';

export const postsProviders = [
    {
        provide: 'POST_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(Post),
        inject: ['DATA_SOURCE'],
    },
];