import {MigrationInterface, QueryRunner} from "typeorm";

export class UserPresence1606129980285 implements MigrationInterface {
    name = 'UserPresence1606129980285'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "present" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`COMMENT ON COLUMN "user"."createDateTime" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "user"."lastChangedDateTime" IS NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`COMMENT ON COLUMN "user"."lastChangedDateTime" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "user"."createDateTime" IS NULL`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "present"`);
    }

}
