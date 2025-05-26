-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Table: companions
CREATE TABLE IF NOT EXISTS companions (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT NOT NULL,
    subject TEXT NOT NULL,
    topic TEXT NOT NULL,
    voice TEXT NOT NULL,
    style TEXT NOT NULL,
    duration INTEGER NOT NULL,
    author TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, now()) NOT NULL
);

-- Indexes for companions
CREATE INDEX IF NOT EXISTS companions_author_idx ON companions(author);

-- Table: session_history
CREATE TABLE IF NOT EXISTS session_history (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    companion_id UUID NOT NULL REFERENCES companions(id) ON DELETE CASCADE,
    user_id TEXT NOT NULL,
    messages JSONB NOT NULL DEFAULT '[]',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, now()) NOT NULL
);

-- Indexes for session_history
CREATE INDEX IF NOT EXISTS session_history_companion_id_idx ON session_history(companion_id);
CREATE INDEX IF NOT EXISTS session_history_user_id_idx ON session_history(user_id);
CREATE INDEX IF NOT EXISTS session_history_created_at_idx ON session_history(created_at);

-- Table: bookmarks
CREATE TABLE IF NOT EXISTS bookmarks (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id TEXT NOT NULL,
    companion_id UUID NOT NULL REFERENCES companions(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, now()) NOT NULL
);

-- Indexes for bookmarks
CREATE INDEX IF NOT EXISTS bookmarks_user_id_idx ON bookmarks(user_id);
CREATE INDEX IF NOT EXISTS bookmarks_companion_id_idx ON bookmarks(companion_id);
