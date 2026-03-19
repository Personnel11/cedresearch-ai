'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function TestDbPage() {
  const [status, setStatus] = useState<string>('Chargement...');
  const [error, setError] = useState<string | null>(null);
  const [documentCount, setDocumentCount] = useState<number | null>(null);

  useEffect(() => {
    async function testConnection() {
      try {
        // Test simple: exécuter une requête pour vérifier la connexion
        const { data, error: supabaseError } = await supabase
          .from('documents')
          .select('id', { count: 'exact', head: true });

        if (supabaseError) {
          setError(supabaseError.message);
          setStatus('Erreur de connexion');
        } else {
          setDocumentCount(data?.length ?? 0);
          setStatus('Connexion réussie!');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erreur inconnue');
        setStatus('Erreur');
      }
    }

    testConnection();
  }, []);

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>Test de connexion Supabase</h1>
      <p>Statut: {status}</p>
      {documentCount !== null && (
        <p>Nombre de documents: {documentCount}</p>
      )}
      {error && <p style={{ color: 'red' }}>Erreur: {error}</p>}
    </div>
  );
}
