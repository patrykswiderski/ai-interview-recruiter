/** @type { import("drizzle-kit").Config } */
import dotenv from 'dotenv'

dotenv.config()

const dbUrl =
  'postgresql://ai-interview-recruiter_owner:IZ4cYltb1GAD@ep-sparkling-bonus-a5wg1jm0.us-east-2.aws.neon.tech/ai-interview-recruiter?sslmode=require'

if (!dbUrl) {
  throw new Error(
    'Environment variable NEXT_PUBLIC_DRIZZLE_DB_URL is not defined.',
  )
}

export default {
  schema: './utils/schema.js',
  dialect: 'postgresql',
  dbCredentials: {
    url: dbUrl,
  },
}
