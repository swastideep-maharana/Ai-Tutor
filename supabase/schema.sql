-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create companions table if it doesn't exist
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

-- Create session_history table with proper relationship
CREATE TABLE IF NOT EXISTS session_history (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    companion_id UUID NOT NULL REFERENCES companions(id) ON DELETE CASCADE,
    user_id TEXT NOT NULL,
    messages JSONB NOT NULL DEFAULT '[]',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, now()) NOT NULL
);

-- Add indexes for better query performance
CREATE INDEX IF NOT EXISTS companions_author_idx ON companions(author);
CREATE INDEX IF NOT EXISTS session_history_companion_id_idx ON session_history(companion_id);
CREATE INDEX IF NOT EXISTS session_history_user_id_idx ON session_history(user_id);
CREATE INDEX IF NOT EXISTS session_history_created_at_idx ON session_history(created_at);