'use client'

import React, { useState } from 'react'
import { AppBuilder } from '@/components/AppBuilder'
import { LandingPage } from '@/components/LandingPage'

export default function HomePage() {
  const [showBuilder, setShowBuilder] = useState(false)

  if (showBuilder) {
    return (
      <main className="min-h-screen">
        <AppBuilder />
      </main>
    )
  }

  return (
    <main className="min-h-screen">
      <LandingPage onGetStarted={() => setShowBuilder(true)} />
    </main>
  )
}