import {usersTable, courseTable, cartTable} from "./schema.js";
import {eq} from "drizzle-orm";

export async function createUser(db: any, name: string, email: string, phone: number, address: string) {
    return await db.insert(usersTable).values({
      name,
      email,
      phone,
      address
    }).returning();
  }

export async function getUsers(db: any) {
    const users = await db.select().from(usersTable);
    return users;
}

export async function getUser(db: any, id: number) {
    const user = await db.select().from(usersTable).where(eq(usersTable.id, id));
    return user;
}

export async function deleteUser(db: any, id: number) {
    const user = await db.delete(usersTable).where(eq(usersTable.id, id));
    return user;
}

export async function updateUser(db: any, id: number) {
    const user = await db.update(usersTable)
    .set({isAdmin: 1})
    .where(eq(usersTable.id, id));
    return user;
}

export async function insertCart(
  db: any,
    cartItem: {email: string,
    course_name: string,
    category: string,
    image: string,
    price: number,
    rating: number,
    lessons: number,
    date: string,
}) {
  return await db.insert(cartTable).values(cartItem).returning();
}

  export async function getCart(db: any, email: string) {
    return await db
      .select()
      .from(cartTable)
      .where(eq(cartTable.email, email));
  }
  
  export async function deleteCart(db: any, id: number) {
    return await db.delete(cartTable).where(eq(cartTable.id, id));
  }

  export async function updateCart(db: any, id: number, status: string) {
    return await db.update(cartTable)
      .set({ status })
      .where(eq(cartTable.id, id));
  }

  export async function getCourses(db: any) {
    const result = await db.select().from(courseTable);
    return result;
  }