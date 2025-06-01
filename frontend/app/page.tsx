'use client'

import React, { useEffect, useState, useRef } from 'react'
import Link from 'next/link'

interface Card {
  label: string
  count: number
  href: string
  icon: string
}

export default function DashboardPage() {
  const [cards, setCards] = useState<Card[]>([])
  const [showArrow, setShowArrow] = useState(false)
  const cardsWrapperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setCards([
      { label: 'Pacientes', count: 12, href: '/pacientes', icon: '🩺' },
      { label: 'Familias', count: 5, href: '/familias', icon: '👨‍👩‍👧‍👦' },
      { label: 'Fichas Clínicas', count: 8, href: '/fichas-clinica', icon: '📋' },
      { label: 'Fichas Odontológicas', count: 4, href: '/fichas-odontologica', icon: '🦷' },
      { label: 'Vacunación', count: 9, href: '/vacunacion', icon: '💉' },
      { label: 'Citas', count: 3, href: '/citas', icon: '📅' },
      { label: 'Recetas', count: 7, href: '/recetas', icon: '📝' },
      { label: 'Medicamentos', count: 14, href: '/medicamentos', icon: '💊' },
      { label: 'Despachos', count: 2, href: '/despachos', icon: '📦' },
    ])
  }, [])

  useEffect(() => {
    const wrapper = cardsWrapperRef.current
    if (!wrapper) return
    const checkScroll = () => {
      if (wrapper.scrollWidth > wrapper.clientWidth && wrapper.scrollLeft < wrapper.scrollWidth - wrapper.clientWidth - 10) {
        setShowArrow(true)
      } else {
        setShowArrow(false)
      }
    }
    checkScroll()
    wrapper.addEventListener('scroll', checkScroll)
    window.addEventListener('resize', checkScroll)
    return () => {
      wrapper.removeEventListener('scroll', checkScroll)
      window.removeEventListener('resize', checkScroll)
    }
  }, [])

  return (
    <>
      <div style={styles.heroContainer}>
        <h1 style={styles.mainTitle}>Sistema Clínico Integral</h1>
        <p style={styles.subtitle}>
          Bienvenido al panel de control. Desde aquí podrás gestionar pacientes, familias,
          fichas clínicas y odontológicas, control de vacunación, citas, recetas y más.
        </p>
        <div style={styles.downArrowContainer}>
          <span style={styles.downArrow}>↓</span>
        </div>
      </div>

      <div style={styles.cardsWrapper} ref={cardsWrapperRef}>
        <div className="dashboard" style={styles.dashboardGrid}>
          {cards.map((card) => (
            <Link
              href={card.href}
              key={card.href}
              className="card"
              style={styles.cardLink}
            >
              <div style={styles.iconContainer}>{card.icon}</div>
              <h3 style={styles.cardLabel}>{card.label}</h3>
              <span style={styles.cardCount}>{card.count}</span>
            </Link>
          ))}
        </div>
      </div>
    </>
  )
}

const bounce = {
  animation: 'bounceDown 1.5s infinite',
}

const styles: Record<string, React.CSSProperties> = {
  heroContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: 'calc(100vh - 56px)',
    padding: '0 1rem',
    textAlign: 'center',
    backgroundColor: '#ffffff',
  },
  mainTitle: {
    fontSize: '6rem',
    fontWeight: 700,
    margin: 0,
    color: '#111',
  },
  subtitle: {
    fontSize: '1.25rem',
    color: '#555',
    marginTop: '1rem',
    maxWidth: '800px',
    lineHeight: 1.6,
  },
  cardsWrapper: {
    backgroundColor: '#f9f9f9',
    padding: '2rem 1rem',
    minHeight: 'auto',
    position: 'relative',
    overflowX: 'auto',
    WebkitOverflowScrolling: 'touch',
  },
  scrollArrow: {
    display: 'flex',
    alignItems: 'center',
    position: 'absolute',
    right: 10,
    top: '50%',
    transform: 'translateY(-50%)',
    background: 'rgba(255,255,255,0.95)',
    borderRadius: '2rem',
    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
    padding: '0.25rem 0.75rem',
    zIndex: 10,
    fontSize: '1.1rem',
    color: '#0070f3',
    pointerEvents: 'none',
    transition: 'opacity 0.3s',
  },
  arrowIcon: {
    fontSize: '1.5rem',
    marginRight: '0.5rem',
  },
  arrowText: {
    fontWeight: 500,
    fontSize: '1rem',
  },
  dashboardGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
    gap: '1.5rem',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  cardLink: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    textDecoration: 'none',
    cursor: 'pointer',
    height: '100%',
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    padding: '1.25rem',
    border: '1px solid rgba(0, 0, 0, 0.08)',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.2s, box-shadow 0.2s',
  },
  cardLinkHover: {
    transform: 'translateY(-5px)',
    boxShadow: '0 6px 18px rgba(0, 0, 0, 0.12)',
  },
  iconContainer: {
    fontSize: '2.5rem',
    marginBottom: '0.75rem',
    color: '#0070f3',
    alignSelf: 'flex-start',
  },
  cardLabel: {
    margin: '0 0 0.5rem',
    fontSize: '1.25rem',
    fontWeight: 600,
    color: '#111',
  },
  cardCount: {
    fontSize: '2rem',
    fontWeight: 700,
    color: '#0070f3',
    textAlign: 'right',
  },
  downArrowContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    margin: '0',
    height: '3rem',
    background: 'transparent',
  },
  downArrow: {
    fontSize: '2.5rem',
    color: '#0070f3',
    ...bounce,
    userSelect: 'none',
  },
}

if (typeof window !== 'undefined') {
  const style = document.createElement('style')
  style.innerHTML = `@keyframes bounceDown { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(12px); } }`
  document.head.appendChild(style)
}
