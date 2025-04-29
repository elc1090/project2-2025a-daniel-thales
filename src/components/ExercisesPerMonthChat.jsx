"use client"

import React, { useEffect, useMemo, useState } from "react"
import { TrendingUp } from "lucide-react"
import { Label, Pie, PieChart } from "recharts"

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

export function ExercisesPerMonthChart() {
  const [chartData, setChartData] = useState([])

  useEffect(() => {
    function loadWorkouts() {
      const storedWorkouts = localStorage.getItem("workouts")
      if (!storedWorkouts) return

      const workouts = JSON.parse(storedWorkouts)

      const categoryCount = {}

      for (const workout of workouts) {
        const category = workout.category.name || "Other"
        console.log("category: ",category)
        if (!categoryCount[category]) {
          categoryCount[category] = 0
        }
        categoryCount[category]++
      }

      const formattedData = Object.entries(categoryCount).map(([category, count], index) => ({
        category,
        count,
        fill: `hsl(var(--chart-${(index % 5) + 1}))`, // reusa 5 cores
      }))

      setChartData(formattedData)
    }

    loadWorkouts()
  }, [])

  const totalExercises = useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.count, 0)
  }, [chartData])

  const chartConfig = useMemo(() => {
    const config = {}
    chartData.forEach((item) => {
      config[item.category] = {
        label: item.category,
        color: item.fill,
      }
    })
    return config
  }, [chartData])

  if (chartData.length === 0) {
    return <div>No data available</div>
  }

  return (
    <Card className="sapphire-theme flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Exercícios por categoria</CardTitle>
        <CardDescription>Exibindo a quantidade total de exerícios e a quantidade por categoria</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="count"
              nameKey="category"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalExercises.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy + 24}
                          className="fill-muted-foreground"
                        >
                          Exercises
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}