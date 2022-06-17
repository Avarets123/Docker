import { MigrationInterface, QueryRunner } from "typeorm";

export class SeedDb1653733258638 implements MigrationInterface {
    name = 'SeedDb1653733258638'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            //password = 123
            `INSERT INTO users (name, email, password) VALUES ('osman', 'osman@gm.com', '$2b$09$CsxlTdmO.FmxAydWyQdjfOJi2Jsl5ZFGj86j8grQe7DzfG67P8zVq')`
        )

        await queryRunner.query(
            `INSERT INTO groups (name, "creatorId") VALUES ('first', 1)`
        )

        await queryRunner.query(
            `INSERT INTO groups (name, "creatorId") VALUES ('second', 1)`
        )
    }

    public async down(): Promise<void> { }

}
