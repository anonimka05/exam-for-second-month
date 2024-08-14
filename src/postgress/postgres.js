// import pg from "pg";
// import { databaseConfig } from "../config/config.js";

// const pool = new pg.Pool({
//   database: databaseConfig.database,
//   password: databaseConfig.password,
//   user: databaseConfig.user,
//   host: databaseConfig.host,
//   port: databaseConfig.port,
// });

// export async function fetchData(query, ...params) {
//   const client = await pool.connect();
  
//   try {
//     const { rows } = await client.query(query, params?.length ? params : []);
//     console.log(rows);
//     // console.log(params);
//     return rows;
//   } catch (error) {
//     console.log(error);
//   } finally {
//     client.release();
//   }
// }



import pg from "pg";
import { databaseConfig } from "../config/config.js";

const pool = new pg.Pool({
  database: databaseConfig.database,
  password: databaseConfig.password,
  user: databaseConfig.user,
  host: databaseConfig.host,
  port: databaseConfig.port,
});

export async function fetchData(query, ...params) {
  const client = await pool.connect();

  try {
    const { rows } = await client.query(query, params?.length ? params : []);
    return rows;
  } catch (error) {
    console.log(error);
  } finally {
    client.release();
  }
}
