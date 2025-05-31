// frontend/components/NavBar.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth } from './AuthContext';

const linkStyle = {
  color: '#fff',
  textDecoration: 'none',
  whiteSpace: 'nowrap' as const,
};

export function NavBar() {
  const { logout } = useAuth();

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        padding: '0.75rem 1.5rem',
        background: '#111',
        boxShadow: '0 2px 6px rgba(0,0,0,0.5)',
        zIndex: 1000,
      }}
    >
      {/* 
        El contenedor de links ocupa todo el espacio restante,
        puede encogerse (minWidth: 0) y hacer scroll horizontal si sobra contenido 
      */}
      <div
        style={{
          display: 'flex',
          flex: '1 1 auto',
          minWidth: 0,
          gap: '1rem',
          overflowX: 'auto',
        }}
      >
        <Link href="/pacientes" style={linkStyle}>Pacientes</Link>
        <Link href="/familias" style={linkStyle}>Familias</Link>
        <Link href="/fichas-clinica" style={linkStyle}>Fichas Clínicas</Link>
        <Link href="/fichas-odontologica" style={linkStyle}>Fichas Odontológicas</Link>
        <Link href="/vacunacion" style={linkStyle}>Vacunación</Link>
        <Link href="/citas" style={linkStyle}>Citas</Link>
        <Link href="/recetas" style={linkStyle}>Recetas</Link>
        <Link href="/medicamentos" style={linkStyle}>Medicamentos</Link>
        <Link href="/despachos" style={linkStyle}>Despachos</Link>
      </div>

      {/* Botón de logout siempre visible a la derecha */}
      <button
        onClick={logout}
        style={{
          marginLeft: '1rem',
          flexShrink: 0,
          background: 'transparent',
          border: '1px solid #fff',
          color: '#fff',
          padding: '0.5rem 1rem',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        Logout
      </button>
    </nav>
  );
}
