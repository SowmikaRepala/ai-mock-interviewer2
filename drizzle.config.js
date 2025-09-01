/** @type {import("drizzle-kit").Config} */
export default {
  schema: "public/utils/schema.js",  // ✅ JS file path
  dialect: "postgresql",        // ✅ specify your DB dialect
  dbCredentials: {
    url: process.env.DATABASE_URL || "postgresql://neondb_owner:npg_lL3qgiJ6fnbM@ep-solitary-king-a1c6kq85-pooler.ap-southeast-1.aws.neon.tech/aimockinterviewer?sslmode=require&channel_binding=requirep",  // ✅ or hardcoded if needed
  },
};
