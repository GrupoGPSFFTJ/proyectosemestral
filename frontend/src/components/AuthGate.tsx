'use client';

import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useAuth } from './AuthContext';
import { apiService } from '@/services/ApiService';

export function AuthGate({ children }: { children: React.ReactNode }) {
    const { user } = useAuth();

    if (user === undefined) return <p style={{ color: 'white' }}>Cargando...</p>;
    if (!user) return <AuthScreen />;

    return <>{children}</>;
}

function AuthScreen() {
    const [isRegistering, setIsRegistering] = React.useState(false);

    return (
        <div style={styles.container}>
            <div style={styles.overlay} />
            <div style={styles.card}>
                {isRegistering ? <RegisterForm /> : <LoginForm />}
                <div style={styles.registerSection}>
                    {isRegistering ? (
                        <>
                            <span style={styles.registerText}>¿Ya tienes cuenta?</span>
                            <button onClick={() => setIsRegistering(false)} style={styles.registerLink}>Inicia sesión
                            </button>
                        </>
                    ) : (
                        <>
                            <span style={styles.registerText}>¿No tienes cuenta?</span>
                            <button onClick={() => setIsRegistering(true)} style={styles.registerLink}>Regístrate
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export function LoginForm() {
    const { login } = useAuth();
    const [identifier, setIdentifier] = useState('');
    const [password, setPassword] = useState('');
    const [useEmail, setUseEmail] = useState(true);
    const [hover, setHover] = useState(false);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        login(identifier, password, useEmail);
    };

    const toggleLinkStyle = {
        ...styles.toogleEmailLink,
        textDecoration: hover ? 'underline' : styles.toogleEmailLink.textDecoration,
    };

    return (
        <div>
            <h2 style={styles.title}>Iniciar Sesión</h2>
            <form onSubmit={handleSubmit} style={styles.form}>
                <div style={styles.toggleEmailInline}>
                    {useEmail ? (
                        <button
                            onClick={() => setUseEmail(false)}
                            type="button"
                            style={toggleLinkStyle}
                            onMouseEnter={() => setHover(true)}
                            onMouseLeave={() => setHover(false)}
                        >
                            Usar nombre de usuario
                        </button>
                    ) : (
                        <button
                            onClick={() => setUseEmail(true)}
                            type="button"
                            style={toggleLinkStyle}
                            onMouseEnter={() => setHover(true)}
                            onMouseLeave={() => setHover(false)}
                        >
                            Usa correo
                        </button>
                    )}
                </div>
                <input
                    name={useEmail ? 'email' : 'username'}
                    type={useEmail ? 'email' : 'text'}
                    placeholder={useEmail ? 'Email' : 'Usuario'}
                    value={identifier}
                    onChange={e => setIdentifier(e.target.value)}
                    required
                    style={styles.input}
                />
                <input
                    name="password"
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                    style={styles.input}
                />
                <button type="submit" style={styles.primaryButton}>Entrar</button>
            </form>
        </div>
    );
}

function RegisterForm() {
    const { register } = useAuth();
    const [centros, setCentros] = useState<{ id_centro_salud: number; nombre: string }[]>([]);
    const [form, setForm] = useState({
        username: '',
        password: '',
        nombre: '',
        email: '',
        id_centro_salud: ''
    });

    useEffect(() => {
        apiService.getCentrosSalud()
            .then(setCentros)
            .catch(() => alert('Error al cargar centros de salud'));
    }, []);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        register({
            ...form,
            id_centro_salud: parseInt(form.id_centro_salud),
        });
    };

    return (
        <>
            <h2 style={styles.title}>Registro</h2>
            <form onSubmit={handleSubmit} style={styles.form}>
                <input name="username" placeholder="Usuario" value={form.username} onChange={handleChange} required
                    style={styles.input} />
                <input name="password" type="password" placeholder="Contraseña" value={form.password}
                    onChange={handleChange} required style={styles.input} />
                <input name="nombre" placeholder="Nombre completo" value={form.nombre} onChange={handleChange} required
                    style={styles.input} />
                <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required
                    style={styles.input} />
                <select name="id_centro_salud" value={form.id_centro_salud} onChange={handleChange} required
                    style={styles.input}>
                    <option value="">Selecciona centro de salud</option>
                    {centros.map((c) => (
                        <option key={c.id_centro_salud} value={c.id_centro_salud}>{c.nombre}</option>
                    ))}
                </select>
                <button type="submit" style={styles.primaryButton}>Registrarse</button>
            </form>
        </>
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
        maxWidth: '410px',
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        padding: '2rem',
        borderRadius: '12px',
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.25)',
        backdropFilter: 'blur(8px)',
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
    },
    registerSection: {
        marginTop: '1rem',
        textAlign: 'center',
        fontSize: '0.9rem',
        color: '#444',
    },
    registerText: {
        marginRight: '0.25rem',
    },
    registerLink: {
        background: 'none',
        color: '#0070f3',
        border: 'none',
        cursor: 'pointer',
        fontWeight: 500,
        textDecoration: 'underline',
    },
    toogleEmailSection: {
        marginTop: '1rem',
        textAlign: 'left',
        fontSize: '0.9rem',
        color: '#444',
    },
    toogleEmailLink: {
        background: 'none',
        color: '#444',
        border: 'none',
        cursor: 'pointer',
        fontWeight: 400,
        textDecoration: 'none',
        width: 'auto',
        textAlign: 'left',
        padding: 0,
        boxSizing: 'border-box',
        borderRadius: 0,
        fontSize: '0.9rem',
    },
    toggleEmailInline: {
        marginLeft: '0.3rem',
        marginBottom: '-0.9rem',
        textAlign: 'left',
    },
};
