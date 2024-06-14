import { pgTable, serial, varchar, text } from 'drizzle-orm/pg-core'

export const AiRecruiterInterview = pgTable('aiRecruiterInterview', {
  id: serial('id').primaryKey(),
  jsonAriResp: text('jsonAriResp').notNull(),
  jobPosition: varchar('jobPosition').notNull(),
  jobDesc: varchar('jobDesc').notNull(),
  jobExperience: varchar('jobExperience').notNull(),
  createdBy: varchar('createdBy').notNull(),
  createdAt: varchar('createdAt').notNull(),
  ariId: varchar('ariId').notNull(),
})

export const UserAnswer = pgTable('userAnswer', {
  id: serial('id').primaryKey(),
  airIdRef: varchar('airId').notNull(),
  question: varchar('question').notNull(),
  userAnswer: text('userAnswer').notNull(),
  correctAnswer: text('correctAnswer').notNull(),
  feedback: text('feedback').notNull(),
  rating: varchar('rating').notNull(),
  userEmail: varchar('userEmail').notNull(),
  createdAt: varchar('createdAt').notNull(),
})
