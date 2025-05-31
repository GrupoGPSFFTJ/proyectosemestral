// frontend/app/page.tsx
'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

interface Card {
  label: string;
  count: number;
  href: string;
}

export default function DashboardPage() {
  const [cards, setCards] = useState<Card[]>([]);

  useEffect(() => {
    setCards([
      { label: 'Pacientes', count: 3, href: '/pacientes' },
      { label: 'Familias', count: 3, href: '/familias' },
      { label: 'Fichas Clínicas', count: 3, href: '/fichas-clinica' },
      { label: 'Fichas Odontológicas', count: 3, href: '/fichas-odontologica' },
      { label: 'Vacunación', count: 3, href: '/vacunacion' },
      { label: 'Citas', count: 3, href: '/citas' },
      { label: 'Recetas', count: 3, href: '/recetas' },
      { label: 'Medicamentos', count: 3, href: '/medicamentos' },
      { label: 'Despachos', count: 3, href: '/despachos' },
    ]);
  }, []);

  return (
    <div>
      <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Dashboard</h1>
      <p>Resumen rápido de las secciones</p>

      <div className="dashboard">
        {cards.map(card => (
          <Link href={card.href} key={card.href} className="card">
            <h3>{card.label}</h3>
            <span className="count">{card.count}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
