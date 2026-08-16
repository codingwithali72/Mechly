'use server'

import { createClient, ensureCustomerProfile } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'

export async function createBooking(formData: FormData) {
  const service = formData.get('service') as string
  const vehicle_id = formData.get('vehicle_id') as string
  const problem_description = formData.get('problem_description') as string
  const city = formData.get('city') as string
  const area = formData.get('area') as string
  const address = formData.get('address') as string
  const time_slot = formData.get('time_slot') as string
  const mechanic_id = formData.get('mechanic_id') as string
  const mode = formData.get('mode') as string
  
  if (!service || !vehicle_id || !city || !address) {
    throw new Error('Missing required booking details (service, vehicle, city, address)')
  }

  const { customer } = await ensureCustomerProfile()
  const supabase = await createClient()

  // 1. Create or get Service Location
  let service_location_id: string
  const { data: existingLocations } = await supabase
    .from('service_locations')
    .select('id')
    .eq('customer_id', customer.id)
    .eq('address', address)
    .limit(1)

  if (existingLocations && existingLocations.length > 0) {
    service_location_id = existingLocations[0].id
  } else {
    const { data: newLoc, error: locError } = await supabase.from('service_locations').insert({
      customer_id: customer.id,
      address,
      city,
      area: area || null
    }).select('id').single()
    
    if (locError) throw new Error('Failed to save location: ' + locError.message)
    service_location_id = newLoc.id
  }

  // 2. Parse schedule dates
  // For MVP we just use today/tomorrow dates based on time_slot string
  const scheduled_start = new Date()
  if (time_slot?.toLowerCase().includes('tomorrow')) {
    scheduled_start.setDate(scheduled_start.getDate() + 1)
  }
  const scheduled_end = new Date(scheduled_start)
  scheduled_end.setHours(scheduled_end.getHours() + 2) // Roughly 2 hour block

  // 3. Get Base Price
  let basePrice = 150
  if (service) {
    const { data: dbService } = await supabase.from('services').select('base_price').eq('id', service).single()
    if (dbService?.base_price) {
      basePrice = dbService.base_price
    }
  }

  // 4. Create Booking (job)
  const bookingCode = 'BOOK-' + new Date().toISOString().replace(/\D/g, '').slice(0, 8) + '-' + Math.floor(Math.random() * 1000).toString().padStart(3, '0')

  const { data: booking, error: bookingError } = await supabase.from('bookings').insert({
    customer_id: customer.id,
    booking_code: bookingCode,
    vehicle_id,
    service_id: service,
    service_location_id,
    mechanic_id: mechanic_id || null,
    problem_description: problem_description || null,
    scheduled_start: scheduled_start.toISOString(),
    scheduled_end: scheduled_end.toISOString(),
    visit_charge: basePrice,
    estimated_total: basePrice,
    status: mode === 'urgent' ? 'SEARCHING' : 'REQUESTED'
  }).select('id').single()

  if (bookingError) {
    throw new Error('Failed to create booking: ' + bookingError.message)
  }

  revalidatePath('/home')
  redirect(`/tracking/${booking.id}`)
}
