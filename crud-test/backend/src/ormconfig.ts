import { ConnectionOptions } from 'typeorm'
import { FollowEntity } from '@app/group/entity/follow.entity';
import { GroupEntity } from '@app/group/entity/group.entity';
import { FriendsEntity } from '@app/user/entity/friends.entity';
import { UserEntity } from '@app/user/entity/user.entity';

const portPostgres = +process.env.POSTGRES_URL;
const hostPostgres = process.env.POSTGRES_HOST

const config: ConnectionOptions = {
    type: 'postgres',
    host: hostPostgres,
    port: portPostgres,
    username: 'osman',
    password: '123',
    database: 'first',
    entities: [GroupEntity, UserEntity, FollowEntity, FriendsEntity],
    migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
    synchronize: false,
    cli: {
        migrationsDir: 'src/migrations'
    }

}


export default config;