'use client'

import { useEffect, useState } from 'react'
import { Icons } from "@/components/ui/icons"

import { Button } from "@/components/ui/button"
import { WorkoutCard } from '@/components/workout-card'

export default function Exercicios() {
  const [exercises, setExercises] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(0)
  const [totalCount, setTotalCount] = useState(0)
  const [selectedCategory, setSelectedCategory] = useState('')
  const limit = 20

  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await fetch('https://wger.de/api/v2/exercisecategory/')
        const data = await res.json()
        setCategories(data.results)
      } catch (err) {
        console.error('Erro ao buscar categorias:', err)
      }
    }

    fetchCategories()
  }, [])

  useEffect(() => {
    async function fetchExercises() {
      setLoading(true)
      try {
        const filteredExercises = []
      let offset = page * limit
      let currentCount = 0

      while (currentCount < limit) {
        const url = new URL('https://wger.de/api/v2/exerciseinfo/')
        url.searchParams.append('limit', limit)
        url.searchParams.append('offset', offset)
        if (selectedCategory) url.searchParams.append('category', selectedCategory)

        const res = await fetch(url.toString())
        const data = await res.json()

        // Tentativa pra filtrar apenas exercícios com imagens
        const exercisesWithImages = data.results.filter(exercise => exercise.images && exercise.images.length > 0)
        filteredExercises.push(...exercisesWithImages)

        currentCount = filteredExercises.length
        offset += limit

        // Se não houver mais resultados da API, parar
        if (data.results.length === 0) break
      }

      // Cortando o array para garntir o limite da página.
      setExercises(filteredExercises.slice(0, limit))
      setTotalCount(filteredExercises.length)
    } catch (err) {
      console.error('Erro ao buscar exercícios:', err)
    } finally {
      setLoading(false)
    }
  }

  fetchExercises()
}, [page, selectedCategory])

  const getTranslation = (translations) => {
    return translations.find(t => t.language === 2)
  }

  const hasNextPage = (page + 1) * limit < totalCount
  const hasPreviousPage = page > 0

  return (
    <main className='h-full w-full p-4'>
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold' }}>Exercícios</h1>
      <div className='flex items-center justify-between mb-4'>
        <label className="mr-4">
          Filtrar por categoria:
          <select
            className="ml-2 border border-gray-300 rounded px-2 py-1"
            onChange={(e) => {
              setSelectedCategory(e.target.value);
              setPage(0); // Redefine a página para a primeira ao trocar de categoria
            }}
          >
            <option value="">Todas</option>
            {categories.map(category => (
              <option key={category.id} value={category.id}>{category.name}</option>
            ))}
          </select>
        </label>
      </div>

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