;
import { int, real, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const usersTable = sqliteTable("users_table", {
  id: int().primaryKey({ autoIncrement: true }),
  name: text().notNull(),
  email: text().notNull().unique(),
  phone: int(),
  address: text(),
  isAdmin: int()
});

export const courseTable = sqliteTable('courses', {
  id: int().primaryKey(),
  course_name: text().notNull(),
  course_details: text().notNull(),
  image: text().notNull(),
  rating: real().notNull(),
  enrolled: int().notNull(),
  category: text().notNull(),
  lessons: int().notNull(),
  price: real().notNull(),
});

export const cartTable = sqliteTable('cart', {
  id: int().primaryKey({autoIncrement: true}),
  email: text().notNull(),
  course_name: text().notNull(),
  category: text(),
  image: text(),
  price: int().notNull(),
  rating: text(),
  lessons: int(),
  date: text().notNull()
});

