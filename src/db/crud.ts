import {usersTable} from "./schema.js";
import {eq} from "drizzle-orm";

export async function createUser(db: any, name: string, email: string) {
   return await db.insert(usersTable).values({name, email}).returning();

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

export async function updateUser(db: any, id: number, name: string, email: string) {
    const user = await db.update(usersTable).set({name, email}).where(eq(usersTable.id, id));
    return user;
}