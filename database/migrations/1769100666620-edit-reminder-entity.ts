import { MigrationInterface, QueryRunner } from 'typeorm';

export class EditReminderEntity1769100666620 implements MigrationInterface {
  name = 'EditReminderEntity1769100666620';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "reminders" DROP COLUMN "title"`);
    await queryRunner.query(`ALTER TABLE "reminders" DROP COLUMN "amount"`);
    await queryRunner.query(`ALTER TABLE "reminders" DROP COLUMN "currency"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "reminders" ADD "currency" character(3)`,
    );
    await queryRunner.query(
      `ALTER TABLE "reminders" ADD "amount" numeric(14,2)`,
    );
    await queryRunner.query(
      `ALTER TABLE "reminders" ADD "title" character varying(160) NOT NULL`,
    );
  }
}
