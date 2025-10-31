-- CreateEnum
CREATE TYPE "BookingStatus" AS ENUM ('PENDING', 'CONFIRMED', 'FAILED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "DiscountType" AS ENUM ('PERCENTAGE', 'FLAT_AMOUNT');

-- CreateTable
CREATE TABLE "Experience" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    "duration" TEXT,
    "imageUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Experience_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Slot" (
    "id" TEXT NOT NULL,
    "experienceId" TEXT NOT NULL,
    "dateTime" TIMESTAMP(3) NOT NULL,
    "capacity" INTEGER NOT NULL DEFAULT 1,
    "bookedCount" INTEGER NOT NULL DEFAULT 0,
    "isSoldOut" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Slot_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Booking" (
    "id" TEXT NOT NULL,
    "slotId" TEXT NOT NULL,
    "userName" TEXT NOT NULL,
    "userEmail" TEXT NOT NULL,
    "userPhone" TEXT,
    "promoCodeId" TEXT,
    "originalPrice" DECIMAL(10,2) NOT NULL,
    "finalPrice" DECIMAL(10,2) NOT NULL,
    "status" "BookingStatus" NOT NULL DEFAULT 'PENDING',
    "bookingDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Booking_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PromoCode" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "discountType" "DiscountType" NOT NULL,
    "discountValue" DECIMAL(10,2) NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "validUntil" TIMESTAMP(3),

    CONSTRAINT "PromoCode_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Experience_title_key" ON "Experience"("title");

-- CreateIndex
CREATE UNIQUE INDEX "Slot_dateTime_key" ON "Slot"("dateTime");

-- CreateIndex
CREATE INDEX "Slot_experienceId_idx" ON "Slot"("experienceId");

-- CreateIndex
CREATE INDEX "Slot_dateTime_idx" ON "Slot"("dateTime");

-- CreateIndex
CREATE INDEX "Booking_slotId_userEmail_idx" ON "Booking"("slotId", "userEmail");

-- CreateIndex
CREATE UNIQUE INDEX "PromoCode_code_key" ON "PromoCode"("code");

-- AddForeignKey
ALTER TABLE "Slot" ADD CONSTRAINT "Slot_experienceId_fkey" FOREIGN KEY ("experienceId") REFERENCES "Experience"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_slotId_fkey" FOREIGN KEY ("slotId") REFERENCES "Slot"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_promoCodeId_fkey" FOREIGN KEY ("promoCodeId") REFERENCES "PromoCode"("id") ON DELETE SET NULL ON UPDATE CASCADE;
