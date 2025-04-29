"use client"

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { useEffect, useState } from "react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const chartConfig = {
  calories: {
    label: "Calories",
    color: "#f97316", // laranja (Tailwind orange-500)
  },
}

export function CaloriesPerMonthChart() {
  const [chartData, setChartData] = useState([])

  useEffect(() => {
    const storedData = localStorage.getItem("workouts")

    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData)
        const monthTotals = {}

        parsedData.forEach((item) => {
          const month = new Date(item.date).toLocaleString("default", { month: "long" })

          if (!monthTotals[month]) {
            monthTotals[month] = 0
          }
          monthTotals[month] += item.estimatedCalories
        })

        const formattedData = Object.entries(monthTotals).map(([month, calories]) => ({
          month,
          calories,
        }))

        const monthOrder = [
          "January", "February", "March", "April", "May", "June",
          "July", "August", "September", "October", "November", "December"
        ]

        formattedData.sort((a, b) => {
          return monthOrder.indexOf(a.month) - monthOrder.indexOf(b.month)
        })

        setChartData(formattedData)
      } catch (error) {
        console.error("Erro ao ler dados do workout:", error)
      }
    } else {
      setChartData([{}])
    }
  }, [])

  return (
    <Card className="sapphire-theme">
      <CardHeader>
        <CardTitle>Calorias queimadas por mês</CardTitle>
        <CardDescription>Mostrando o total de calorias queimadas por mês</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart data={chartData} margin={{ left: 32, right: 12 }}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              width={50}
              label={{ value: "Calories", angle: -90, position: "insideLeft", dy: -10 }}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dot" />} />
            <Area
              dataKey="calories"
              type="natural"
              fill={chartConfig.calories.color}
              fillOpacity={0.4}
              stroke={chartConfig.calories.color}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}