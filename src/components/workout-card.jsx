import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Icons } from "@/components/ui/icons";

export function WorkoutCard({
  workout,
  translation
}) {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setIsFavorite(favorites.includes(workout.id));
  }, [workout.id]);

  const toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    if (isFavorite) {
      const updatedFavorites = favorites.filter(id => id !== workout.id);
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      setIsFavorite(false);
    } else {
      favorites.push(workout.id);
      localStorage.setItem("favorites", JSON.stringify(favorites));
      setIsFavorite(true);
    }
  };

  return (
    <Card>
      <CardHeader className="flex justify-between items-start">
        <div>
          <CardTitle>{translation?.name || 'Sem nome'}</CardTitle>
          <CardDescription>Categoria: {workout.category?.name || 'Desconhecida'}</CardDescription>
        </div>
        <button onClick={toggleFavorite} aria-label="Toggle Favorite">
          <Icons.heart
            className={`h-6 w-6 ${isFavorite ? 'text-red-500' : 'text-gray-400'} transition-colors`} 
            fill={isFavorite ? 'red' : 'none'}
          />
        </button>
      </CardHeader>
      <CardContent>
        <p className="line-clamp-4" dangerouslySetInnerHTML={{ __html: translation?.description || 'Sem descrição' }} />
        {workout.images && workout.images.length > 0 ? (
          <img
            src={workout.images[0].image}
            alt={`Imagem do exercício ${translation?.name}`}
            className="mt-4 rounded shadow object-contain w-full h-40"
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
  );
}
