'use client'

import { useEffect, useState } from 'react'
import { Icons } from "@/components/ui/icons"

import { Button } from "@/components/ui/button"
import { WorkoutCard } from '@/components/workout-card'

export default function Exercicios() {
  const [exercises, setExercises] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(0)
  const [totalCount, setTotalCount] = useState(0)
  const limit = 20

  useEffect(() => {
    async function fetchExercises() {
      setLoading(true)
      try {
        const offset = page * limit
        const res = await fetch(`https://wger.de/api/v2/exerciseinfo/?limit=${limit}&offset=${offset}`)
        const data = await res.json()
        setExercises(data.results)
        setTotalCount(data.count)
      } catch (err) {
        console.error('Erro ao buscar exercícios:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchExercises()
  }, [page])

  const getTranslation = (translations) => {
    return translations.find(t => t.language === 2)
  }

  const hasNextPage = (page + 1) * limit < totalCount
  const hasPreviousPage = page > 0

  return (
    <main className='h-full w-full p-4'>
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold' }}>Exercícios</h1>
      {loading ? (
        <div className='flex items-center justify-center h-full w-full'>
          <Icons.spinner className="mr-2 h-30 w-30 animate-spin" />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {exercises.map((workout) => {
              const translation = getTranslation(workout.translations)
              return (
                <WorkoutCard key={workout.id} workout={workout} translation={translation} />
              )
            })}
          </div>

          {/* Botões de Paginação */}
          <div className="flex justify-center gap-4 mt-6">
            <Button disabled={!hasPreviousPage} onClick={() => setPage(prev => Math.max(prev - 1, 0))}>
              Página Anterior
            </Button>
            <span className="self-center text-sm text-gray-600">
              Página {page + 1}
            </span>
            <Button disabled={!hasNextPage} onClick={() => setPage(prev => prev + 1)}>
              Próxima Página
            </Button>
          </div>
        </>
      )}
    </main>
  )
}