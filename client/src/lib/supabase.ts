import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://hbissyraoyaktmfyhjqt.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhiaXNzeXJhb3lha3RtZnloanF0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI1NTMxODgsImV4cCI6MjA3ODEyOTE4OH0.V8BULwAR_fQttjeBaonUp0OWQsWLQrp4TrP0YwnYHFE'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export type Project = {
  id: string
  title: string
  description: string | null
  image_url: string | null
  project_url: string | null
  tools: string[] | null
  scope: string | null
  domain: string | null
  gradient: string | null
  metrics: string | null
  testimonial: string | null
  testimonial_author: string | null
  before_after: string | null
  implementation_process: string | null
  slug: string
  created_at: string
  updated_at: string
}

export type Article = {
  id: string
  title: string
  slug: string
  content: string
  cover_image_url: string | null
  excerpt: string | null
  author: string
  category: string | null
  tags: string[] | null
  reading_time: number | null
  published_at: string | null
  created_at: string
  updated_at: string
}

export type Resource = {
  id: string
  title: string
  description: string | null
  file_url: string | null
  category: string | null
  file_type: string | null
  created_at: string
}
