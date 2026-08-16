import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

const supabase = createClient(supabaseUrl, supabaseKey)

async function restore() {
  console.log('Restoring 8 original services...')
  
  // First, we must get existing services so we don't break foreign keys for existing bookings.
  const { data: existing } = await supabase.from('services').select('*').order('created_at', { ascending: true })
  
  const targetServices = [
    { name: 'General Repair', description: 'Complete vehicle checkup', base_price: 999, category: 'MAINTENANCE', icon: 'wrench' },
    { name: 'Battery', description: 'Jump-start or replace', base_price: 500, category: 'ELECTRICAL', icon: 'battery' },
    { name: 'Puncture', description: 'Fix flat tyres quickly', base_price: 300, category: 'TYRES', icon: 'tire' },
    { name: 'Brake', description: 'Brake pad replacement or tightening', base_price: 400, category: 'MECHANICAL', icon: 'brake' },
    { name: 'Engine', description: 'Engine diagnosis and fix', base_price: 500, category: 'ENGINE', icon: 'engine' },
    { name: 'Oil Change', description: 'Engine oil replacement', base_price: 400, category: 'MAINTENANCE', icon: 'droplets' },
    { name: 'Tyre', description: 'Tyre replacement', base_price: 400, category: 'TYRES', icon: 'tire' },
    { name: 'Electrical', description: 'Wiring and lights', base_price: 450, category: 'ELECTRICAL', icon: 'zap' }
  ]

  // Update existing ones to match targets, insert missing ones
  for (let i = 0; i < targetServices.length; i++) {
    if (existing && existing[i]) {
      await supabase.from('services').update(targetServices[i]).eq('id', existing[i].id)
    } else {
      await supabase.from('services').insert(targetServices[i])
    }
  }

  // Delete any extras beyond the 8
  if (existing && existing.length > 8) {
    for (let i = 8; i < existing.length; i++) {
      await supabase.from('services').delete().eq('id', existing[i].id)
    }
  }

  console.log('Done restoring services!')
}

restore()
