/*
  Warnings:

  - You are about to drop the column `texPrice` on the `Cart` table. All the data in the column will be lost.
  - Added the required column `taxPrice` to the `Cart` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Cart" DROP COLUMN "texPrice",
ADD COLUMN     "taxPrice" DECIMAL(12,2) NOT NULL;
