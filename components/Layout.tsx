"use client"

//React & Next
import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import Image from "next/image"

// Components
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Utils
import { cn } from "@/lib/utils"
import { 
  Home, 
  Calendar, 
  CheckSquare, 
  FileText, 
  Settings, 
  Bell, 
  User, 
  Timer,
  Book,
  Plus,
  MessageSquare,
  Menu
} from "lucide-react"

// Data
const navigationItems = [
  { name: "Dashboard", href: "/dashboard", icon: Home },
  { name: "Calendar", href: "/dashboard/calendar", icon: Calendar },
  { name: "Tasks", href: "/dashboard/tasks", icon: CheckSquare },
  { name: "Pomodoro", href: "/dashboard/pomodoro", icon: Timer },
  { name: "Notes", href: "/dashboard/notes", icon: FileText },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
]

export function Layout({ children }: { children: React.ReactNode }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)

  return (
    <div className="flex h-screen flex-col">
      <TopBar onMenuClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar className="hidden lg:block" />
        {isMobileMenuOpen && <MobileNav />}
        <main className="flex-1 overflow-y-auto bg-background px-4 py-6 md:px-6 lg:px-8">
          {children}
        </main>
      </div>
      <BottomTabBar className="lg:hidden" />
      <ActionToggle className="lg:block hidden" />
    </div>
  )
}

function TopBar({ onMenuClick }: { onMenuClick: () => void }) {
  return (
    <header className="sticky top-0 z-50 flex h-16 items-center border-b bg-background px-4 md:px-6">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="lg:hidden" onClick={onMenuClick}>
          <Menu className="h-5 w-5" />
        </Button>
        <Link href="/" className="flex items-center gap-2">
          <Image src="/favicon.png" alt="" height={40} width={40}/>
          <span className="text-lg font-semibold">LinkUp</span>
        </Link>
      </div>
      <div className="ml-auto flex items-center gap-2">
        <Button variant="ghost" size="icon">
          <Bell className="h-5 w-5" />
          <span className="sr-only">Notifications</span>
        </Button>
        <Button variant="ghost" size="icon">
          <User className="h-5 w-5" />
          <span className="sr-only">User menu</span>
        </Button>
      </div>
    </header>
  )
}

function Sidebar({ className }: { className?: string }) {
  return (
    <nav className={cn("w-64 border-r bg-background", className)}>
      <div className="flex h-full flex-col py-4">
        <div className="space-y-1 px-3">
          {navigationItems.map((item) => (
            <NavItem key={item.name} item={item} />
          ))}
        </div>
      </div>
    </nav>
  )
}

function BottomTabBar({ className }: { className?: string }) {
  return (
    <nav className={cn("border-t bg-background", className)}>
      <div className="flex h-16 items-center justify-around relative">
        {navigationItems.slice(0, 3).map((item) => (
          <NavItem key={item.name} item={item} />
        ))}
        
        {/* Centro - Botón de acción */}
        <ActionToggleButton className="absolute -top-6" />
        
        {navigationItems.slice(3, 6).map((item) => (
          <NavItem key={item.name} item={item} />
        ))}
      </div>
    </nav>
  )
}

function ActionToggleButton({ className }: { className?: string }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          size="icon" 
          className={cn("h-12 w-12 rounded-full bg-primary hover:bg-primary/90", className)}
        >
          <Plus className="h-6 w-6" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="center" className="w-48">
        <Link href="/dashboard/tasks/createTask">
          <DropdownMenuItem>
            <Plus className="mr-2 h-4 w-4" />
            Nueva Tarea
          </DropdownMenuItem>
        </Link>
        <Link href="/dashboard/notes/createNote">
          <DropdownMenuItem>
            <Book className="mr-2 h-4 w-4" />
            Nueva Nota
          </DropdownMenuItem>
        </Link>
        <Link href="/dashboard/calendar/createEvent">
          <DropdownMenuItem>
            <Calendar className="mr-2 h-4 w-4" />
            Nuevo Evento
          </DropdownMenuItem>
        </Link>
        <Link href="/dashboard/chat">
          <DropdownMenuItem>
            <MessageSquare className="mr-2 h-4 w-4" />
            Chat IA
          </DropdownMenuItem>
        </Link>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

function ActionToggle({ className }: { className?: string }) {
  return (
    <div className={cn("fixed bottom-6 right-6 z-50", className)}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            size="icon" 
            className="h-14 w-14 rounded-full bg-primary hover:bg-primary/90 shadow-lg"
          >
            <Plus className="h-6 w-6" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <Link href="/dashboard/tasks/createTask">
            <DropdownMenuItem>
              <Plus className="mr-2 h-4 w-4" />
              Nueva Tarea
            </DropdownMenuItem>
          </Link>
          <Link href="/dashboard/notes/createNote">
            <DropdownMenuItem>
              <Book className="mr-2 h-4 w-4" />
              Nueva Nota
            </DropdownMenuItem>
          </Link>
          <Link href="/dashboard/calendar/createEvent">
            <DropdownMenuItem>
              <Calendar className="mr-2 h-4 w-4" />
              Nuevo Evento
            </DropdownMenuItem>
          </Link>
          <Link href="/dashboard/chat">
            <DropdownMenuItem>
              <MessageSquare className="mr-2 h-4 w-4" />
              Chat IA
            </DropdownMenuItem>
          </Link>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

function MobileNav() {
  return (
    <div className="fixed inset-0 top-16 z-50 bg-background/80 backdrop-blur-sm lg:hidden">
      <nav className="fixed top-16 bottom-16 w-3/4 border-r bg-background p-6">
        <div className="space-y-1">
          {navigationItems.map((item) => (
            <NavItem key={item.name} item={item} />
          ))}
        </div>
      </nav>
    </div>
  )
}

function NavItem({ item }: { item: (typeof navigationItems)[number] }) {
  const pathname = usePathname()
  const isActive = pathname === item.href

  return (
    <Link
      href={item.href}
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
        isActive
          ? "bg-primary text-primary-foreground"
          : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
      )}
    >
      <item.icon className="h-5 w-5" />
      <span className="hidden lg:inline">{item.name}</span>
    </Link>
  )
}
