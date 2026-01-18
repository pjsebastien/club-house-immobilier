'use client'

import React, { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { searchVilles, villeToSlug } from '@/lib/data'
import { Ville } from '@/types/ville'

interface VilleSearchProps {
  placeholder?: string
  className?: string
  variant?: 'default' | 'hero'
}

/**
 * VilleSearch - Composant de recherche de villes avec autocomplete
 */
export default function VilleSearch({
  placeholder = "Rechercher une ville...",
  className = "",
  variant = 'default'
}: VilleSearchProps) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<Ville[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const searchRef = useRef<HTMLDivElement>(null)

  // Recherche avec debounce
  useEffect(() => {
    if (query.length >= 2) {
      const villes = searchVilles(query, 10)
      setResults(villes)
      setIsOpen(villes.length > 0)
      setSelectedIndex(-1)
    } else {
      setResults([])
      setIsOpen(false)
    }
  }, [query])

  // Fermer au clic extérieur
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Navigation au clavier
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) return

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setSelectedIndex(prev => Math.min(prev + 1, results.length - 1))
        break
      case 'ArrowUp':
        e.preventDefault()
        setSelectedIndex(prev => Math.max(prev - 1, -1))
        break
      case 'Enter':
        e.preventDefault()
        if (selectedIndex >= 0 && results[selectedIndex]) {
          window.location.href = `/villes/${villeToSlug(results[selectedIndex].nom)}`
        }
        break
      case 'Escape':
        setIsOpen(false)
        break
    }
  }

  const formatNumber = (num: number): string => {
    return new Intl.NumberFormat('fr-FR').format(num)
  }

  return (
    <div ref={searchRef} className={`relative ${className}`}>
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => query.length >= 2 && results.length > 0 && setIsOpen(true)}
          placeholder={placeholder}
          className="w-full px-4 py-3 pl-12 pr-10 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white text-neutral-900 placeholder:text-neutral-400"
        />

        {/* Icône de recherche */}
        <svg
          className="w-5 h-5 text-neutral-400 absolute left-4 top-3.5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>

        {/* Bouton clear */}
        {query && (
          <button
            onClick={() => {
              setQuery('')
              setResults([])
              setIsOpen(false)
            }}
            className="absolute right-3 top-3.5 text-neutral-400 hover:text-neutral-600"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* Résultats */}
      {isOpen && results.length > 0 && (
        <div className="absolute z-50 w-full mt-2 bg-white border border-neutral-200 rounded-lg shadow-lg max-h-96 overflow-y-auto">
          <div className="p-2">
            <p className="text-xs text-neutral-500 px-3 py-2">
              {results.length} ville{results.length > 1 ? 's' : ''} trouvée{results.length > 1 ? 's' : ''}
            </p>
            {results.map((ville, index) => (
              <Link
                key={ville.code_insee}
                href={`/villes/${villeToSlug(ville.nom)}`}
                className={`block px-3 py-3 rounded-lg transition-colors ${
                  index === selectedIndex
                    ? 'bg-primary-50 border border-primary-200'
                    : 'hover:bg-neutral-50'
                }`}
                onClick={() => {
                  setIsOpen(false)
                  setQuery('')
                }}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-neutral-900 truncate">
                      {ville.nom}
                    </p>
                    <div className="flex items-center space-x-3 mt-1">
                      <span className="text-xs text-neutral-500">
                        {ville.departement.name} ({ville.departement.code})
                      </span>
                      <span className="text-xs text-neutral-400">•</span>
                      <span className="text-xs text-neutral-500">
                        {ville.region.name}
                      </span>
                    </div>
                    <div className="flex items-center space-x-4 mt-1 text-xs text-neutral-600">
                      <span className="flex items-center">
                        <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        {formatNumber(ville.stats_agregees.population_totale)} hab.
                      </span>
                      <span className="flex items-center">
                        <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                        </svg>
                        {ville.nb_quartiers_iris} IRIS
                      </span>
                    </div>
                  </div>
                  <svg className="w-5 h-5 text-neutral-400 flex-shrink-0 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>

          <div className="border-t border-neutral-200 p-3 bg-neutral-50">
            <p className="text-xs text-neutral-500 text-center">
              Utilisez ↑ ↓ pour naviguer, Entrée pour sélectionner
            </p>
          </div>
        </div>
      )}

      {/* Message si aucun résultat */}
      {isOpen && query.length >= 2 && results.length === 0 && (
        <div className="absolute z-50 w-full mt-2 bg-white border border-neutral-200 rounded-lg shadow-lg p-6">
          <div className="text-center">
            <svg className="w-12 h-12 text-neutral-300 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-neutral-600 font-medium mb-1">Aucune ville trouvée</p>
            <p className="text-sm text-neutral-500">
              Essayez avec un autre nom de ville, département ou région
            </p>
          </div>
        </div>
      )}

      {/* Aide */}
      {!query && variant === 'default' && (
        <p className="text-xs text-neutral-500 mt-2">
          Tapez au moins 2 caractères pour rechercher parmi les {searchVilles('').length} villes disponibles
        </p>
      )}
    </div>
  )
}
