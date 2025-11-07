-- DropForeignKey
ALTER TABLE "public"."Service" DROP CONSTRAINT "Service_ownerId_fkey";

-- AddForeignKey
ALTER TABLE "Service" ADD CONSTRAINT "Service_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
