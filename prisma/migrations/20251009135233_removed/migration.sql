/*
  Warnings:

  - Made the column `AiResponse` on table `ChatHistory` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "public"."ChatHistory" ALTER COLUMN "AiResponse" SET NOT NULL;
