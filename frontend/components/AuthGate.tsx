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
    <div style={styles.container}>
      <div style={styles.overlay} />
      <div style={styles.card}>
        <h2 style={styles.title}>Iniciar Sesión</h2>

        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            name="username"
            type="text"
            placeholder="Usuario"
            value={username}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
            required
            style={styles.input}
          />
          <input
            name="password"
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
            required
            style={styles.input}
          />

          <button type="submit" style={styles.primaryButton}>
            Entrar
          </button>
          <div style={styles.registerSection}>
            <span style={styles.registerText}>¿No tienes cuenta?</span>
            <a href="/registro" style={styles.registerLink}>
              Regístrate
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    position: 'relative',
    width: '100vw',
    height: '100vh',
    margin: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundImage: 'url("/Login_Fondo.jpg")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    zIndex: 1,
  },
  card: {
    position: 'relative',
    zIndex: 2,
    width: '90%',
    maxWidth: '400px',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: '2rem',
    borderRadius: '12px',
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.25)',
    backdropFilter: 'blur(8px)',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
  },
  title: {
    color: '#111',
    textAlign: 'center',
    marginBottom: '1.5rem',
    fontSize: '1.75rem',
    fontWeight: 600,
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  input: {
    width: '100%',
    padding: '0.75rem 1rem',
    border: '1px solid #ccc',
    borderRadius: '6px',
    fontSize: '1rem',
    color: '#333',
    backgroundColor: 'rgba(255,255,255,0.95)',
    transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
  },
  inputFocus: {
    borderColor: '#0070f3',
    boxShadow: '0 0 0 3px rgba(0, 112, 243, 0.2)',
  },
  primaryButton: {
    width: '100%',
    padding: '0.75rem',
    backgroundColor: '#0070f3',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    fontSize: '1rem',
    fontWeight: 500,
    cursor: 'pointer',
    transition: 'background-color 0.2s ease',
  },
  primaryButtonHover: {
    backgroundColor: '#005bb5',
  },
  registerSection: {
    marginTop: '0.5rem',
    textAlign: 'center',
    fontSize: '0.9rem',
    color: '#444',
  },
  registerText: {
    marginRight: '0.25rem',
  },
  registerLink: {
    color: '#0070f3',
    textDecoration: 'none',
    fontWeight: 500,
  },
};

export default LoginForm;
