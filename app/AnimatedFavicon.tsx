'use client'

import { useEffect } from 'react'

export default function AnimatedFavicon() {
  useEffect(() => {
    const canvas = document.createElement('canvas')
    canvas.width = 64
    canvas.height = 64
    const ctx = canvas.getContext('2d')!

    let link = document.querySelector<HTMLLinkElement>("link[rel~='icon']")
    if (!link) {
      link = document.createElement('link')
      link.rel = 'icon'
      document.head.appendChild(link)
    }

    const clay = { r: 184, g: 119, b: 90 }
    const white = { r: 255, g: 255, b: 255 }
    const duration = 3000 // ms per full cycle
    let start: number | null = null
    let raf: number

    function lerp(a: number, b: number, t: number) {
      return Math.round(a + (b - a) * t)
    }

    function draw(ts: number) {
      if (!start) start = ts
      const elapsed = (ts - start) % duration
      // sine wave 0→1→0
      const t = (Math.sin((elapsed / duration) * Math.PI * 2 - Math.PI / 2) + 1) / 2

      const r = lerp(clay.r, white.r, t)
      const g = lerp(clay.g, white.g, t)
      const b = lerp(clay.b, white.b, t)

      ctx.clearRect(0, 0, 64, 64)
      ctx.beginPath()
      ctx.arc(32, 32, 32, 0, Math.PI * 2)
      ctx.fillStyle = `rgb(${r},${g},${b})`
      ctx.fill()

      link!.href = canvas.toDataURL('image/png')
      raf = requestAnimationFrame(draw)
    }

    raf = requestAnimationFrame(draw)
    return () => cancelAnimationFrame(raf)
  }, [])

  return null
}
