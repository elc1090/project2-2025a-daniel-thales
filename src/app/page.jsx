"use client"

import { CaloriesPerMonthChart } from "@/components/CaloriesPerMonthChart"
import { ExercisesPerMonthChart } from "@/components/ExercisesPerMonthChat"
import { Chart } from "@/components/HoursPerMonthChar"
import { TrainingProfileRadarChart } from "@/components/TrainingProfileRadarChart"

export const iframeHeight = "800px"
export const description = "A sidebar with a header and a search form."

export default function Page() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Início</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Chart />
        <ExercisesPerMonthChart />
        
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-5">
      <CaloriesPerMonthChart />
        <TrainingProfileRadarChart />
      </div>
    </div>
  )
}