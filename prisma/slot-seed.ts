import "dotenv/config";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// --- Helper to get future dates (Used for creating the dates below) ---
// Note: Dates are set for UTC (Z) and will correspond to local time 5.5 hours later (IST).
const getFutureDateTime = (days: number, hours: number, minutes: number) => {
  const date = new Date();
  date.setUTCFullYear(date.getFullYear(), date.getMonth(), date.getDate());
  date.setUTCHours(0, 0, 0, 0);
  date.setDate(date.getDate() + days);
  date.setUTCHours(hours, minutes, 0, 0);
  return date;
};

const slotsToCreate = [
  // --- Experience 1: Mangrove Forest Kayak Eco-Tour (Capacity 10) ---
  {
    experienceId: "cmhd04jzt0000fcnglb96ebpu",
    dateTime: getFutureDateTime(1, 8, 0),
    capacity: 10,
    bookedCount: 0,
    isSoldOut: false,
  },
  {
    experienceId: "cmhd04jzt0000fcnglb96ebpu",
    dateTime: getFutureDateTime(1, 11, 0),
    capacity: 10,
    bookedCount: 3,
    isSoldOut: false,
  },
  {
    experienceId: "cmhd04jzt0000fcnglb96ebpu",
    dateTime: getFutureDateTime(1, 14, 0),
    capacity: 10,
    bookedCount: 8,
    isSoldOut: false,
  }, // Nearly Full
  {
    experienceId: "cmhd04jzt0000fcnglb96ebpu",
    dateTime: getFutureDateTime(2, 9, 0),
    capacity: 10,
    bookedCount: 0,
    isSoldOut: false,
  },
  {
    experienceId: "cmhd04jzt0000fcnglb96ebpu",
    dateTime: getFutureDateTime(2, 12, 0),
    capacity: 10,
    bookedCount: 10,
    isSoldOut: true,
  }, // Sold Out
  {
    experienceId: "cmhd04jzt0000fcnglb96ebpu",
    dateTime: getFutureDateTime(2, 15, 0),
    capacity: 10,
    bookedCount: 4,
    isSoldOut: false,
  },
  {
    experienceId: "cmhd04jzt0000fcnglb96ebpu",
    dateTime: getFutureDateTime(3, 8, 30),
    capacity: 10,
    bookedCount: 1,
    isSoldOut: false,
  },
  {
    experienceId: "cmhd04jzt0000fcnglb96ebpu",
    dateTime: getFutureDateTime(3, 11, 30),
    capacity: 10,
    bookedCount: 0,
    isSoldOut: false,
  },
  {
    experienceId: "cmhd04jzt0000fcnglb96ebpu",
    dateTime: getFutureDateTime(3, 14, 30),
    capacity: 10,
    bookedCount: 2,
    isSoldOut: false,
  },
  {
    experienceId: "cmhd04jzt0000fcnglb96ebpu",
    dateTime: getFutureDateTime(4, 9, 30),
    capacity: 10,
    bookedCount: 5,
    isSoldOut: false,
  },
  {
    experienceId: "cmhd04jzt0000fcnglb96ebpu",
    dateTime: getFutureDateTime(4, 13, 30),
    capacity: 10,
    bookedCount: 7,
    isSoldOut: false,
  },
  {
    experienceId: "cmhd04jzt0000fcnglb96ebpu",
    dateTime: getFutureDateTime(4, 16, 30),
    capacity: 10,
    bookedCount: 6,
    isSoldOut: false,
  },
  {
    experienceId: "cmhd04jzt0000fcnglb96ebpu",
    dateTime: getFutureDateTime(4, 18, 0),
    capacity: 10,
    bookedCount: 9,
    isSoldOut: false,
  },
  {
    experienceId: "cmhd04jzt0000fcnglb96ebpu",
    dateTime: getFutureDateTime(4, 20, 0),
    capacity: 10,
    bookedCount: 0,
    isSoldOut: false,
  },

  // --- Experience 2: Sunset Sea Kayaking & Beach Picnic (Capacity 8) ---
  {
    experienceId: "cmhd04k5c0001fcngwjw783zi",
    dateTime: getFutureDateTime(1, 16, 0),
    capacity: 8,
    bookedCount: 0,
    isSoldOut: false,
  },
  {
    experienceId: "cmhd04k5c0001fcngwjw783zi",
    dateTime: getFutureDateTime(1, 18, 0),
    capacity: 8,
    bookedCount: 7,
    isSoldOut: false,
  }, // Nearly Full
  {
    experienceId: "cmhd04k5c0001fcngwjw783zi",
    dateTime: getFutureDateTime(2, 17, 0),
    capacity: 8,
    bookedCount: 8,
    isSoldOut: true,
  }, // Sold Out
  {
    experienceId: "cmhd04k5c0001fcngwjw783zi",
    dateTime: getFutureDateTime(2, 19, 0),
    capacity: 8,
    bookedCount: 5,
    isSoldOut: false,
  },
  {
    experienceId: "cmhd04k5c0001fcngwjw783zi",
    dateTime: getFutureDateTime(3, 16, 30),
    capacity: 8,
    bookedCount: 0,
    isSoldOut: false,
  },
  {
    experienceId: "cmhd04k5c0001fcngwjw783zi",
    dateTime: getFutureDateTime(3, 18, 30),
    capacity: 8,
    bookedCount: 2,
    isSoldOut: false,
  },
  {
    experienceId: "cmhd04k5c0001fcngwjw783zi",
    dateTime: getFutureDateTime(4, 17, 30),
    capacity: 8,
    bookedCount: 1,
    isSoldOut: false,
  },
  {
    experienceId: "cmhd04k5c0001fcngwjw783zi",
    dateTime: getFutureDateTime(4, 19, 30),
    capacity: 8,
    bookedCount: 4,
    isSoldOut: false,
  },
  {
    experienceId: "cmhd04k5c0001fcngwjw783zi",
    dateTime: getFutureDateTime(4, 21, 0),
    capacity: 8,
    bookedCount: 0,
    isSoldOut: false,
  },
  {
    experienceId: "cmhd04k5c0001fcngwjw783zi",
    dateTime: getFutureDateTime(4, 22, 0),
    capacity: 8,
    bookedCount: 3,
    isSoldOut: false,
  },
  {
    experienceId: "cmhd04k5c0001fcngwjw783zi",
    dateTime: getFutureDateTime(3, 20, 0),
    capacity: 8,
    bookedCount: 6,
    isSoldOut: false,
  },
  {
    experienceId: "cmhd04k5c0001fcngwjw783zi",
    dateTime: getFutureDateTime(2, 20, 0),
    capacity: 8,
    bookedCount: 1,
    isSoldOut: false,
  },
  {
    experienceId: "cmhd04k5c0001fcngwjw783zi",
    dateTime: getFutureDateTime(1, 20, 0),
    capacity: 8,
    bookedCount: 0,
    isSoldOut: false,
  },
  {
    experienceId: "cmhd04k5c0001fcngwjw783zi",
    dateTime: getFutureDateTime(1, 21, 0),
    capacity: 8,
    bookedCount: 0,
    isSoldOut: false,
  },

  // --- Experience 3: River Rapids Kayak Challenge (Level 2) (Capacity 6) ---
  {
    experienceId: "cmhd04k840002fcngd9m22q86",
    dateTime: getFutureDateTime(1, 9, 0),
    capacity: 6,
    bookedCount: 6,
    isSoldOut: true,
  },
  {
    experienceId: "cmhd04k840002fcngd9m22q86",
    dateTime: getFutureDateTime(1, 13, 0),
    capacity: 6,
    bookedCount: 1,
    isSoldOut: false,
  },
  {
    experienceId: "cmhd04k840002fcngd9m22q86",
    dateTime: getFutureDateTime(2, 8, 30),
    capacity: 6,
    bookedCount: 5,
    isSoldOut: false,
  }, // Nearly Full
  {
    experienceId: "cmhd04k840002fcngd9m22q86",
    dateTime: getFutureDateTime(2, 12, 30),
    capacity: 6,
    bookedCount: 0,
    isSoldOut: false,
  },
  {
    experienceId: "cmhd04k840002fcngd9m22q86",
    dateTime: getFutureDateTime(3, 9, 30),
    capacity: 6,
    bookedCount: 2,
    isSoldOut: false,
  },
  {
    experienceId: "cmhd04k840002fcngd9m22q86",
    dateTime: getFutureDateTime(3, 13, 30),
    capacity: 6,
    bookedCount: 3,
    isSoldOut: false,
  },
  {
    experienceId: "cmhd04k840002fcngd9m22q86",
    dateTime: getFutureDateTime(4, 9, 0),
    capacity: 6,
    bookedCount: 0,
    isSoldOut: false,
  },
  {
    experienceId: "cmhd04k840002fcngd9m22q86",
    dateTime: getFutureDateTime(4, 14, 0),
    capacity: 6,
    bookedCount: 1,
    isSoldOut: false,
  },
  {
    experienceId: "cmhd04k840002fcngd9m22q86",
    dateTime: getFutureDateTime(4, 16, 0),
    capacity: 6,
    bookedCount: 2,
    isSoldOut: false,
  },
  {
    experienceId: "cmhd04k840002fcngd9m22q86",
    dateTime: getFutureDateTime(4, 18, 0),
    capacity: 6,
    bookedCount: 4,
    isSoldOut: false,
  },
  {
    experienceId: "cmhd04k840002fcngd9m22q86",
    dateTime: getFutureDateTime(3, 16, 0),
    capacity: 6,
    bookedCount: 0,
    isSoldOut: false,
  },
  {
    experienceId: "cmhd04k840002fcngd9m22q86",
    dateTime: getFutureDateTime(2, 16, 0),
    capacity: 6,
    bookedCount: 1,
    isSoldOut: false,
  },
  {
    experienceId: "cmhd04k840002fcngd9m22q86",
    dateTime: getFutureDateTime(1, 16, 0),
    capacity: 6,
    bookedCount: 0,
    isSoldOut: false,
  },
  {
    experienceId: "cmhd04k840002fcngd9m22q86",
    dateTime: getFutureDateTime(1, 18, 0),
    capacity: 6,
    bookedCount: 0,
    isSoldOut: false,
  },

  // --- Experience 4: Luxury Yacht Day Cruise & Snorkel Stop (Capacity 10) ---
  {
    experienceId: "cmhd04kau0003fcng1rter15s",
    dateTime: getFutureDateTime(5, 9, 0),
    capacity: 10,
    bookedCount: 0,
    isSoldOut: false,
  },
  {
    experienceId: "cmhd04kau0003fcng1rter15s",
    dateTime: getFutureDateTime(6, 9, 0),
    capacity: 10,
    bookedCount: 5,
    isSoldOut: false,
  },
  {
    experienceId: "cmhd04kau0003fcng1rter15s",
    dateTime: getFutureDateTime(7, 9, 0),
    capacity: 10,
    bookedCount: 9,
    isSoldOut: false,
  }, // Nearly Full
  {
    experienceId: "cmhd04kau0003fcng1rter15s",
    dateTime: getFutureDateTime(8, 9, 0),
    capacity: 10,
    bookedCount: 10,
    isSoldOut: true,
  }, // Sold Out
  {
    experienceId: "cmhd04kau0003fcng1rter15s",
    dateTime: getFutureDateTime(5, 17, 0),
    capacity: 10,
    bookedCount: 1,
    isSoldOut: false,
  },
  {
    experienceId: "cmhd04kau0003fcng1rter15s",
    dateTime: getFutureDateTime(6, 17, 0),
    capacity: 10,
    bookedCount: 2,
    isSoldOut: false,
  },
  {
    experienceId: "cmhd04kau0003fcng1rter15s",
    dateTime: getFutureDateTime(7, 17, 0),
    capacity: 10,
    bookedCount: 0,
    isSoldOut: false,
  },
  {
    experienceId: "cmhd04kau0003fcng1rter15s",
    dateTime: getFutureDateTime(8, 17, 0),
    capacity: 10,
    bookedCount: 4,
    isSoldOut: false,
  },
  {
    experienceId: "cmhd04kau0003fcng1rter15s",
    dateTime: getFutureDateTime(5, 10, 0),
    capacity: 10,
    bookedCount: 0,
    isSoldOut: false,
  },
  {
    experienceId: "cmhd04kau0003fcng1rter15s",
    dateTime: getFutureDateTime(6, 11, 0),
    capacity: 10,
    bookedCount: 0,
    isSoldOut: false,
  },
  {
    experienceId: "cmhd04kau0003fcng1rter15s",
    dateTime: getFutureDateTime(7, 12, 0),
    capacity: 10,
    bookedCount: 0,
    isSoldOut: false,
  },
  {
    experienceId: "cmhd04kau0003fcng1rter15s",
    dateTime: getFutureDateTime(8, 13, 0),
    capacity: 10,
    bookedCount: 0,
    isSoldOut: false,
  },
  {
    experienceId: "cmhd04kau0003fcng1rter15s",
    dateTime: getFutureDateTime(5, 14, 0),
    capacity: 10,
    bookedCount: 0,
    isSoldOut: false,
  },
  {
    experienceId: "cmhd04kau0003fcng1rter15s",
    dateTime: getFutureDateTime(6, 15, 0),
    capacity: 10,
    bookedCount: 0,
    isSoldOut: false,
  },

  // --- Experience 5: Dolphin & Whale Watching Speed Boat (Capacity 12) ---
  {
    experienceId: "cmhd04kdl0004fcng45iir3a7",
    dateTime: getFutureDateTime(1, 7, 0),
    capacity: 12,
    bookedCount: 0,
    isSoldOut: false,
  }, // Early Slot
  {
    experienceId: "cmhd04kdl0004fcng45iir3a7",
    dateTime: getFutureDateTime(1, 10, 0),
    capacity: 12,
    bookedCount: 11,
    isSoldOut: false,
  }, // Nearly Full
  {
    experienceId: "cmhd04kdl0004fcng45iir3a7",
    dateTime: getFutureDateTime(1, 13, 0),
    capacity: 12,
    bookedCount: 12,
    isSoldOut: true,
  }, // Sold Out
  {
    experienceId: "cmhd04kdl0004fcng45iir3a7",
    dateTime: getFutureDateTime(2, 7, 30),
    capacity: 12,
    bookedCount: 0,
    isSoldOut: false,
  },
  {
    experienceId: "cmhd04kdl0004fcng45iir3a7",
    dateTime: getFutureDateTime(2, 10, 30),
    capacity: 12,
    bookedCount: 3,
    isSoldOut: false,
  },
  {
    experienceId: "cmhd04kdl0004fcng45iir3a7",
    dateTime: getFutureDateTime(3, 8, 0),
    capacity: 12,
    bookedCount: 1,
    isSoldOut: false,
  },
  {
    experienceId: "cmhd04kdl0004fcng45iir3a7",
    dateTime: getFutureDateTime(3, 11, 0),
    capacity: 12,
    bookedCount: 7,
    isSoldOut: false,
  },
  {
    experienceId: "cmhd04kdl0004fcng45iir3a7",
    dateTime: getFutureDateTime(4, 8, 30),
    capacity: 12,
    bookedCount: 0,
    isSoldOut: false,
  },
  {
    experienceId: "cmhd04kdl0004fcng45iir3a7",
    dateTime: getFutureDateTime(4, 11, 30),
    capacity: 12,
    bookedCount: 2,
    isSoldOut: false,
  },
  {
    experienceId: "cmhd04kdl0004fcng45iir3a7",
    dateTime: getFutureDateTime(4, 14, 30),
    capacity: 12,
    bookedCount: 5,
    isSoldOut: false,
  },
  {
    experienceId: "cmhd04kdl0004fcng45iir3a7",
    dateTime: getFutureDateTime(4, 17, 30),
    capacity: 12,
    bookedCount: 9,
    isSoldOut: false,
  },
  {
    experienceId: "cmhd04kdl0004fcng45iir3a7",
    dateTime: getFutureDateTime(3, 14, 30),
    capacity: 12,
    bookedCount: 0,
    isSoldOut: false,
  },
  {
    experienceId: "cmhd04kdl0004fcng45iir3a7",
    dateTime: getFutureDateTime(2, 14, 30),
    capacity: 12,
    bookedCount: 0,
    isSoldOut: false,
  },
  {
    experienceId: "cmhd04kdl0004fcng45iir3a7",
    dateTime: getFutureDateTime(1, 14, 30),
    capacity: 12,
    bookedCount: 0,
    isSoldOut: false,
  },

  // --- Experience 6: Traditional Fishing Boat Experience (Capacity 4) ---
  {
    experienceId: "cmhd04kg80005fcngrigwfrwm",
    dateTime: getFutureDateTime(1, 6, 0),
    capacity: 4,
    bookedCount: 0,
    isSoldOut: false,
  }, // Early Morning
  {
    experienceId: "cmhd04kg80005fcngrigwfrwm",
    dateTime: getFutureDateTime(1, 11, 0),
    capacity: 4,
    bookedCount: 3,
    isSoldOut: false,
  }, // Nearly Full
  {
    experienceId: "cmhd04kg80005fcngrigwfrwm",
    dateTime: getFutureDateTime(2, 7, 0),
    capacity: 4,
    bookedCount: 4,
    isSoldOut: true,
  }, // Sold Out
  {
    experienceId: "cmhd04kg80005fcngrigwfrwm",
    dateTime: getFutureDateTime(2, 12, 0),
    capacity: 4,
    bookedCount: 1,
    isSoldOut: false,
  },
  {
    experienceId: "cmhd04kg80005fcngrigwfrwm",
    dateTime: getFutureDateTime(3, 6, 30),
    capacity: 4,
    bookedCount: 0,
    isSoldOut: false,
  },
  {
    experienceId: "cmhd04kg80005fcngrigwfrwm",
    dateTime: getFutureDateTime(3, 11, 30),
    capacity: 4,
    bookedCount: 2,
    isSoldOut: false,
  },
  {
    experienceId: "cmhd04kg80005fcngrigwfrwm",
    dateTime: getFutureDateTime(4, 7, 30),
    capacity: 4,
    bookedCount: 0,
    isSoldOut: false,
  },
  {
    experienceId: "cmhd04kg80005fcngrigwfrwm",
    dateTime: getFutureDateTime(4, 12, 30),
    capacity: 4,
    bookedCount: 1,
    isSoldOut: false,
  },
  {
    experienceId: "cmhd04kg80005fcngrigwfrwm",
    dateTime: getFutureDateTime(4, 15, 0),
    capacity: 4,
    bookedCount: 0,
    isSoldOut: false,
  },
  {
    experienceId: "cmhd04kg80005fcngrigwfrwm",
    dateTime: getFutureDateTime(3, 15, 0),
    capacity: 4,
    bookedCount: 0,
    isSoldOut: false,
  },
  {
    experienceId: "cmhd04kg80005fcngrigwfrwm",
    dateTime: getFutureDateTime(2, 15, 0),
    capacity: 4,
    bookedCount: 0,
    isSoldOut: false,
  },
  {
    experienceId: "cmhd04kg80005fcngrigwfrwm",
    dateTime: getFutureDateTime(1, 15, 0),
    capacity: 4,
    bookedCount: 0,
    isSoldOut: false,
  },
  {
    experienceId: "cmhd04kg80005fcngrigwfrwm",
    dateTime: getFutureDateTime(1, 17, 0),
    capacity: 4,
    bookedCount: 0,
    isSoldOut: false,
  },
  {
    experienceId: "cmhd04kg80005fcngrigwfrwm",
    dateTime: getFutureDateTime(1, 19, 0),
    capacity: 4,
    bookedCount: 0,
    isSoldOut: false,
  },

  // --- Experience 7: Night Glow Boat Tour (Bioluminescence) (Capacity 15) ---
  {
    experienceId: "cmhd04kiy0006fcngwkbpw6ok",
    dateTime: getFutureDateTime(1, 19, 30),
    capacity: 15,
    bookedCount: 14,
    isSoldOut: false,
  }, // Nearly Full
  {
    experienceId: "cmhd04kiy0006fcngwkbpw6ok",
    dateTime: getFutureDateTime(1, 21, 0),
    capacity: 15,
    bookedCount: 15,
    isSoldOut: true,
  }, // Sold Out
  {
    experienceId: "cmhd04kiy0006fcngwkbpw6ok",
    dateTime: getFutureDateTime(2, 20, 0),
    capacity: 15,
    bookedCount: 1,
    isSoldOut: false,
  },
  {
    experienceId: "cmhd04kiy0006fcngwkbpw6ok",
    dateTime: getFutureDateTime(2, 22, 0),
    capacity: 15,
    bookedCount: 5,
    isSoldOut: false,
  },
  {
    experienceId: "cmhd04kiy0006fcngwkbpw6ok",
    dateTime: getFutureDateTime(3, 19, 0),
    capacity: 15,
    bookedCount: 0,
    isSoldOut: false,
  },
  {
    experienceId: "cmhd04kiy0006fcngwkbpw6ok",
    dateTime: getFutureDateTime(3, 21, 0),
    capacity: 15,
    bookedCount: 10,
    isSoldOut: false,
  },
  {
    experienceId: "cmhd04kiy0006fcngwkbpw6ok",
    dateTime: getFutureDateTime(4, 20, 0),
    capacity: 15,
    bookedCount: 2,
    isSoldOut: false,
  },
  {
    experienceId: "cmhd04kiy0006fcngwkbpw6ok",
    dateTime: getFutureDateTime(4, 22, 0),
    capacity: 15,
    bookedCount: 4,
    isSoldOut: false,
  },
  {
    experienceId: "cmhd04kiy0006fcngwkbpw6ok",
    dateTime: getFutureDateTime(4, 23, 0),
    capacity: 15,
    bookedCount: 0,
    isSoldOut: false,
  },
  {
    experienceId: "cmhd04kiy0006fcngwkbpw6ok",
    dateTime: getFutureDateTime(3, 23, 0),
    capacity: 15,
    bookedCount: 0,
    isSoldOut: false,
  },
  {
    experienceId: "cmhd04kiy0006fcngwkbpw6ok",
    dateTime: getFutureDateTime(2, 23, 0),
    capacity: 15,
    bookedCount: 0,
    isSoldOut: false,
  },
  {
    experienceId: "cmhd04kiy0006fcngwkbpw6ok",
    dateTime: getFutureDateTime(1, 23, 0),
    capacity: 15,
    bookedCount: 0,
    isSoldOut: false,
  },
  {
    experienceId: "cmhd04kiy0006fcngwkbpw6ok",
    dateTime: getFutureDateTime(1, 18, 0),
    capacity: 15,
    bookedCount: 0,
    isSoldOut: false,
  },
  {
    experienceId: "cmhd04kiy0006fcngwkbpw6ok",
    dateTime: getFutureDateTime(1, 17, 0),
    capacity: 15,
    bookedCount: 0,
    isSoldOut: false,
  },

  // --- Experience 8: PADI Certified Scuba Diving Expedition (Capacity 4) ---
  {
    experienceId: "cmhd04klo0007fcng3ow8wce2",
    dateTime: getFutureDateTime(1, 8, 0),
    capacity: 4,
    bookedCount: 4,
    isSoldOut: true,
  }, // Sold Out
  {
    experienceId: "cmhd04klo0007fcng3ow8wce2",
    dateTime: getFutureDateTime(2, 7, 30),
    capacity: 4,
    bookedCount: 3,
    isSoldOut: false,
  }, // Nearly Full
  {
    experienceId: "cmhd04klo0007fcng3ow8wce2",
    dateTime: getFutureDateTime(2, 12, 0),
    capacity: 4,
    bookedCount: 0,
    isSoldOut: false,
  },
  {
    experienceId: "cmhd04klo0007fcng3ow8wce2",
    dateTime: getFutureDateTime(3, 8, 30),
    capacity: 4,
    bookedCount: 1,
    isSoldOut: false,
  },
  {
    experienceId: "cmhd04klo0007fcng3ow8wce2",
    dateTime: getFutureDateTime(3, 13, 0),
    capacity: 4,
    bookedCount: 0,
    isSoldOut: false,
  },
  {
    experienceId: "cmhd04klo0007fcng3ow8wce2",
    dateTime: getFutureDateTime(4, 9, 0),
    capacity: 4,
    bookedCount: 2,
    isSoldOut: false,
  },
  {
    experienceId: "cmhd04klo0007fcng3ow8wce2",
    dateTime: getFutureDateTime(4, 14, 0),
    capacity: 4,
    bookedCount: 0,
    isSoldOut: false,
  },
  {
    experienceId: "cmhd04klo0007fcng3ow8wce2",
    dateTime: getFutureDateTime(4, 16, 0),
    capacity: 4,
    bookedCount: 0,
    isSoldOut: false,
  },
  {
    experienceId: "cmhd04klo0007fcng3ow8wce2",
    dateTime: getFutureDateTime(4, 18, 0),
    capacity: 4,
    bookedCount: 0,
    isSoldOut: false,
  },
  {
    experienceId: "cmhd04klo0007fcng3ow8wce2",
    dateTime: getFutureDateTime(4, 20, 0),
    capacity: 4,
    bookedCount: 0,
    isSoldOut: false,
  },
  {
    experienceId: "cmhd04klo0007fcng3ow8wce2",
    dateTime: getFutureDateTime(3, 20, 0),
    capacity: 4,
    bookedCount: 0,
    isSoldOut: false,
  },
  {
    experienceId: "cmhd04klo0007fcng3ow8wce2",
    dateTime: getFutureDateTime(2, 20, 0),
    capacity: 4,
    bookedCount: 0,
    isSoldOut: false,
  },
  {
    experienceId: "cmhd04klo0007fcng3ow8wce2",
    dateTime: getFutureDateTime(1, 20, 0),
    capacity: 4,
    bookedCount: 0,
    isSoldOut: false,
  },
  {
    experienceId: "cmhd04klo0007fcng3ow8wce2",
    dateTime: getFutureDateTime(1, 22, 0),
    capacity: 4,
    bookedCount: 0,
    isSoldOut: false,
  },

  // --- Experience 9: Tandem Paragliding over the Alps (Capacity 1) ---
  {
    experienceId: "cmhd04koe0008fcnga9xksn0i",
    dateTime: getFutureDateTime(1, 9, 0),
    capacity: 1,
    bookedCount: 1,
    isSoldOut: true,
  }, // Sold Out
  {
    experienceId: "cmhd04koe0008fcnga9xksn0i",
    dateTime: getFutureDateTime(1, 12, 0),
    capacity: 1,
    bookedCount: 0,
    isSoldOut: false,
  },
  {
    experienceId: "cmhd04koe0008fcnga9xksn0i",
    dateTime: getFutureDateTime(1, 15, 0),
    capacity: 1,
    bookedCount: 0,
    isSoldOut: false,
  },
  {
    experienceId: "cmhd04koe0008fcnga9xksn0i",
    dateTime: getFutureDateTime(2, 10, 0),
    capacity: 1,
    bookedCount: 0,
    isSoldOut: false,
  },
  {
    experienceId: "cmhd04koe0008fcnga9xksn0i",
    dateTime: getFutureDateTime(2, 13, 0),
    capacity: 1,
    bookedCount: 1,
    isSoldOut: true,
  }, // Sold Out
  {
    experienceId: "cmhd04koe0008fcnga9xksn0i",
    dateTime: getFutureDateTime(2, 16, 0),
    capacity: 1,
    bookedCount: 0,
    isSoldOut: false,
  },
  {
    experienceId: "cmhd04koe0008fcnga9xksn0i",
    dateTime: getFutureDateTime(3, 9, 30),
    capacity: 1,
    bookedCount: 0,
    isSoldOut: false,
  },
  {
    experienceId: "cmhd04koe0008fcnga9xksn0i",
    dateTime: getFutureDateTime(3, 12, 30),
    capacity: 1,
    bookedCount: 0,
    isSoldOut: false,
  },
  {
    experienceId: "cmhd04koe0008fcnga9xksn0i",
    dateTime: getFutureDateTime(3, 15, 30),
    capacity: 1,
    bookedCount: 0,
    isSoldOut: false,
  },
  {
    experienceId: "cmhd04koe0008fcnga9xksn0i",
    dateTime: getFutureDateTime(4, 10, 30),
    capacity: 1,
    bookedCount: 0,
    isSoldOut: false,
  },
  {
    experienceId: "cmhd04koe0008fcnga9xksn0i",
    dateTime: getFutureDateTime(4, 13, 30),
    capacity: 1,
    bookedCount: 0,
    isSoldOut: false,
  },
  {
    experienceId: "cmhd04koe0008fcnga9xksn0i",
    dateTime: getFutureDateTime(4, 16, 30),
    capacity: 1,
    bookedCount: 0,
    isSoldOut: false,
  },
  {
    experienceId: "cmhd04koe0008fcnga9xksn0i",
    dateTime: getFutureDateTime(4, 18, 0),
    capacity: 1,
    bookedCount: 0,
    isSoldOut: false,
  },
  {
    experienceId: "cmhd04koe0008fcnga9xksn0i",
    dateTime: getFutureDateTime(4, 20, 0),
    capacity: 1,
    bookedCount: 0,
    isSoldOut: false,
  },

  // --- Experience 10: Sunrise Trek to Nandi Hills (Capacity 30) ---
  {
    experienceId: "cmhd04kr50009fcng1pqd5cuu",
    dateTime: getFutureDateTime(1, 0, 30),
    capacity: 30,
    bookedCount: 29,
    isSoldOut: false,
  }, // Nearly Full (0:30 UTC is 6:00 AM IST)
  {
    experienceId: "cmhd04kr50009fcng1pqd5cuu",
    dateTime: getFutureDateTime(2, 0, 30),
    capacity: 30,
    bookedCount: 30,
    isSoldOut: true,
  }, // Sold Out
  {
    experienceId: "cmhd04kr50009fcng1pqd5cuu",
    dateTime: getFutureDateTime(3, 0, 30),
    capacity: 30,
    bookedCount: 15,
    isSoldOut: false,
  },
  {
    experienceId: "cmhd04kr50009fcng1pqd5cuu",
    dateTime: getFutureDateTime(4, 0, 30),
    capacity: 30,
    bookedCount: 5,
    isSoldOut: false,
  },
  {
    experienceId: "cmhd04kr50009fcng1pqd5cuu",
    dateTime: getFutureDateTime(1, 23, 30),
    capacity: 30,
    bookedCount: 10,
    isSoldOut: false,
  }, // 5:00 AM IST the next day
  {
    experienceId: "cmhd04kr50009fcng1pqd5cuu",
    dateTime: getFutureDateTime(2, 23, 30),
    capacity: 30,
    bookedCount: 20,
    isSoldOut: false,
  },
  {
    experienceId: "cmhd04kr50009fcng1pqd5cuu",
    dateTime: getFutureDateTime(3, 23, 30),
    capacity: 30,
    bookedCount: 1,
    isSoldOut: false,
  },
  {
    experienceId: "cmhd04kr50009fcng1pqd5cuu",
    dateTime: getFutureDateTime(4, 23, 30),
    capacity: 30,
    bookedCount: 0,
    isSoldOut: false,
  },
  {
    experienceId: "cmhd04kr50009fcng1pqd5cuu",
    dateTime: getFutureDateTime(1, 22, 30),
    capacity: 30,
    bookedCount: 0,
    isSoldOut: false,
  },
  {
    experienceId: "cmhd04kr50009fcng1pqd5cuu",
    dateTime: getFutureDateTime(2, 22, 30),
    capacity: 30,
    bookedCount: 0,
    isSoldOut: false,
  },
  {
    experienceId: "cmhd04kr50009fcng1pqd5cuu",
    dateTime: getFutureDateTime(3, 22, 30),
    capacity: 30,
    bookedCount: 0,
    isSoldOut: false,
  },
  {
    experienceId: "cmhd04kr50009fcng1pqd5cuu",
    dateTime: getFutureDateTime(4, 22, 30),
    capacity: 30,
    bookedCount: 0,
    isSoldOut: false,
  },
  {
    experienceId: "cmhd04kr50009fcng1pqd5cuu",
    dateTime: getFutureDateTime(1, 21, 30),
    capacity: 30,
    bookedCount: 0,
    isSoldOut: false,
  },
  {
    experienceId: "cmhd04kr50009fcng1pqd5cuu",
    dateTime: getFutureDateTime(2, 21, 30),
    capacity: 30,
    bookedCount: 0,
    isSoldOut: false,
  },

  // --- Experience 11: Extreme Canyon Bunjee Jumping (Capacity 1) ---
  {
    experienceId: "cmhd04kts000afcngyfei2fuk",
    dateTime: getFutureDateTime(1, 10, 0),
    capacity: 1,
    bookedCount: 1,
    isSoldOut: true,
  }, // Sold Out
  {
    experienceId: "cmhd04kts000afcngyfei2fuk",
    dateTime: getFutureDateTime(1, 13, 0),
    capacity: 1,
    bookedCount: 0,
    isSoldOut: false,
  },
  {
    experienceId: "cmhd04kts000afcngyfei2fuk",
    dateTime: getFutureDateTime(1, 16, 0),
    capacity: 1,
    bookedCount: 0,
    isSoldOut: false,
  },
  {
    experienceId: "cmhd04kts000afcngyfei2fuk",
    dateTime: getFutureDateTime(2, 10, 30),
    capacity: 1,
    bookedCount: 0,
    isSoldOut: false,
  },
  {
    experienceId: "cmhd04kts000afcngyfei2fuk",
    dateTime: getFutureDateTime(2, 13, 30),
    capacity: 1,
    bookedCount: 1,
    isSoldOut: true,
  }, // Sold Out
  {
    experienceId: "cmhd04kts000afcngyfei2fuk",
    dateTime: getFutureDateTime(3, 10, 0),
    capacity: 1,
    bookedCount: 0,
    isSoldOut: false,
  },
  {
    experienceId: "cmhd04kts000afcngyfei2fuk",
    dateTime: getFutureDateTime(3, 14, 0),
    capacity: 1,
    bookedCount: 0,
    isSoldOut: false,
  },
  {
    experienceId: "cmhd04kts000afcngyfei2fuk",
    dateTime: getFutureDateTime(4, 11, 0),
    capacity: 1,
    bookedCount: 0,
    isSoldOut: false,
  },
  {
    experienceId: "cmhd04kts000afcngyfei2fuk",
    dateTime: getFutureDateTime(4, 14, 0),
    capacity: 1,
    bookedCount: 0,
    isSoldOut: false,
  },
  {
    experienceId: "cmhd04kts000afcngyfei2fuk",
    dateTime: getFutureDateTime(4, 17, 0),
    capacity: 1,
    bookedCount: 0,
    isSoldOut: false,
  },
  {
    experienceId: "cmhd04kts000afcngyfei2fuk",
    dateTime: getFutureDateTime(4, 19, 0),
    capacity: 1,
    bookedCount: 0,
    isSoldOut: false,
  },
  {
    experienceId: "cmhd04kts000afcngyfei2fuk",
    dateTime: getFutureDateTime(3, 17, 0),
    capacity: 1,
    bookedCount: 0,
    isSoldOut: false,
  },
  {
    experienceId: "cmhd04kts000afcngyfei2fuk",
    dateTime: getFutureDateTime(2, 17, 0),
    capacity: 1,
    bookedCount: 0,
    isSoldOut: false,
  },
  {
    experienceId: "cmhd04kts000afcngyfei2fuk",
    dateTime: getFutureDateTime(1, 17, 0),
    capacity: 1,
    bookedCount: 0,
    isSoldOut: false,
  },

  // --- Experience 12: Estate to Cup: South Indian Coffee Trail (Capacity 10) ---
  {
    experienceId: "cmhd04kwi000bfcngla4y0v95",
    dateTime: getFutureDateTime(1, 9, 0),
    capacity: 10,
    bookedCount: 9,
    isSoldOut: false,
  }, // Nearly Full
  {
    experienceId: "cmhd04kwi000bfcngla4y0v95",
    dateTime: getFutureDateTime(1, 14, 0),
    capacity: 10,
    bookedCount: 10,
    isSoldOut: true,
  }, // Sold Out
  {
    experienceId: "cmhd04kwi000bfcngla4y0v95",
    dateTime: getFutureDateTime(2, 10, 0),
    capacity: 10,
    bookedCount: 0,
    isSoldOut: false,
  },
  {
    experienceId: "cmhd04kwi000bfcngla4y0v95",
    dateTime: getFutureDateTime(2, 15, 0),
    capacity: 10,
    bookedCount: 5,
    isSoldOut: false,
  },
  {
    experienceId: "cmhd04kwi000bfcngla4y0v95",
    dateTime: getFutureDateTime(3, 9, 30),
    capacity: 10,
    bookedCount: 1,
    isSoldOut: false,
  },
  {
    experienceId: "cmhd04kwi000bfcngla4y0v95",
    dateTime: getFutureDateTime(3, 14, 30),
    capacity: 10,
    bookedCount: 3,
    isSoldOut: false,
  },
  {
    experienceId: "cmhd04kwi000bfcngla4y0v95",
    dateTime: getFutureDateTime(4, 10, 0),
    capacity: 10,
    bookedCount: 0,
    isSoldOut: false,
  },
  {
    experienceId: "cmhd04kwi000bfcngla4y0v95",
    dateTime: getFutureDateTime(4, 15, 0),
    capacity: 10,
    bookedCount: 2,
    isSoldOut: false,
  },
  {
    experienceId: "cmhd04kwi000bfcngla4y0v95",
    dateTime: getFutureDateTime(4, 17, 0),
    capacity: 10,
    bookedCount: 0,
    isSoldOut: false,
  },
  {
    experienceId: "cmhd04kwi000bfcngla4y0v95",
    dateTime: getFutureDateTime(3, 17, 0),
    capacity: 10,
    bookedCount: 0,
    isSoldOut: false,
  },
  {
    experienceId: "cmhd04kwi000bfcngla4y0v95",
    dateTime: getFutureDateTime(2, 17, 0),
    capacity: 10,
    bookedCount: 0,
    isSoldOut: false,
  },
  {
    experienceId: "cmhd04kwi000bfcngla4y0v95",
    dateTime: getFutureDateTime(1, 17, 0),
    capacity: 10,
    bookedCount: 0,
    isSoldOut: false,
  },
  {
    experienceId: "cmhd04kwi000bfcngla4y0v95",
    dateTime: getFutureDateTime(1, 19, 0),
    capacity: 10,
    bookedCount: 0,
    isSoldOut: false,
  },
  {
    experienceId: "cmhd04kwi000bfcngla4y0v95",
    dateTime: getFutureDateTime(2, 19, 0),
    capacity: 10,
    bookedCount: 0,
    isSoldOut: false,
  },

  // --- Experience 13: Advanced Coffee Roasting Workshop (Capacity 8) ---
  {
    experienceId: "cmhd04kz8000cfcng9zkjxcoi",
    dateTime: getFutureDateTime(5, 11, 0),
    capacity: 8,
    bookedCount: 0,
    isSoldOut: false,
  },
  {
    experienceId: "cmhd04kz8000cfcng9zkjxcoi",
    dateTime: getFutureDateTime(5, 16, 0),
    capacity: 8,
    bookedCount: 7,
    isSoldOut: false,
  }, // Nearly Full
  {
    experienceId: "cmhd04kz8000cfcng9zkjxcoi",
    dateTime: getFutureDateTime(6, 12, 0),
    capacity: 8,
    bookedCount: 8,
    isSoldOut: true,
  }, // Sold Out
  {
    experienceId: "cmhd04kz8000cfcng9zkjxcoi",
    dateTime: getFutureDateTime(6, 17, 0),
    capacity: 8,
    bookedCount: 2,
    isSoldOut: false,
  },
  {
    experienceId: "cmhd04kz8000cfcng9zkjxcoi",
    dateTime: getFutureDateTime(7, 11, 30),
    capacity: 8,
    bookedCount: 1,
    isSoldOut: false,
  },
  {
    experienceId: "cmhd04kz8000cfcng9zkjxcoi",
    dateTime: getFutureDateTime(7, 16, 30),
    capacity: 8,
    bookedCount: 4,
    isSoldOut: false,
  },
  {
    experienceId: "cmhd04kz8000cfcng9zkjxcoi",
    dateTime: getFutureDateTime(8, 12, 30),
    capacity: 8,
    bookedCount: 0,
    isSoldOut: false,
  },
  {
    experienceId: "cmhd04kz8000cfcng9zkjxcoi",
    dateTime: getFutureDateTime(8, 17, 30),
    capacity: 8,
    bookedCount: 3,
    isSoldOut: false,
  },
  {
    experienceId: "cmhd04kz8000cfcng9zkjxcoi",
    dateTime: getFutureDateTime(8, 19, 30),
    capacity: 8,
    bookedCount: 0,
    isSoldOut: false,
  },
  {
    experienceId: "cmhd04kz8000cfcng9zkjxcoi",
    dateTime: getFutureDateTime(7, 19, 30),
    capacity: 8,
    bookedCount: 0,
    isSoldOut: false,
  },
  {
    experienceId: "cmhd04kz8000cfcng9zkjxcoi",
    dateTime: getFutureDateTime(6, 19, 30),
    capacity: 8,
    bookedCount: 0,
    isSoldOut: false,
  },
  {
    experienceId: "cmhd04kz8000cfcng9zkjxcoi",
    dateTime: getFutureDateTime(5, 19, 30),
    capacity: 8,
    bookedCount: 0,
    isSoldOut: false,
  },
  {
    experienceId: "cmhd04kz8000cfcng9zkjxcoi",
    dateTime: getFutureDateTime(5, 14, 0),
    capacity: 8,
    bookedCount: 0,
    isSoldOut: false,
  },
  {
    experienceId: "cmhd04kz8000cfcng9zkjxcoi",
    dateTime: getFutureDateTime(6, 15, 0),
    capacity: 8,
    bookedCount: 0,
    isSoldOut: false,
  },
];

async function main() {
  console.log("Start seeding for Slots...");

  // Create new records
  for (const slot of slotsToCreate) {
    await prisma.slot.create({
      data: {
        ...slot,
      },
    });
  }

  console.log(`Seeding finished. Added ${slotsToCreate.length} total slots.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
