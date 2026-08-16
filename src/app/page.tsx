import { redirect } from 'next/navigation'

export default function RootPage() {
  // Redirect users from the root URL to the login page.
  // If they are already authenticated, the middleware will automatically 
  // redirect them from /login to their appropriate dashboard (/home or /dashboard).
  redirect('/login')
}
