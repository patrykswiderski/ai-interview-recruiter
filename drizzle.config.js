/** @type { import("drizzle-kit").Config } */
import dotenv from 'dotenv'

dotenv.config()

const dbUrl = process.env.NEXT_PUBLIC_DRIZZLE_DB_URL

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
