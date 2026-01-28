import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddCurrency1769442232412 implements MigrationInterface {
  name = 'AddCurrency1769442232412';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "balance_history" RENAME COLUMN "currency" TO "currency_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "bills" RENAME COLUMN "currency" TO "currency_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "expenses" RENAME COLUMN "currency" TO "currency_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "group_invoices" RENAME COLUMN "currency" TO "currency_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "debts" RENAME COLUMN "currency" TO "currency_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" RENAME COLUMN "default_currency" TO "default_currency_id"`,
    );
    await queryRunner.query(
      `CREATE TABLE "currencies" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "code" character varying(3) NOT NULL, "symbol" character varying(10), "name" character varying(100) NOT NULL, CONSTRAINT "UQ_9f8d0972aeeb5a2277e40332d29" UNIQUE ("code"), CONSTRAINT "PK_d528c54860c4182db13548e08c4" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_9f8d0972aeeb5a2277e40332d2" ON "currencies" ("code") `,
    );
    await queryRunner.query(
      `CREATE TABLE "group_invoice_share_items" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "share_id" uuid NOT NULL, "item_name" character varying(160) NOT NULL, "amount" numeric(14,2) NOT NULL, CONSTRAINT "PK_c0a3e3f005d72df37d5159678c3" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "incomes" ADD "currency_id" uuid NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "balance_history" DROP COLUMN "currency_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "balance_history" ADD "currency_id" uuid NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "bills" DROP COLUMN "currency_id"`);
    await queryRunner.query(
      `ALTER TABLE "bills" ADD "currency_id" uuid NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "expenses" DROP COLUMN "currency_id"`);
    await queryRunner.query(
      `ALTER TABLE "expenses" ADD "currency_id" uuid NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "group_invoices" DROP COLUMN "currency_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "group_invoices" ADD "currency_id" uuid NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TYPE "public"."group_invoices_split_method_enum" RENAME TO "group_invoices_split_method_enum_old"`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."group_invoices_split_method_enum" AS ENUM('EQUAL', 'CUSTOM_AMOUNT', 'PERCENTAGE', 'ONE_PAYS', 'EXACT')`,
    );
    await queryRunner.query(
      `ALTER TABLE "group_invoices" ALTER COLUMN "split_method" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "group_invoices" ALTER COLUMN "split_method" TYPE "public"."group_invoices_split_method_enum" USING "split_method"::"text"::"public"."group_invoices_split_method_enum"`,
    );
    await queryRunner.query(
      `ALTER TABLE "group_invoices" ALTER COLUMN "split_method" SET DEFAULT 'EQUAL'`,
    );
    await queryRunner.query(
      `DROP TYPE "public"."group_invoices_split_method_enum_old"`,
    );
    await queryRunner.query(`ALTER TABLE "debts" DROP COLUMN "currency_id"`);
    await queryRunner.query(
      `ALTER TABLE "debts" ADD "currency_id" uuid NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" DROP COLUMN "default_currency_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD "default_currency_id" uuid`,
    );
    await queryRunner.query(
      `ALTER TABLE "balance_history" ADD CONSTRAINT "FK_8a2640b891fb898233041c2375b" FOREIGN KEY ("currency_id") REFERENCES "currencies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "bills" ADD CONSTRAINT "FK_b93c85bb219680f864ad92605a5" FOREIGN KEY ("currency_id") REFERENCES "currencies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "expenses" ADD CONSTRAINT "FK_560c9662c5564c5745c3ddf9983" FOREIGN KEY ("currency_id") REFERENCES "currencies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "group_invoice_share_items" ADD CONSTRAINT "FK_31159352081e0833f0a61a073aa" FOREIGN KEY ("share_id") REFERENCES "group_invoice_shares"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "group_invoices" ADD CONSTRAINT "FK_161e5d2031d6caaa00b6d0d385b" FOREIGN KEY ("currency_id") REFERENCES "currencies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "debts" ADD CONSTRAINT "FK_30c9a866d65cd54d902a0093816" FOREIGN KEY ("currency_id") REFERENCES "currencies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "incomes" ADD CONSTRAINT "FK_d96e63b692a064568bdf4131e5f" FOREIGN KEY ("currency_id") REFERENCES "currencies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "FK_3de0c7b73e7afd5f257d4a92cae" FOREIGN KEY ("default_currency_id") REFERENCES "currencies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" DROP CONSTRAINT "FK_3de0c7b73e7afd5f257d4a92cae"`,
    );
    await queryRunner.query(
      `ALTER TABLE "incomes" DROP CONSTRAINT "FK_d96e63b692a064568bdf4131e5f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "debts" DROP CONSTRAINT "FK_30c9a866d65cd54d902a0093816"`,
    );
    await queryRunner.query(
      `ALTER TABLE "group_invoices" DROP CONSTRAINT "FK_161e5d2031d6caaa00b6d0d385b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "group_invoice_share_items" DROP CONSTRAINT "FK_31159352081e0833f0a61a073aa"`,
    );
    await queryRunner.query(
      `ALTER TABLE "expenses" DROP CONSTRAINT "FK_560c9662c5564c5745c3ddf9983"`,
    );
    await queryRunner.query(
      `ALTER TABLE "bills" DROP CONSTRAINT "FK_b93c85bb219680f864ad92605a5"`,
    );
    await queryRunner.query(
      `ALTER TABLE "balance_history" DROP CONSTRAINT "FK_8a2640b891fb898233041c2375b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" DROP COLUMN "default_currency_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD "default_currency_id" character(3) NOT NULL DEFAULT 'USD'`,
    );
    await queryRunner.query(`ALTER TABLE "debts" DROP COLUMN "currency_id"`);
    await queryRunner.query(
      `ALTER TABLE "debts" ADD "currency_id" character(3) NOT NULL`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."group_invoices_split_method_enum_old" AS ENUM('EQUAL', 'CUSTOM_AMOUNT', 'PERCENTAGE', 'ONE_PAYS')`,
    );
    await queryRunner.query(
      `ALTER TABLE "group_invoices" ALTER COLUMN "split_method" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "group_invoices" ALTER COLUMN "split_method" TYPE "public"."group_invoices_split_method_enum_old" USING "split_method"::"text"::"public"."group_invoices_split_method_enum_old"`,
    );
    await queryRunner.query(
      `ALTER TABLE "group_invoices" ALTER COLUMN "split_method" SET DEFAULT 'EQUAL'`,
    );
    await queryRunner.query(
      `DROP TYPE "public"."group_invoices_split_method_enum"`,
    );
    await queryRunner.query(
      `ALTER TYPE "public"."group_invoices_split_method_enum_old" RENAME TO "group_invoices_split_method_enum"`,
    );
    await queryRunner.query(
      `ALTER TABLE "group_invoices" DROP COLUMN "currency_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "group_invoices" ADD "currency_id" character(3) NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "expenses" DROP COLUMN "currency_id"`);
    await queryRunner.query(
      `ALTER TABLE "expenses" ADD "currency_id" character(3) NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "bills" DROP COLUMN "currency_id"`);
    await queryRunner.query(
      `ALTER TABLE "bills" ADD "currency_id" character(3) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "balance_history" DROP COLUMN "currency_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "balance_history" ADD "currency_id" character(3) NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "incomes" DROP COLUMN "currency_id"`);
    await queryRunner.query(`DROP TABLE "group_invoice_share_items"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_9f8d0972aeeb5a2277e40332d2"`,
    );
    await queryRunner.query(`DROP TABLE "currencies"`);
    await queryRunner.query(
      `ALTER TABLE "users" RENAME COLUMN "default_currency_id" TO "default_currency"`,
    );
    await queryRunner.query(
      `ALTER TABLE "debts" RENAME COLUMN "currency_id" TO "currency"`,
    );
    await queryRunner.query(
      `ALTER TABLE "group_invoices" RENAME COLUMN "currency_id" TO "currency"`,
    );
    await queryRunner.query(
      `ALTER TABLE "expenses" RENAME COLUMN "currency_id" TO "currency"`,
    );
    await queryRunner.query(
      `ALTER TABLE "bills" RENAME COLUMN "currency_id" TO "currency"`,
    );
    await queryRunner.query(
      `ALTER TABLE "balance_history" RENAME COLUMN "currency_id" TO "currency"`,
    );
  }
}
