'use client'

import { useEffect, useState } from 'react'

export default function ExercisesPage() {
  const [exercises, setExercises] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState('')

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
        const url = new URL('https://wger.de/api/v2/exerciseinfo/')
        url.searchParams.append('language', '2')
        url.searchParams.append('limit', '20')
        if (selectedCategory) url.searchParams.append('category', selectedCategory)

        console.log('URL da requisição:', url.toString()) // Log para depuração

        const res = await fetch(url.toString())
        const data = await res.json()
        console.log('Dados recebidos:', data) // Log para verificar o retorno

        setExercises(data.results)
      } catch (err) {
        console.error('Erro ao buscar exercícios:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchExercises()
  }, [selectedCategory])

  const getTranslation = (translations) => {
    const pt = translations.find(t => t.language === 7) // Português
    const en = translations.find(t => t.language === 2) // Inglês
    return pt || en
  }

  return (
    <main style={{ padding: '2rem' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold' }}>Exercícios</h1>
      <div style={{ marginBottom: '1rem' }}>
        <label style={{ marginRight: '1rem' }}>
          Filtrar por categoria:
          <select onChange={(e) => setSelectedCategory(e.target.value)}>
            <option value="">Todas</option>
            {categories.map(category => (
              <option key={category.id} value={category.id}>{category.name}</option>
            ))}
          </select>
        </label>
      </div>
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
