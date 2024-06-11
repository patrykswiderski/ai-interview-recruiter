import { pgTable, serial, varchar, text } from "drizzle-orm/pg-core";

export const AiRecruiterInterview = pgTable("aiRecruiterInterview", {
  id: serial('id').primaryKey(),
  jsonAriResp: text('jsonAriResp').notNull(),
  jobPosition: varchar('jobPosition').notNull(),
  jobDes: varchar('jobDes').notNull(),
  jobDesc: varchar('jobDesc').notNull(),
  jobExperience: varchar('jobExperience').notNull(),
  createdBy: varchar('createdBy').notNull(),
  createdAt: varchar('createdAt').notNull(),
  ariId: varchar('ariId').notNull(),

})