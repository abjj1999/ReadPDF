import {neon, neonConfig} from "@neondatabase/serverless"
import { drizzle } from "drizzle-orm/neon-http"

neonConfig.fetchConnectionCache = true

if(!process.env.NEONDB_URL){
    throw new Error("data base url is not defined")
}

const sql = neon(process.env.NEONDB_URL)

export const db = drizzle(sql)