/*
  Warnings:

  - Added the required column `quantity` to the `bookscustomers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "bookscustomers" ADD COLUMN     "quantity" INTEGER NOT NULL;
