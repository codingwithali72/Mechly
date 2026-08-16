import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function createClient() {
  const cookieStore = await cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://missing-url.supabase.co',
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'missing-key',
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    }
  )
}

export async function ensureCustomerProfile() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    throw new Error('Not authenticated')
  }

  // Check if profile exists
  let { data: profile } = await supabase.from('profiles').select('*').eq('id', user.id).single()
  
  if (!profile) {
    // Create profile
    const { data: newProfile, error } = await supabase.from('profiles').insert({
      id: user.id,
      full_name: user.user_metadata?.full_name || user.email?.split('@')[0] || 'User',
      email: user.email,
      role: 'CUSTOMER'
    }).select().single()
    
    if (error) throw new Error('Failed to create profile: ' + error.message)
    profile = newProfile
  }

  // Check if customer exists
  let { data: customer } = await supabase.from('customers').select('*').eq('profile_id', user.id).single()
  
  if (!customer) {
    // Create customer
    const customerCode = 'CUST-' + Math.random().toString(36).substr(2, 6).toUpperCase()
    const { data: newCustomer, error } = await supabase.from('customers').insert({
      profile_id: user.id,
      customer_code: customerCode
    }).select().single()
    
    if (error) throw new Error('Failed to create customer record: ' + error.message)
    customer = newCustomer
  }

  return { user, profile, customer }
}
