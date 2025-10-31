import { DiscountType, PrismaClient } from '@prisma/client';

// 1. Initialize Prisma Client
const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  // --- Clean up any existing PromoCodes before seeding ---
  await prisma.promoCode.deleteMany({});
  console.log('🧹 Deleted existing promo codes.');

  // --- Helper function to define expiration dates ---
  const today = new Date();
  // Expires tomorrow
  const expiresTomorrow = new Date(today);
  expiresTomorrow.setDate(today.getDate() + 1); 
  // Expired yesterday
  const expiredYesterday = new Date(today);
  expiredYesterday.setDate(today.getDate() - 1); 

  // 2. Define the Promo Code Data
  const promoCodes = [
    // 1. Basic Percentage Discount (e.g., 10% off)
    {
      code: 'SAVE10PERCENT',
      discountType: DiscountType.PERCENTAGE,
      discountValue: 10.00, // 10%
      isActive: true,
      validUntil: null, // No expiration
    },
    // 2. Fixed Amount Discount (e.g., $25 off)
    {
      code: 'FLAT25DOLLARS',
      discountType: DiscountType.FLAT_AMOUNT,
      discountValue: 25.00,
      isActive: true,
      validUntil: null, // No expiration
    },
    // 3. Limited Time Percentage Discount (Expires tomorrow)
    {
      code: 'SPRING15OFF',
      discountType: DiscountType.PERCENTAGE,
      discountValue: 15.00,
      isActive: true,
      validUntil: expiresTomorrow,
    },
    // 4. Already Expired Fixed Discount (Should not be usable)
    {
      code: 'OLDCOUPON',
      discountType: DiscountType.FLAT_AMOUNT,
      discountValue: 50.00,
      isActive: true, // Still active, but date check should fail
      validUntil: expiredYesterday,
    },
    // 5. Inactive Code (For testing disabled state)
    {
      code: 'DISABLEDCODE',
      discountType: DiscountType.PERCENTAGE,
      discountValue: 20.00,
      isActive: false, // Explicitly marked inactive
      validUntil: null, 
    },
    // 6. High Value Fixed Discount (For testing large amounts)
    {
      code: 'GIFT200',
      discountType: DiscountType.FLAT_AMOUNT,
      discountValue: 200.00,
      isActive: true,
      validUntil: null,
    },
  ];

  // 3. Insert the data into the database
  for (const promo of promoCodes) {
    const createdPromo = await prisma.promoCode.create({
      data: {
        ...promo,
        // Prisma automatically handles the conversion of native numbers (like 10.00) 
        // to the Decimal type for insertion.
      },
    });
    console.log(`✅ Created promo code: ${createdPromo.code} (${createdPromo.discountType})`);
  }

  console.log('🎉 Seeding finished successfully.');
}

// 4. Execute the main function and handle errors
main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });