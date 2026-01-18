'use client'

import React, { useState, useEffect } from 'react'

interface VilleNavigationProps {
  sections: Array<{
    id: string
    label: string
    icon: string
  }>
}

/**
 * VilleNavigation - Navigation sticky interactive pour accéder aux sections
 */
export default function VilleNavigation({ sections }: VilleNavigationProps) {
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200

      for (const section of sections) {
        const element = document.getElementById(section.id)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section.id)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [sections])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      const offset = 100
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
  }

  return (
    <nav className="sticky top-0 z-40 bg-white border-b-2 border-primary-200 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between overflow-x-auto py-3">
          <div className="flex items-center gap-2 flex-nowrap">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className={`
                  flex items-center gap-2 px-4 py-2 rounded-full font-medium text-sm whitespace-nowrap transition-all
                  ${activeSection === section.id
                    ? 'bg-primary-600 text-white shadow-lg scale-105'
                    : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                  }
                `}
              >
                <span className="text-lg">{section.icon}</span>
                <span className="hidden sm:inline">{section.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}
