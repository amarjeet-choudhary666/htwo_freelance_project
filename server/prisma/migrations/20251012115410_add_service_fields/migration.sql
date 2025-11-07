/*
  Warnings:

  - You are about to drop the column `lastname` on the `User` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `Service` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Service" ADD COLUMN     "category" TEXT,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "description" TEXT,
ADD COLUMN     "features" TEXT[],
ADD COLUMN     "imageUrl" TEXT,
ADD COLUMN     "monthlyPrice" DOUBLE PRECISION,
ADD COLUMN     "priority" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'active',
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "yearlyPrice" DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "lastname";
