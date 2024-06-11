/** @type { import("drizzle-kit").Config } */
import dotenv from 'dotenv'
dotenv.config()

export default {
  schema: './utils/schema.js',
  dialect: 'postgresql',
  dbCredentials: {
    url: 'postgresql://ai-interview-recruiter_owner:IZ4cYltb1GAD@ep-sparkling-bonus-a5wg1jm0.us-east-2.aws.neon.tech/ai-interview-recruiter?sslmode=require',
  },
}
