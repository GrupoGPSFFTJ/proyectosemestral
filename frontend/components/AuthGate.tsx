// frontend/components/AuthGate.tsx
'use client';

import React, { ReactNode, useState, ChangeEvent, FormEvent } from 'react';
import { useAuth } from './AuthContext';

export function AuthGate({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  if (!user) return <LoginForm />;
  return <>{children}</>;
}

function LoginForm() {
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    login(username, password);
  };

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        margin: 0,
        backgroundImage: 'url("/Login_Fondo.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div
        style={{
          width: '90%',
          maxWidth: '400px',
          background: 'rgba(255,255,255,0.85)',
          padding: '2rem',
          borderRadius: '8px',
          boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
          backdropFilter: 'blur(6px)',
        }}
      >
        {/* Aquí forzamos el color oscuro */}
        <h2
          style={{
            color: '#111',
            textAlign: 'center',
            marginBottom: '1.5rem',
            fontSize: '1.5rem',
            fontWeight: 500,
          }}
        >
          Iniciar Sesión
        </h2>

        <form onSubmit={handleSubmit}>
          <input
            name="username"
            type="text"
            placeholder="Usuario"
            value={username}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setUsername(e.target.value)
            }
            required
            style={{
              width: '100%',
              padding: '0.75rem',
              marginBottom: '1rem',
              border: '1px solid #ccc',
              borderRadius: '4px',
              fontSize: '1rem',
              color: '#333',
              background: 'rgba(255,255,255,0.9)',
            }}
          />
          <input
            name="password"
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
            required
            style={{
              width: '100%',
              padding: '0.75rem',
              marginBottom: '1.5rem',
              border: '1px solid #ccc',
              borderRadius: '4px',
              fontSize: '1rem',
              color: '#333',
              background: 'rgba(255,255,255,0.9)',
            }}
          />
          <button
            type="submit"
            style={{
              width: '100%',
              padding: '0.75rem',
              background: '#0070f3',
              color: '#fff',
              border: 'none',
              borderRadius: '4px',
              fontSize: '1rem',
              cursor: 'pointer',
              transition: 'background 0.2s',
            }}
            onMouseOver={(e) =>
              (e.currentTarget.style.background = '#005bb5')
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.background = '#0070f3')
            }
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}
