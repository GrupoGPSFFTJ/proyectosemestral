'use client';

import React, {useEffect, useRef, useState} from 'react';
import Link from 'next/link';
import {useAuth} from './AuthContext';

export function NavBar() {
    const {user, logout} = useAuth();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setDropdownOpen(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <nav style={styles.navbar}>
            <Link href="/" style={styles.homeLink} aria-label="Ir al Dashboard">
                <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="#fff"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path d="M3 9.5L12 2l9 7.5V20a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1V9.5z"/>
                </svg>
            </Link>

            <div style={styles.linksContainer}>
                <Link href="/pacientes" style={styles.link}>
                    Pacientes
                </Link>
                <Link href="/familias" style={styles.link}>
                    Familias
                </Link>
                <Link href="/fichas-clinica" style={styles.link}>
                    Fichas Clínicas
                </Link>
                <Link href="/fichas-odontologica" style={styles.link}>
                    Fichas Odontológicas
                </Link>
                <Link href="/citas" style={styles.link}>
                    Citas
                </Link>
                <Link href="/recetas" style={styles.link}>
                    Recetas
                </Link>
                <Link href="/medicamentos" style={styles.link}>
                    Medicamentos
                </Link>
                <Link href="/despachos" style={styles.link}>
                    Despachos
                </Link>
            </div>

            <div style={styles.userContainer} ref={dropdownRef}>
                <button
                    onClick={() => setDropdownOpen((open) => !open)}
                    style={styles.userButton}
                    aria-label="Abrir menú de usuario"
                >
                    <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="#fff"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <circle cx="12" cy="8" r="4"/>
                        <path d="M4 20c0-4 4-6 8-6s8 2 8 6v1H4v-1z"/>
                    </svg>
                </button>

                {dropdownOpen && (
                    <div style={styles.dropdownMenu}>
                        <div style={styles.dropdownHeader}>
                            <div style={styles.userNameText}>
                                {user?.nombre ?? user?.username ?? 'Usuario'}
                            </div>
                            {user?.email && (
                                <span style={styles.userEmailText}>
                                {user.email}
                            </span>
                            )}
                        </div>
                        <div style={styles.dropdownDivider}/>
                        <button style={styles.dropdownItem}>
                            <span>Notificaciones</span>
                            <span style={styles.notificationDot}/>
                        </button>
                        <button style={styles.dropdownItem}>Configuración</button>
                        <div style={styles.dropdownDivider}/>
                        <button
                            onClick={() => {
                                logout();
                                setDropdownOpen(false);
                            }}
                            style={styles.logoutItem}
                        >
                            Cerrar sesión
                        </button>
                    </div>
                )}
            </div>
        </nav>
    );
}

const styles: Record<string, React.CSSProperties> = {
    navbar: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '56px',
        display: 'flex',
        alignItems: 'center',
        padding: '0 1.5rem',
        backgroundColor: '#111',
        boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
        zIndex: 1000,
    },
    homeLink: {
        display: 'flex',
        alignItems: 'center',
        marginRight: '1rem',
        textDecoration: 'none',
        cursor: 'pointer',
    },
    linksContainer: {
        display: 'flex',
        gap: '1rem',
        overflowX: 'auto',
        flex: '1 1 auto',
        minWidth: 0,
    },
    link: {
        color: '#fff',
        textDecoration: 'none',
        fontSize: '1rem',
        padding: '0.25rem 0.5rem',
        whiteSpace: 'nowrap',
        transition: 'background-color 0.2s, border-radius 0.2s',
    },
    linkHover: {
        backgroundColor: 'rgba(255,255,255,0.15)',
        borderRadius: '4px',
    },
    userContainer: {
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
    },
    userButton: {
        background: 'transparent',
        border: 'none',
        cursor: 'pointer',
        padding: '0.25rem',
        borderRadius: '50%',
        transition: 'background-color 0.2s',
    },
    userButtonHover: {
        backgroundColor: 'rgba(255,255,255,0.2)',
    },
    dropdownMenu: {
        position: 'absolute',
        top: 'calc(100% + 8px)',
        right: 0,
        width: 'auto',
        minWidth: '200px',
        backgroundColor: '#fff',
        borderRadius: '8px',
        boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
        overflow: 'hidden',
        zIndex: 1100,
        whiteSpace: 'nowrap',
    },
    dropdownHeader: {
        padding: '0.75rem 1rem',
        backgroundColor: '#f0f0f0',
    },
    userNameText: {
        fontWeight: 600,
        color: '#333',
    },
    userEmailText: {
        fontSize: '0.8rem',
        color: '#666',
        marginTop: '0.25rem'
    },
    dropdownDivider: {
        height: '1px',
        backgroundColor: '#e0e0e0',
        margin: '0',
    },
    dropdownItem: {
        width: '100%',
        padding: '0.75rem 1rem',
        background: 'none',
        border: 'none',
        textAlign: 'left',
        fontSize: '0.95rem',
        color: '#333',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        cursor: 'pointer',
        transition: 'background-color 0.2s',
    },
    dropdownItemHover: {
        backgroundColor: '#f7f7f7',
    },
    notificationDot: {
        width: '8px',
        height: '8px',
        borderRadius: '50%',
        backgroundColor: 'red',
    },
    logoutItem: {
        width: '100%',
        padding: '0.75rem 1rem',
        background: 'none',
        border: 'none',
        textAlign: 'left',
        fontSize: '0.95rem',
        color: '#d32f2f',
        cursor: 'pointer',
        transition: 'background-color 0.2s',
    },
    logoutItemHover: {
        backgroundColor: '#ffe6e6',
    },
};

export default NavBar;
