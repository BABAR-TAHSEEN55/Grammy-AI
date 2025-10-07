/*
  Warnings:

  - You are about to drop the column `role` on the `ChatHistory` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."ChatHistory" DROP COLUMN "role",
ADD COLUMN     "AiResponse" TEXT;
