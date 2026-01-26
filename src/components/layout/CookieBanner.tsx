'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'

const COOKIE_CONSENT_KEY = 'cookie_consent'
const CONSENT_EXPIRY_DAYS = 365

type ConsentStatus = 'accepted' | 'refused' | null

export default function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    // Vérifier si le consentement a déjà été donné
    const consent = localStorage.getItem(COOKIE_CONSENT_KEY)
    if (!consent) {
      // Petit délai pour une apparition fluide
      const timer = setTimeout(() => {
        setShowBanner(true)
        setIsAnimating(true)
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [])

  const saveConsent = (status: ConsentStatus) => {
    const consentData = {
      status,
      date: new Date().toISOString(),
      expiry: new Date(Date.now() + CONSENT_EXPIRY_DAYS * 24 * 60 * 60 * 1000).toISOString()
    }
    localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(consentData))
  }

  const handleAccept = () => {
    saveConsent('accepted')
    setIsAnimating(false)
    setTimeout(() => setShowBanner(false), 300)
  }

  const handleRefuse = () => {
    saveConsent('refused')
    setIsAnimating(false)
    setTimeout(() => setShowBanner(false), 300)
  }

  if (!showBanner) return null

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 transition-transform duration-300 ${
        isAnimating ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      <div className="bg-white border-t border-neutral-200 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            {/* Texte */}
            <div className="flex-1">
              <p className="text-sm text-neutral-700">
                Nous utilisons des cookies pour améliorer votre expérience sur notre site.
                En continuant, vous acceptez notre{' '}
                <Link
                  href="/politique-confidentialite"
                  className="text-primary-600 hover:text-primary-700 underline"
                >
                  politique de confidentialité
                </Link>.
              </p>
            </div>

            {/* Boutons */}
            <div className="flex items-center gap-3 flex-shrink-0">
              <button
                onClick={handleRefuse}
                className="px-4 py-2 text-sm font-medium text-neutral-600 hover:text-neutral-900 border border-neutral-300 rounded-lg hover:bg-neutral-50 transition-colors"
              >
                Refuser
              </button>
              <button
                onClick={handleAccept}
                className="px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-lg hover:bg-primary-700 transition-colors"
              >
                Accepter
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
