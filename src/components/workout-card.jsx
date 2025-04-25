import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export function WorkoutCard({
    workout,
    translation
  }) {
  
    return (
        <Card>
            <CardHeader>
                <CardTitle>{translation?.name || 'Sem nome'}</CardTitle>
                <CardDescription>Categoria: {workout.category?.name || 'Desconhecida'}</CardDescription>
            </CardHeader>
            <CardContent>
                <p dangerouslySetInnerHTML={{ __html: translation?.description || 'Sem descrição' }} />
                    {workout.images && workout.images.length > 0 ? (
                      <img
                        src={workout.images[0].image}
                        alt={`Imagem do exercício ${translation?.name}`}
                        className="mt-4 rounded shadow"
                      />
                    ) : (
                      <div className="mt-4 w-full h-40 bg-gray-200 flex items-center justify-center rounded">
                        <span className="text-gray-500">Imagem indisponível</span>
                      </div>
                    )}
            </CardContent>
            <CardFooter>
                <p>ID: {workout.id}</p>
            </CardFooter>
        </Card>
    )
}