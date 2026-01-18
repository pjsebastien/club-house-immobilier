import React from 'react'
import Container from './Container'

interface SectionProps {
  children: React.ReactNode
  className?: string
  background?: 'white' | 'gray'
  id?: string
}

/**
 * Section - Composant section pour structurer les pages
 */
export default function Section({
  children,
  className = '',
  background = 'white',
  id
}: SectionProps) {
  const bgStyles = background === 'gray' ? 'bg-neutral-50' : 'bg-white'

  return (
    <section id={id} className={`section-padding ${bgStyles} ${className}`}>
      <Container>
        {children}
      </Container>
    </section>
  )
}
