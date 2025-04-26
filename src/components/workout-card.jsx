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
    <Card className="flex flex-col h-full">
      <CardHeader>
        <CardTitle>{translation?.name || 'Sem nome'}</CardTitle>
        <CardDescription>
          Categoria: {workout.category?.name || 'Desconhecida'}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <p
          className="line-clamp-4 overflow-hidden text-ellipsis"
          dangerouslySetInnerHTML={{
            __html: translation?.description || 'Sem descrição',
          }}
        />
        <div className="mt-4 w-full h-40 bg-gray-200 rounded flex items-center justify-center overflow-hidden">
          {workout.images && workout.images.length > 0 ? (
            <img
              src={workout.images[0].image}
              alt={`Imagem do exercício ${translation?.name}`}
              className="object-contain w-full h-full"
            />
          ) : (
            <span className="text-gray-500">Imagem indisponível</span>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <p>ID: {workout.id}</p>
      </CardFooter>
    </Card>
  )
}
