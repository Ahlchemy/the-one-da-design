import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://hbissyraoyaktmfyhjqt.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhiaXNzeXJhb3lha3RtZnloanF0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI1NTMxODgsImV4cCI6MjA3ODEyOTE4OH0.V8BULwAR_fQttjeBaonUp0OWQsWLQrp4TrP0YwnYHFE'

const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function createAdminUser() {
  try {
    const { data, error } = await supabase.auth.signUp({
      email: 'dean@deanahlgren.com',
      password: 'wakaKaka808',
      options: {
        emailRedirectTo: undefined,
        data: {
          role: 'admin'
        }
      }
    })

    if (error) {
      console.error('Error creating admin user:', error.message)
      process.exit(1)
    }

    console.log('✅ Admin user created successfully!')
    console.log('Email:', data.user?.email)
    console.log('User ID:', data.user?.id)
    console.log('\nYou can now login at: /login')
    console.log('Email: dean@deanahlgren.com')
    console.log('Password: wakaKaka808')
  } catch (err) {
    console.error('Unexpected error:', err)
    process.exit(1)
  }
}

createAdminUser()
