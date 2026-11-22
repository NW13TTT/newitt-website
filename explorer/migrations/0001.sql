CREATE TABLE IF NOT EXISTS destinations (
  id TEXT PRIMARY KEY, name TEXT NOT NULL, region TEXT NOT NULL, description TEXT NOT NULL,
  reference TEXT, normalized TEXT NOT NULL, status TEXT NOT NULL DEFAULT 'pending'
    CHECK(status IN ('pending','rejected','open','closed','planned','filmed','published')),
  latitude REAL, longitude REAL, created INTEGER NOT NULL
);
CREATE UNIQUE INDEX IF NOT EXISTS unique_destination ON destinations(normalized) WHERE status <> 'rejected';
CREATE TABLE IF NOT EXISTS votes (
  destination TEXT NOT NULL REFERENCES destinations(id) ON DELETE CASCADE,
  visitor TEXT NOT NULL, PRIMARY KEY(destination, visitor)
);
CREATE TABLE IF NOT EXISTS vote_windows (
  destination TEXT NOT NULL REFERENCES destinations(id) ON DELETE CASCADE,
  public_network TEXT NOT NULL, expires INTEGER NOT NULL, PRIMARY KEY(destination, public_network)
);
CREATE TABLE IF NOT EXISTS limits (
  bucket TEXT PRIMARY KEY, count INTEGER NOT NULL, expires INTEGER NOT NULL
);
CREATE TABLE IF NOT EXISTS flights (
  id TEXT PRIMARY KEY, name TEXT NOT NULL, region TEXT NOT NULL, description TEXT NOT NULL,
  latitude REAL NOT NULL, longitude REAL NOT NULL, photo TEXT, film TEXT, youtube TEXT, soundtrack TEXT,
  source TEXT NOT NULL
);
