import React from 'react'

interface CardProps {
  children: React.ReactNode
  className?: string
  hover?: boolean
}

/**
 * Card - Composant carte réutilisable pour afficher du contenu structuré
 */
export default function Card({ children, className = '', hover = false }: CardProps) {
  const hoverStyles = hover ? 'hover:shadow-lg hover:-translate-y-1' : ''

  return (
    <div className={`bg-white border border-neutral-200 rounded-xl p-6 shadow-sm transition-all duration-200 ${hoverStyles} ${className}`}>
      {children}
    </div>
  )
}
