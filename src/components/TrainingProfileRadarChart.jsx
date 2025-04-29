"use client"

import React, { useEffect, useState, useMemo } from "react"
import { TrendingUp } from "lucide-react"
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

export function TrainingProfileRadarChart() {
  const [chartData, setChartData] = useState([])

  useEffect(() => {
    function loadWorkouts() {
      const storedWorkouts = localStorage.getItem("workouts")
      if (!storedWorkouts) return

      const workouts = JSON.parse(storedWorkouts)
      if (workouts.length === 0) return

      const total = {
        Tempo: 0,
        Séries: 0,
        Repetições: 0,
        Calorias: 0,
      }

      let maxValues = {
        Tempo: 0,
        Séries: 0,
        Repetições: 0,
        Calorias: 0,
      }

      // Somatório e coleta do maior valor
      workouts.forEach((w) => {
        const tempo = w.timeMinutes || 0
        const series = w.sets || 0
        const reps = w.repsPerSet || 0
        const calorias = w.estimatedCalories || 0

        total.Tempo += tempo
        total.Séries += series
        total.Repetições += reps
        total.Calorias += calorias

        if (tempo > maxValues.Tempo) maxValues.Tempo = tempo
        if (series > maxValues.Séries) maxValues.Séries = series
        if (reps > maxValues.Repetições) maxValues.Repetições = reps
        if (calorias > maxValues.Calorias) maxValues.Calorias = calorias
      })

      // Média e normalização (0–100)
      const normalizedData = Object.entries(total).map(([label, sum]) => {
        const avg = sum / workouts.length
        const max = maxValues[label] || 1
        const normalized = Math.round((avg / max) * 100)
        return {
          atributo: label,
          valor: normalized,
        }
      })

      setChartData(normalizedData)
    }

    loadWorkouts()
  }, [])

  const chartConfig = useMemo(() => {
    return {
      valor: {
        label: "Perfil de Treino",
        color: "hsl(var(--chart-1))",
      },
    }
  }, [])

  if (chartData.length === 0) {
    return <div className="text-center text-sm text-muted-foreground">Nenhum dado encontrado</div>
  }

  return (
    <Card>
      <CardHeader className="items-center pb-4">
        <CardTitle>Perfil de Treino</CardTitle>
        <CardDescription>Média normalizada dos seus treinos</CardDescription>
      </CardHeader>
      <CardContent className="pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[300px] w-full"
        >
          <RadarChart data={chartData}>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <PolarGrid gridType="circle" />
            <PolarAngleAxis dataKey="atributo" />
            <Radar
              dataKey="valor"
              fill="var(--color-valor)"
              fillOpacity={0.6}
              dot={{ r: 4, fillOpacity: 1 }}
            />
          </RadarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Perfil médio com base nos treinos <TrendingUp className="h-4 w-4" />
        </div>
      </CardFooter>
    </Card>
  )
}