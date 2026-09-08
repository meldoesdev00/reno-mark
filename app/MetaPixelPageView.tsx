'use client'

import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect, useRef } from 'react'

declare global {
  interface Window { fbq?: (...args: unknown[]) => void }
}

export default function MetaPixelPageView() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const isFirstLoad = useRef(true)

  useEffect(() => {
    if (isFirstLoad.current) {
      isFirstLoad.current = false
      return
    }
    window.fbq?.('track', 'PageView')
  }, [pathname, searchParams])

  return null
}
