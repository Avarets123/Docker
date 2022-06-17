import { UserEntity } from '@app/user/entity/user.entity';
import { PrimaryGeneratedColumn, Column, Entity, BeforeUpdate, ManyToMany, JoinTable, ManyToOne } from 'typeorm'



@Entity({ name: 'groups' })
export class GroupEntity {

    @PrimaryGeneratedColumn()
    id: number;


    @Column({ unique: true })
    name: string;




    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createAt: Date

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    updateAt: Date


    @BeforeUpdate()
    updateTimeStamp() {
        this.updateAt = new Date();
    }


    @ManyToOne(() => UserEntity, user => user.createGroup, { eager: true })
    creator: UserEntity;




}
