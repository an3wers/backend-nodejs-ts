import { Pool, PoolConfig } from "pg";
import { getDbConfig } from "./config";
import 'dotenv/config'

const pool = new Pool(getDbConfig() as PoolConfig);

export default pool;
