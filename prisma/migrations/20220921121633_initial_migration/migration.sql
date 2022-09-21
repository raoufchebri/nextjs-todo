-- CreateTable
CREATE TABLE "Todo" (
    "id" TEXT NOT NULL,
    "completed" BOOLEAN NOT NULL,
    "text" TEXT NOT NULL,

    CONSTRAINT "Todo_pkey" PRIMARY KEY ("id")
);
