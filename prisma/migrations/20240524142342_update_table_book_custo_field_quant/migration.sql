/*
  Warnings:

  - You are about to drop the column `quantity` on the `bookscustomers` table. All the data in the column will be lost.
  - Added the required column `qtBookSold` to the `bookscustomers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "bookscustomers" DROP COLUMN "quantity",
ADD COLUMN     "qtBookSold" INTEGER NOT NULL;
