'use server'

import { createClient, ensureCustomerProfile } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'

export async function addVehicle(formData: FormData) {
  const vehicleType = formData.get('vehicle_type') as string
  const brand = formData.get('brand') as string
  const model = formData.get('model') as string
  const yearStr = formData.get('year') as string
  const registrationNumber = formData.get('registration_number') as string
  const fuelType = formData.get('fuel_type') as string
  
  if (!vehicleType || !brand || !model) {
    throw new Error('Vehicle type, brand, and model are required')
  }

  const { customer } = await ensureCustomerProfile()
  const supabase = await createClient()

  const vehicleCode = 'VEH-' + Math.random().toString(36).substr(2, 6).toUpperCase()

  const { error } = await supabase.from('vehicles').insert({
    customer_id: customer.id,
    vehicle_code: vehicleCode,
    vehicle_type: vehicleType,
    brand,
    model,
    year: yearStr ? parseInt(yearStr) : null,
    registration_number: registrationNumber || null,
    fuel_type: fuelType || null
  })

  if (error) {
    throw new Error('Failed to add vehicle: ' + error.message)
  }

  revalidatePath('/home')
  redirect('/home')
}
