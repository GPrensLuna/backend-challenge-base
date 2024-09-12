/*
  Warnings:

  - The primary key for the `Favorite` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `movieId` on the `Favorite` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[id]` on the table `Favorite` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `adult` to the `Favorite` table without a default value. This is not possible if the table is not empty.
  - Added the required column `backdropPath` to the `Favorite` table without a default value. This is not possible if the table is not empty.
  - The required column `idFavorite` was added to the `Favorite` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `originalLanguage` to the `Favorite` table without a default value. This is not possible if the table is not empty.
  - Added the required column `originalTitle` to the `Favorite` table without a default value. This is not possible if the table is not empty.
  - Added the required column `overview` to the `Favorite` table without a default value. This is not possible if the table is not empty.
  - Added the required column `popularity` to the `Favorite` table without a default value. This is not possible if the table is not empty.
  - Added the required column `posterPath` to the `Favorite` table without a default value. This is not possible if the table is not empty.
  - Added the required column `releaseDate` to the `Favorite` table without a default value. This is not possible if the table is not empty.
  - Added the required column `video` to the `Favorite` table without a default value. This is not possible if the table is not empty.
  - Added the required column `voteAverage` to the `Favorite` table without a default value. This is not possible if the table is not empty.
  - Added the required column `voteCount` to the `Favorite` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `id` on the `Favorite` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropIndex
DROP INDEX "Favorite_movieId_key";

-- AlterTable
ALTER TABLE "Favorite" DROP CONSTRAINT "Favorite_pkey",
DROP COLUMN "movieId",
ADD COLUMN     "adult" BOOLEAN NOT NULL,
ADD COLUMN     "backdropPath" TEXT NOT NULL,
ADD COLUMN     "genreIds" INTEGER[],
ADD COLUMN     "idFavorite" TEXT NOT NULL,
ADD COLUMN     "originalLanguage" TEXT NOT NULL,
ADD COLUMN     "originalTitle" TEXT NOT NULL,
ADD COLUMN     "overview" TEXT NOT NULL,
ADD COLUMN     "popularity" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "posterPath" TEXT NOT NULL,
ADD COLUMN     "releaseDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "video" BOOLEAN NOT NULL,
ADD COLUMN     "voteAverage" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "voteCount" INTEGER NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" INTEGER NOT NULL,
ADD CONSTRAINT "Favorite_pkey" PRIMARY KEY ("idFavorite");

-- CreateIndex
CREATE UNIQUE INDEX "Favorite_id_key" ON "Favorite"("id");
