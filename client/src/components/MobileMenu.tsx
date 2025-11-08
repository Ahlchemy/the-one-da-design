import { X, Menu } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'wouter'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/contexts/AuthContext'

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const { user, signOut } = useAuth()

  const handleLinkClick = () => {
    setIsOpen(false)
  }

  const handleSignOut = async () => {
    await signOut()
    setIsOpen(false)
  }

  return (
    <>
      {/* Hamburger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="md:hidden p-2 hover:bg-accent rounded-lg transition-colors"
        aria-label="Open menu"
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Slide-out Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-72 bg-background border-l border-border z-50 transform transition-transform duration-300 ease-in-out md:hidden ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <span className="text-lg font-semibold">Menu</span>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 hover:bg-accent rounded-lg transition-colors"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-col p-6 space-y-4">
          <a
            href="#about"
            onClick={handleLinkClick}
            className="text-lg font-medium hover:text-primary transition-colors py-2"
          >
            About
          </a>
          <Link href="/projects" onClick={handleLinkClick}>
            <span className="text-lg font-medium hover:text-primary transition-colors py-2 block">
              Projects
            </span>
          </Link>
          <Link href="/articles" onClick={handleLinkClick}>
            <span className="text-lg font-medium hover:text-primary transition-colors py-2 block">
              Articles
            </span>
          </Link>
          <Link href="/resources" onClick={handleLinkClick}>
            <span className="text-lg font-medium hover:text-primary transition-colors py-2 block">
              Resources
            </span>
          </Link>

          {/* Divider */}
          <div className="border-t border-border my-4" />

          {/* Auth Buttons */}
          {user ? (
            <div className="space-y-3">
              <Link href="/admin" onClick={handleLinkClick}>
                <Button variant="outline" className="w-full">
                  Admin Panel
                </Button>
              </Link>
              <Button onClick={handleSignOut} variant="outline" className="w-full">
                Logout
              </Button>
            </div>
          ) : (
            <Link href="/login" onClick={handleLinkClick}>
              <Button variant="outline" className="w-full">
                Login
              </Button>
            </Link>
          )}
        </nav>
      </div>
    </>
  )
}
