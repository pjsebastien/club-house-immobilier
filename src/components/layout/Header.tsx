'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Container from '@/components/ui/Container'

/**
 * Header - Composant header avec navigation principale
 * Inclut un menu responsive et un effet sticky au scroll
 */
export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { href: '/villes', label: 'Villes' },
    { href: '/quartiers', label: 'Quartiers' },
    { href: '/investir', label: 'Investir' },
    { href: '/outils', label: 'Outils' },
    { href: '/methodologie', label: 'Méthodologie' },
  ]

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-200 ${
        isScrolled ? 'bg-white/95 backdrop-blur-sm shadow-sm' : 'bg-white'
      }`}
    >
      <Container>
        <nav className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <Image
              src="/images/logo.png"
              alt="Club House Immobilier"
              width={40}
              height={40}
              className="transition-transform group-hover:scale-105"
            />
            <span className="font-semibold text-lg text-neutral-900 hidden sm:block">
              Club House Immobilier
            </span>
          </Link>

          {/* Navigation Desktop */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 text-neutral-700 hover:text-primary-600 hover:bg-neutral-50 rounded-lg transition-colors duration-200 font-medium"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              href="/sources"
              className="text-neutral-600 hover:text-neutral-900 text-sm font-medium transition-colors"
            >
              Sources
            </Link>
            <Link
              href="/villes"
              className="bg-primary-600 text-white px-6 py-2.5 rounded-lg hover:bg-primary-700 transition-colors font-medium"
            >
              Explorer
            </Link>
          </div>

          {/* Menu Mobile Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-neutral-700 hover:text-neutral-900 hover:bg-neutral-100 rounded-lg transition-colors"
            aria-label="Menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </nav>

        {/* Menu Mobile */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-neutral-200">
            <div className="flex flex-col space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="px-4 py-3 text-neutral-700 hover:text-primary-600 hover:bg-neutral-50 rounded-lg transition-colors font-medium"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/sources"
                onClick={() => setIsMenuOpen(false)}
                className="px-4 py-3 text-neutral-700 hover:text-primary-600 hover:bg-neutral-50 rounded-lg transition-colors font-medium"
              >
                Sources
              </Link>
              <Link
                href="/villes"
                onClick={() => setIsMenuOpen(false)}
                className="mx-4 mt-2 bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors font-medium text-center"
              >
                Explorer
              </Link>
            </div>
          </div>
        )}
      </Container>
    </header>
  )
}
