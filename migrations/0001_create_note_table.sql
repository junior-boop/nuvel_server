-- CreateTable
CREATE TABLE "Notes" (
    "Id" TEXT NOT NULL PRIMARY KEY,
    "note_content" TEXT NOT NULL,
    "createdBy" TEXT NOT NULL,
    "epingler" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "Notes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users" ("Id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Users" (
    "Id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "surname" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "googleProvider" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "uptdatedAt" DATETIME NOT NULL,
    "telephone" TEXT NOT NULL,
    "countryCalledIndex" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_Id_key" ON "Users"("Id");

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");
