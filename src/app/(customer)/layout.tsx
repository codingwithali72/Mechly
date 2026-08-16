import Link from 'next/link'
import { Home, User, Wrench } from 'lucide-react'

export default function CustomerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50 pb-16 md:pb-0">
      <header className="sticky top-0 z-10 flex h-14 items-center justify-between border-b bg-white px-4">
        <div className="flex items-center gap-2">
          <Wrench className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold tracking-tight text-primary">MECHLY</span>
        </div>
        <div className="flex items-center gap-4">
          {/* We can add notifications or profile icon here */}
        </div>
      </header>

      <main className="flex-1">
        {children}
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-10 flex h-16 border-t bg-white md:hidden">
        <Link href="/home" className="flex flex-1 flex-col items-center justify-center gap-1 text-muted-foreground hover:text-primary">
          <Home className="h-5 w-5" />
          <span className="text-[10px] font-medium">Home</span>
        </Link>
        <Link href="/vehicles" className="flex flex-1 flex-col items-center justify-center gap-1 text-muted-foreground hover:text-primary">
          <Wrench className="h-5 w-5" />
          <span className="text-[10px] font-medium">My Vehicles</span>
        </Link>
        <Link href="/profile" className="flex flex-1 flex-col items-center justify-center gap-1 text-muted-foreground hover:text-primary">
          <User className="h-5 w-5" />
          <span className="text-[10px] font-medium">Profile</span>
        </Link>
      </nav>
    </div>
  )
}
