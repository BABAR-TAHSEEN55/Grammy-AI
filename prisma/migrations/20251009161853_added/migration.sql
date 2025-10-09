/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `ChatHistory` will be added. If there are existing duplicate values, this will fail.
  - Made the column `AiResponse` on table `ChatHistory` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "public"."ChatHistory" ALTER COLUMN "AiResponse" SET NOT NULL,
ALTER COLUMN "AiResponse" SET DEFAULT '';

-- CreateIndex
CREATE UNIQUE INDEX "ChatHistory_id_key" ON "public"."ChatHistory"("id");
