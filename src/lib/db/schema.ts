import {integer, pgEnum, pgTable, serial, text, timestamp, varchar} from "drizzle-orm/pg-core"

export const userSystemEnum = pgEnum('user_system_enum', ['system', 'user'])

// users table schema definition
export const chats = pgTable('chats', {
    id: serial("id").primaryKey(),
    pdfName: text("pdf_name").notNull(),
    pdfUrl: text("pdf_url").notNull(),
    createAt: timestamp("create_at").notNull().defaultNow(),
    userId: varchar("user_id").notNull(),
    fillKey: text("fill_key").notNull(),
})
export type DrizzleChat = typeof chats.$inferSelect;
// messages table schema definition
export const messages = pgTable('messages', {
    id: serial("id").primaryKey(),
    chatId: integer("chat_id").references(() => chats.id).notNull(),
    content: text("content").notNull(),
    createAt: timestamp("create_at").notNull().defaultNow(),
    role: userSystemEnum("role").notNull(),

})