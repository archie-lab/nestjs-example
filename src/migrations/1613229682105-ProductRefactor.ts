/* eslint-disable quotes */
import { MigrationInterface, QueryRunner } from "typeorm";

export class ProductRefactor1613229682105 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "product" RENAME COLUMN "name" TO "title"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "product" RENAME COLUMN "title" TO "name"`);
  }

}
