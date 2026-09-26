import postgres from 'postgres'

let sql: postgres.Sql | null | undefined

// Postgres connection to Supabase (transaction pooler), configured with the DB_* variables
// from .env, or DATABASE_URL. Returns null when no database is configured, so callers can
// decide whether that's fatal (bookings) or just means "no data yet" (figures).
export function useDb(): postgres.Sql | null {
  if (sql !== undefined) return sql
  const env = process.env
  const options: postgres.Options<{}> = {
    // Supabase's transaction pooler (port 6543) doesn't support prepared statements
    prepare: false,
    max: 5,
    idle_timeout: 20,
    connect_timeout: 10,
    ssl: (env.DB_SSLMODE ?? 'require') === 'disable' ? false : 'require',
  }
  if (env.DATABASE_URL) sql = postgres(env.DATABASE_URL, options)
  else if (env.DB_HOST && env.DB_PASSWORD) {
    sql = postgres({
      ...options,
      host: env.DB_HOST,
      port: Number(env.DB_PORT ?? 6543),
      database: env.DB_DATABASE ?? 'postgres',
      username: env.DB_USERNAME,
      password: env.DB_PASSWORD,
    })
  }
  else sql = null
  if (!sql) console.warn('[db] DB_* / DATABASE_URL not set — backend data disabled')
  return sql
}
