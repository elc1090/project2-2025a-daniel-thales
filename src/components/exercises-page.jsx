import { Dumbbell } from "lucide-react"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export function ExercisesPage({
  ...props
}) {

  const exercises = [
    { title: "Bíceps", description: "Rosca direta e variações", content: "3 séries de 12 reps", footer: "Grupo: Braço" },
    { title: "Costas", description: "Puxada, remada, barra", content: "4 séries de 10 reps", footer: "Grupo: Costas" },
    { title: "Peito", description: "Supino reto e inclinado", content: "3 séries de 8 reps", footer: "Grupo: Peito" },
    { title: "Abdômen", description: "Prancha e abdominal", content: "3x 1min + 15 reps", footer: "Grupo: Core" },
    { title: "Perna", description: "Agachamento, leg press", content: "4 séries de 12 reps", footer: "Grupo: Inferiores" },
    { title: "Ombro", description: "Desenvolvimento e elevação lateral", content: "3 séries de 10 reps", footer: "Grupo: Ombros" },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {exercises.map((ex, i) => (
        <Card key={i}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Dumbbell className="w-4 h-4" />
              {ex.title}
            </CardTitle>
            <CardDescription>{ex.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <p>{ex.content}</p>
          </CardContent>
          <CardFooter>
            <p>{ex.footer}</p>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
