
# 📚 BookIt: Experience Booking Platform
BookIt is a modern, fast, and fully type-safe application designed for browsing, scheduling, and securely booking unique experiences (e.g., classes, tours, or workshops).

## 🚀 Key Features
Seamless Booking Flow: Multi-step client flow from slot selection to secure checkout.

Secure API Architecture: Decoupled data handling using Hono.js APIs integrated within Next.js.

Atomic Booking: Server-side transaction logic ensures capacity is checked and updated before a booking record is finalized.

Promo Code Validation: Secure API for validating discount codes (percentage/fixed) against database rules (active, expiration).

Intelligent Search: Server-side filtering of experiences based on URL query parameters (/experiences?q=term).

Type Safety: End-to-end reliability using TypeScript, Prisma, and Zod.

## ⚙️ Getting Started
These instructions will get your project running locally.

Prerequisites
You need the following installed:

Node.js (v18+)

npm or yarn or bun

Installation
Clone the repository:

Bash
```
git clone https://github.com/jai2826/bookit.git
cd bookit
```
#### Install dependencies:
Bash
```
npm install
```
or
```
yarn install
```
or 
```
bun install
```
### Set up Environment Variables:
 Create a file named .env in the root directory.

```
DATABASE_URL="postgresql://hostedonserveofyourchoise" 
// Add the URL of the database hosted by you

NEXT_PUBLIC_APP_URL="http://localhost:3000" 

```
### Run the prisma generate command
```
npx prisma generate
```

### Apply the schema 
```
npx prisma migrate dev --name init
```
### Run the seed script 
```
npx prisma db seed
```

## Run the Development Server:

Bash
```
npm run dev
```
or
```
yarn dev
```
The application will now be running at http://localhost:3000.


## 🛠️ Tech Stack
| Category	| Technology	| Purpose
|---|:---:|---:|
| Frontend	| Next.js (App Router)	| React framework for routing, rendering, and Server Components.
| Styling	| Tailwind CSS	| Utility-first CSS for rapid styling and consistency.
| Components	| shadcn/ui	| Accessible, customizable UI built on Radix.
| Backend/API	| Hono.js	| Fast, lightweight routing layer for API endpoints.
| ORM	| Prisma	| Database toolkit for modeling and secure querying.
| Validation	| Zod | React Hook Form	Schema validation for form data and API contracts.
| UI	| Sonner	| Clean, modern toasts for notifications.

## 📂 Key Endpoints and Data Flow
The architecture separates concerns: the database connection and complex logic live in the Hono API routes, which are called by the Next.js frontend.
| Method | Endpoint | Description
|---|---|---|
| GET | /api/experiences?q= | Retrieves filtered list of experiences based on q search term.
| GET | /api/slots/:id | Retrieves a single slot and its related experience details.
| GET | /api/promocodes/:code/validate | Validation endpoint. Checks code against active status, expiry, and existence.
| POST | /api/bookings | Core Booking Logic. Performs capacity check, discount calculation, and records the new booking inside a secure Prisma Transaction.



