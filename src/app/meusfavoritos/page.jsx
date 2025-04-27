'use client'

import { useEffect, useState } from 'react'
import { Icons } from "@/components/ui/icons"
import { Button } from "@/components/ui/button"
import { WorkoutCard } from '@/components/workout-card'

export default function MeusFavoritos() {
  const [favorites, setFavorites] = useState([]); // Exercícios favoritos
  const [workouts, setWorkouts] = useState([]); // Lista de exercícios favoritos
  const [loading, setLoading] = useState(true);
  const limit = 21;

  useEffect(() => {
    // Carregar os favoritos do localStorage somente uma vez
    const favoritesFromStorage = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(favoritesFromStorage);
  }, []); // esse useEffect só executa uma vez ao carregar o componente

  useEffect(() => {
    if (favorites.length === 0) {
      setLoading(false); // Caso não haja favoritos
      return;
    }

    async function fetchWorkouts() {
      setLoading(true);
      try {
        const favoriteExercises = [];

        favorites.forEach(async (id) => {
          const url = new URL(`https://wger.de/api/v2/exerciseinfo/${id}`);
          const res = await fetch(url.toString());
          const data = await res.json();

          favoriteExercises.push(data);
          setWorkouts(favoriteExercises.slice(0, limit));
        })
      } catch (err) {
        console.error('Erro ao buscar exercícios favoritos:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchWorkouts();
  }, [favorites]); // O useEffect é executado novamente apenas quando os favoritos mudarem (tava dando erro antes)

  const onToggleFavorite = (id, isFavorite) => {
    if (!isFavorite) {
      setFavorites((prev) => prev.filter((favoriteId) => favoriteId !== id));
    }
  }

  return (
    <main className='h-full w-full p-4'>
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold' }}>Meus Favoritos</h1>

      {loading ? (
        <div className='flex items-center justify-center h-full w-full'>
          <Icons.spinner className="mr-2 h-30 w-30 animate-spin" />
        </div>
      ) : (
        <>
          {workouts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {workouts.map((workout) => {
                const translation = workout.translations?.find(t => t.language === 2);
                return (
                  <WorkoutCard key={workout.id} workout={workout} translation={translation} onToggleFavorite={onToggleFavorite} />
                );
              })}
            </div>
          ) : (
            <div className="text-center mt-6">
              <p className="text-xl text-gray-600">Não há favoritos ainda.</p>
            </div>
          )}
        </>
      )}
    </main>
  )
}
