import React from 'react'

interface ContainerProps {
  children: React.ReactNode
  className?: string
}

/**
 * Container - Composant wrapper pour centrer et limiter la largeur du contenu
 */
export default function Container({ children, className = '' }: ContainerProps) {
  return (
    <div className={`container-custom ${className}`}>
      {children}
    </div>
  )
}
