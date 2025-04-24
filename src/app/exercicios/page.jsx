'use client'

import { useEffect, useState } from 'react'
import { Icons } from "@/components/ui/icons"


export default function Exercicios() {
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
    <main className='h-full w-full'>
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold' }}>Exercícios</h1>
      {loading ? (
        <div className='flex items-center justify-center h-full w-full'>
          <Icons.spinner className="mr-2 h-30 w-30 animate-spin" />
        </div>
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