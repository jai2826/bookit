import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";

const prisma = new PrismaClient();
// Updation seeed

async function main() {
  console.log("Start seeding for Adventure Experiences with INR pricing...");

  const experiences = [
    // --- Kayaking Experiences (3) ---
    {
      name: "Mangrove Forest Kayak Eco-Tour",
      about:
        "Paddle silently through dense mangrove tunnels. Spot unique wildlife.",
      description:
        "A 3-hour guided kayak tour perfect for beginners. Explore the hidden ecosystem of the coastal mangroves. All gear provided.",
      price: new Decimal(3599.0),
      duration: "3 hours",
      imageUrl: "https://placeholder.com/img/kayak-mangrove.jpg",
      location: "Goa Coast, India",
    },
    {
      name: "Sunset Sea Kayaking & Beach Picnic",
      about:
        "Watch the sun dip below the horizon from your kayak, followed by a light dinner.",
      description:
        "A romantic 4-hour evening experience. Paddle out to a secluded beach spot, enjoy a gourmet picnic, and kayak back under the stars.",
      price: new Decimal(6999.0),
      duration: "4 hours",
      imageUrl: "https://placeholder.com/img/kayak-sunset.jpg",
      location: "Andaman Islands",
    },
    {
      name: "River Rapids Kayak Challenge (Level 2)",
      about:
        "A thrilling ride down moderate river rapids for the adventurous spirit.",
      description:
        "A half-day kayaking course focusing on river technique and navigating level 2 rapids. Prior experience recommended.",
      price: new Decimal(8299.0),
      duration: "Half Day",
      imageUrl: "https://placeholder.com/img/kayak-rapids.jpg",
      location: "Rishikesh, Uttarakhand",
    },

    // --- Boating Experiences (4) ---
    {
      name: "Luxury Yacht Day Cruise & Snorkel Stop",
      about: "Sail the coast on a private yacht with a captain and crew.",
      description:
        "An 8-hour VIP experience. Includes open bar, lunch, and a stop at a pristine reef for snorkeling. Perfect for groups up to 10.",
      price: new Decimal(99000.0),
      duration: "Full Day",
      imageUrl: "https://placeholder.com/img/boat-yacht.jpg",
      location: "Mumbai Harbor",
    },
    {
      name: "Dolphin & Whale Watching Speed Boat",
      about: "A fast and thrilling boat ride to spot marine megafauna.",
      description:
        "A 2-hour high-speed trip to known migratory routes. Highest chance of spotting dolphins and smaller whales. Quick, fun, and educational.",
      price: new Decimal(5399.0),
      duration: "2 hours",
      imageUrl: "https://placeholder.com/img/boat-dolphins.jpg",
      location: "Konkan Coast, Maharashtra",
    },
    {
      name: "Traditional Fishing Boat Experience",
      about: "Learn the ancient art of local net fishing with a village elder.",
      description:
        "A 4-hour cultural experience on a traditional wooden boat. Catch your own dinner, which the crew will prepare for you. An authentic local immersion.",
      price: new Decimal(5799.0),
      duration: "4 hours",
      imageUrl: "https://placeholder.com/img/boat-fishing.jpg",
      location: "Alleppey, Kerala",
    },
    {
      name: "Night Glow Boat Tour (Bioluminescence)",
      about: "Drift on the water as the ocean lights up around you.",
      description:
        "A magical 1.5-hour tour on a glass-bottom boat in a bioluminescent bay. Witness the natural spectacle of glowing plankton.",
      price: new Decimal(4199.0),
      duration: "1.5 hours",
      imageUrl: "https://placeholder.com/img/boat-bioluminescent.jpg",
      location: "Havelock Island, Andaman",
    },

    // --- Single Experiences (4) ---
    {
      name: "PADI Certified Scuba Diving Expedition",
      about: "Explore a sunken wreck or vibrant coral reef.",
      description:
        "A full day, two-tank dive for certified divers. Includes all equipment rental and a professional divemaster. Max depth 30 meters.",
      price: new Decimal(14999.0),
      duration: "Full Day",
      imageUrl: "https://placeholder.com/img/scuba-diving.jpg",
      location: "Netrani Island, Karnataka",
    },
    {
      name: "Tandem Paragliding over the Alps",
      about:
        "Soar like an eagle with a certified instructor over mountain vistas.",
      description:
        "A 15-20 minute flight time (weather permitting). Enjoy breathtaking aerial views of the valleys below. No experience necessary—just a running start!",
      price: new Decimal(15999.0),
      duration: "1.5 hours",
      imageUrl: "https://placeholder.com/img/paragliding-alps.jpg",
      location: "Bir Billing, Himachal Pradesh",
    },
    {
      name: "Sunrise Trek to Nandi Hills",
      about:
        "The classic pre-dawn trek to watch a spectacular sunrise over the clouds.",
      description:
        "An early morning 5-hour excursion (including travel time) to the famous Nandi Hills viewpoint. Perfect photo opportunities as the mist clears.",
      price: new Decimal(2499.0),
      duration: "5 hours",
      imageUrl: "https://placeholder.com/img/nandi-hills-sunrise.jpg",
      location: "Nandi Hills, Karnataka",
    },
    {
      name: "Extreme Canyon Bunjee Jumping",
      about: "Plunge 80 meters into a river canyon on a single elastic cord.",
      description:
        "The ultimate adrenaline rush. Full safety briefing, high-quality gear, and jump certificate included. Video footage available for purchase.",
      price: new Decimal(12499.0),
      duration: "3 hours",
      imageUrl: "https://placeholder.com/img/bunjee-jumping.jpg",
      location: "Mohan Chatti, Uttarakhand",
    },

    // --- Coffee Trail Experiences (2) ---
    {
      name: "Estate to Cup: South Indian Coffee Trail",
      about: "Walk the plantation and learn about the bean’s journey.",
      description:
        "A 3-hour guided walk through a lush coffee plantation. Learn about cultivation, roasting, and sample freshly brewed single-origin coffee.",
      price: new Decimal(3299.0),
      duration: "3 hours",
      imageUrl: "https://placeholder.com/img/coffee-trail-plantation.jpg",
      location: "Chikmagalur, Karnataka",
    },
    {
      name: "Advanced Coffee Roasting Workshop",
      about:
        "A hands-on workshop to master the art of coffee roasting profiles.",
      description:
        "A deep-dive 4-hour workshop for coffee enthusiasts. Learn how to control flavor through different roast levels. Take home a bag of your own roasted beans.",
      price: new Decimal(10499.0),
      duration: "4 hours",
      imageUrl: "https://placeholder.com/img/coffee-trail-roasting.jpg",
      location: "Coorg, Karnataka",
    },
  ];
  // IMPORTANT: YOU MUST REPLACE THE PLACEHOLDER IDs BELOW
  // with the actual IDs generated when you seed your 'Experience' model.

  // The array below has 14 slots for each of the 13 experiences, totaling 182 slots.

  // Clear out old data for a clean seed

  // Create new records
  for (const exp of experiences) {
    const test = await prisma.experience.findUnique({
      where: {
        name: exp.name,
      },
    });
    // This casting ensures the Decimal value is correctly handled by the database insert
    await prisma.experience.update({
      where: { id: test?.id! },
      data: {
        location: exp.location,
      },
    });
  }

  console.log(
    `Seeding finished. Added ${experiences.length} total experiences with INR prices.`
  );
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
