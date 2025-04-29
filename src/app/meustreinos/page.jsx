'use client'

import { useEffect, useState } from 'react'

import {
  BicepsFlexed,
  Dumbbell,
  Activity,
  PersonStanding,
  ArrowBigDown,
  ActivitySquare,
  StretchHorizontal
} from 'lucide-react';
import { Label } from '@radix-ui/react-dropdown-menu';


export default function MeusFavoritos() {

  const [workouts, setWorkouts] = useState([]);

  useEffect(( )=> {
    async function fetchWorkouts() {
      const stored = localStorage.getItem('workouts');
      const workoutsData = stored ? JSON.parse(stored) : [];
      setWorkouts(workoutsData);
    }

    fetchWorkouts();
  }, []);
  
  // Mapeamento das categorias para os ícones
  const categoryIcons = {
    Abs: Dumbbell,
    Arms: BicepsFlexed,
    Back: ArrowBigDown,
    Calves: PersonStanding,
    Cardio: Activity,
    Chest: Dumbbell,
    Legs: ActivitySquare,
    Shoulders: StretchHorizontal,
  };

  function getIcon(category) {
    const icon = categoryIcons['Abs'] || Dumbbell;
    return icon;
  }

  
  return (
   <div>
    <h1 className="text-2xl font-bold mb-6">Meus treinos</h1>

      <div className="mt-4">
        {workouts.map((workout, index) => (
          <div className="flex items-center gap-6 p-6 mb-4 border rounded-lg shadow-md bg-white w-full max-w-3xl">
            <div className="flex-shrink-0">
              <Dumbbell className="w-16 h-16 text-[#8BC414]" />
            </div>
    
          <div className="flex flex-col">
            <h2 className="text-xl font-bold">{workout.name}</h2>
            <p className="text-gray-600">Category: {workout.category.name}</p>
            <p className="text-gray-600">Date: {workout.date}</p>
            <p className="text-gray-600">Sets: {workout.sets}x | Reps por set: {workout.repsPerSet}</p>
            <p className="text-gray-600">Time: {workout.timeMinutes} min</p>
            <p className="text-gray-600">Estimated Calories: {workout.estimatedCalories} kcal</p>
          </div>
        </div>

          
        ))}
    
   </div>
   </div>
  )
}