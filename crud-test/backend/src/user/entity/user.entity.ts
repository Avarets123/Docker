import { GroupEntity } from "@app/group/entity/group.entity";
import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'users' })
export class UserEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    password: string;


    @OneToMany(() => GroupEntity, group => group.creator)
    createGroup: GroupEntity[];



}