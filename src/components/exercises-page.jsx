'use client'

import { useEffect, useState } from 'react'

export default function ExercisesPage() {
  const [exercises, setExercises] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchExercises() {
      try {
        const res = await fetch('https://wger.de/api/v2/exerciseinfo/?language=2&limit=20')
        const data = await res.json()
        setExercises(data.results)
      } catch (err) {
        console.error('Erro ao buscar exercícios:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchExercises()
  }, [])

  const getTranslation = (translations) => {
    const pt = translations.find(t => t.language === 7) // Português
    const en = translations.find(t => t.language === 2) // Inglês
    return pt || en
  }

  return (
    <main style={{ padding: '2rem' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold' }}>Exercícios</h1>
      {loading ? (
        <p>Carregando...</p>
      ) : (
        <ul>
          {exercises.map((exercise) => {
            const translation = getTranslation(exercise.translations)
            return (
              <li key={exercise.id} style={{ marginBottom: '1.5rem' }}>
                <h2 style={{ fontWeight: 'bold' }}>name: {translation?.name || 'Sem nome'}</h2>
                <p>description: {translation?.description || 'Sem descrição'}</p>
                <p style={{ color: '#666' }}>category: {exercise.category?.name}</p>
              </li>
            )
          })}
        </ul>
      )}
    </main>
  )
}