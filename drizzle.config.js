/** @type { import("drizzle-kit").Config } */
export default {
  schema: "./utils/schema.js",
  dialect: 'postgresql',
  dbCredentials: {
    // url: process.env.NEXT_PUBLIC_DRIZZLE_DB_URL,
    url: 'postgresql://ai-interview-recruiter_owner:IZ4cYltb1GAD@ep-sparkling-bonus-a5wg1jm0.us-east-2.aws.neon.tech/ai-interview-recruiter?sslmode=require'
  }
};