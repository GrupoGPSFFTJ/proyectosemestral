'use client'

import React, { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { apiService } from '@/services/ApiService'
import { useAuth } from '../components/AuthContext'

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
    const { user } = useAuth ? useAuth() : { user: null };

    useEffect(() => {
        async function fetchCounts() {
            const [
                pacientes,
                familias,
                fichasClinicas,
                fichasOdonto,
                citas,
                recetas,
                medicamentos,
                despachos,
            ] = await Promise.all([
                apiService.getPacientesCount().catch(() => 0) as unknown as number,
                apiService.getFamiliasCount().catch(() => 0) as unknown as number,
                apiService.getFichasClinicasCount().catch(() => 0) as unknown as number,
                apiService.getFichasOdontoCount().catch(() => 0) as unknown as number,
                apiService.getCitasCount().catch(() => 0) as unknown as number,
                apiService.getRecetasCount().catch(() => 0) as unknown as number,
                apiService.getMedicamentosCount().catch(() => 0) as unknown as number,
                apiService.getDespachosCount().catch(() => 0) as unknown as number,
            ]);

            setCards([
                { label: 'Pacientes', count: pacientes, href: '/pacientes', icon: '🩺' },
                { label: 'Familias', count: familias, href: '/familias', icon: '👨‍👩‍👧‍👦' },
                { label: 'Fichas Clínicas', count: fichasClinicas, href: '/fichas-clinica', icon: '📋' },
                { label: 'Fichas Odontológicas', count: fichasOdonto, href: '/fichas-odontologica', icon: '🦷' },
                { label: 'Citas', count: citas, href: '/citas', icon: '📅' },
                { label: 'Recetas', count: recetas, href: '/recetas', icon: '📝' },
                { label: 'Medicamentos', count: medicamentos, href: '/medicamentos', icon: '💊' },
                { label: 'Despachos', count: despachos, href: '/despachos', icon: '📦' },
            ]);
        }

        fetchCounts();
    }, []);


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
            <div style={styles.heroBg}>
                <div style={styles.heroContainer}>
                    <h1 style={styles.mainTitle}>Sistema Clínico Integral</h1>
                    <p style={styles.subtitle}>
                        {user ? (
                            <>
                                ¡Hola, <span style={{ color: '#0070f3', fontWeight: 600 }}>{user.nombre || user.username}</span>!<br />
                                Bienvenido al panel de control. Desde aquí podrás gestionar pacientes, familias, fichas clínicas y odontológicas, control de vacunación, citas, recetas y más.
                            </>
                        ) : (
                            <>Bienvenido al panel de control. Desde aquí podrás gestionar pacientes, familias, fichas clínicas y odontológicas, control de vacunación, citas, recetas y más.</>
                        )}
                    </p>
                    <div style={styles.downArrowContainer}>
                        <span style={styles.downArrow}>↓</span>
                    </div>
                </div>
            </div>

            <div style={styles.cardsSection}>
                <div style={styles.cardsWrapper} ref={cardsWrapperRef}>
                    {showArrow && (
                        <div style={styles.scrollArrow}>
                            <span style={styles.arrowIcon}>→</span>
                            <span style={styles.arrowText}>Desliza para ver más</span>
                        </div>
                    )}
                    <div className="dashboard" style={styles.dashboardGrid}>
                        {cards.map((card) => (
                            <Link
                                href={card.href}
                                key={card.href}
                                className="card"
                                style={{ ...styles.cardLink, ...cardLinkGradient(card.label) }}
                            >
                                <div style={{ ...styles.iconContainer, ...iconGradient(card.label) }}>{card.icon}</div>
                                <h3 style={styles.cardLabel}>{card.label}</h3>
                                <span style={styles.cardCount}>{card.count}</span>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

const bounce = {
    animation: 'bounceDown 1.5s infinite',
}

// Gradients for cards and icons
function cardLinkGradient(label: string) {
    switch (label) {
        case 'Pacientes':
            return { background: 'linear-gradient(135deg, #e0f7fa 0%, #b2ebf2 100%)' };
        case 'Familias':
            return { background: 'linear-gradient(135deg, #fceabb 0%, #f8b500 100%)' };
        case 'Fichas Clínicas':
            return { background: 'linear-gradient(135deg, #f3e7e9 0%, #e3eeff 100%)' };
        case 'Fichas Odontológicas':
            return { background: 'linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)' };
        case 'Citas':
            return { background: 'linear-gradient(135deg, #f9d423 0%, #ff4e50 100%)' };
        case 'Recetas':
            return { background: 'linear-gradient(135deg, #fbc2eb 0%, #a6c1ee 100%)' };
        case 'Medicamentos':
            return { background: 'linear-gradient(135deg, #c2e9fb 0%, #81a4fd 100%)' };
        case 'Despachos':
            return { background: 'linear-gradient(135deg, #f7971e 0%, #ffd200 100%)' };
        default:
            return {};
    }
}

function iconGradient(label: string) {
    switch (label) {
        case 'Pacientes':
            return { color: '#0070f3', textShadow: '0 2px 8px #b2ebf2' };
        case 'Familias':
            return { color: '#f8b500', textShadow: '0 2px 8px #fceabb' };
        case 'Fichas Clínicas':
            return { color: '#3a7bd5', textShadow: '0 2px 8px #e3eeff' };
        case 'Fichas Odontológicas':
            return { color: '#8f5fe8', textShadow: '0 2px 8px #e0c3fc' };
        case 'Citas':
            return { color: '#ff4e50', textShadow: '0 2px 8px #f9d423' };
        case 'Recetas':
            return { color: '#a6c1ee', textShadow: '0 2px 8px #fbc2eb' };
        case 'Medicamentos':
            return { color: '#81a4fd', textShadow: '0 2px 8px #c2e9fb' };
        case 'Despachos':
            return { color: '#f7971e', textShadow: '0 2px 8px #ffd200' };
        default:
            return {};
    }
}

const styles: Record<string, React.CSSProperties> = {
    heroBg: {
        background: 'linear-gradient(120deg, #e0eafc 0%, #cfdef3 100%)',
        minHeight: 'calc(60vh - 56px)',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomLeftRadius: '2.5rem',
        borderBottomRightRadius: '2.5rem',
        boxShadow: '0 8px 32px rgba(0,0,0,0.07)',
    },
    heroContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        padding: '2.5rem 1rem 1.5rem',
        textAlign: 'center',
        background: 'transparent',
    },
    mainTitle: {
        fontSize: 'clamp(2.5rem, 7vw, 5.5rem)',
        fontWeight: 800,
        margin: 0,
        color: '#111',
        letterSpacing: '-0.03em',
        textShadow: '0 2px 12px #e0eafc',
    },
    subtitle: {
        fontSize: '1.25rem',
        color: '#444',
        marginTop: '1.2rem',
        maxWidth: '700px',
        lineHeight: 1.7,
        fontWeight: 500,
        background: 'rgba(255,255,255,0.7)',
        borderRadius: '1rem',
        padding: '1rem 1.5rem',
        boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
    },
    cardsSection: {
        width: '100%',
        background: 'linear-gradient(120deg, #f9f9f9 0%, #e0eafc 100%)',
        minHeight: '40vh',
        padding: '2.5rem 0 3rem',
        marginTop: '-2rem',
    },
    cardsWrapper: {
        position: 'relative',
        overflowX: 'auto',
        WebkitOverflowScrolling: 'touch',
        padding: '0 1rem',
        maxWidth: '1400px',
        margin: '0 auto',
    },
    scrollArrow: {
        display: 'flex',
        alignItems: 'center',
        position: 'absolute',
        right: 10,
        top: '50%',
        transform: 'translateY(-50%)',
        background: 'rgba(255,255,255,0.97)',
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
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: '2rem',
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '1rem 0',
    },
    cardLink: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        textDecoration: 'none',
        cursor: 'pointer',
        height: '100%',
        borderRadius: '18px',
        padding: '2.2rem 1.5rem 1.5rem',
        border: 'none',
        boxShadow: '0 4px 18px rgba(0, 0, 0, 0.10)',
        transition: 'transform 0.22s, box-shadow 0.22s',
        minHeight: '210px',
        alignItems: 'flex-start',
    },
    cardLinkHover: {
        transform: 'translateY(-7px) scale(1.025)',
        boxShadow: '0 10px 32px rgba(0, 0, 0, 0.13)',
    },
    iconContainer: {
        fontSize: '3.2rem',
        marginBottom: '1.1rem',
        alignSelf: 'flex-start',
        filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.07))',
    },
    cardLabel: {
        margin: '0 0 0.5rem',
        fontSize: '1.35rem',
        fontWeight: 700,
        color: '#222',
        letterSpacing: '-0.01em',
    },
    cardCount: {
        fontSize: '2.2rem',
        fontWeight: 800,
        color: '#0070f3',
        textAlign: 'right',
        marginTop: '0.5rem',
        alignSelf: 'flex-end',
        textShadow: '0 2px 8px #e0eafc',
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
