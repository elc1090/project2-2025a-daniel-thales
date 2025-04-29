import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from '@/components/ui/input'
import { Button } from "@/components/ui/button"
import { useEffect, useState } from 'react'
import { Icons } from "@/components/ui/icons"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
 
import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export function WorkoutDialog({
    dialogOpen,
    setDialogOpen,
    selectedExercise,
    selectedExerciseTranslation,
}) {

 const [date, setDate] = useState()
 const [timeMinutes, setTimeMinutes] = useState('')
 const [sets, setSets] = useState('')
 const [repsPerSet, setRepsPerSet] = useState('')

 function saveWorkoutData(workoutData) {
    const stored = localStorage.getItem('workouts');
    const workouts = stored ? JSON.parse(stored) : [];

    console.log('workouts', workouts)
    workouts.push(workoutData);
    localStorage.setItem('workouts', JSON.stringify(workouts));
  }

  function clearInputs() {
    setDate(null)
    setTimeMinutes('')
    setSets('')
    setRepsPerSet('')
  }

  function handleSaveWorkout() {
    if (!date || !timeMinutes || !sets || !repsPerSet) {
      alert('Preencha todos os campos!')
      return
    }

    const workoutData = {
      exerciseId: selectedExercise.id,
      name: selectedExerciseTranslation?.name,
      category: selectedExercise.category,
      date: date.toISOString().split('T')[0],
      timeMinutes: parseInt(timeMinutes),
      sets: parseInt(sets),
      repsPerSet: parseInt(repsPerSet),
      estimatedCalories: Math.floor(Math.random() * 200) + 50,
    }

    saveWorkoutData(workoutData)
    clearInputs()
    setDialogOpen(false)
  }

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            
            {selectedExercise?.images && selectedExercise.images.length > 0 ? (
              <img
                src={selectedExercise.images[0].image}
                alt={`Imagem do exercício ${selectedExerciseTranslation?.name}`}
                className="mt-4 rounded shadow object-cover w-full h-40"
              />
            ) : (
              <div className="mt-4 w-full h-40 bg-gray-200 flex items-center justify-center rounded">
                <span className="text-gray-500">Imagem indisponível</span>
              </div>
            )}
            <DialogTitle className="mt-3"> {selectedExerciseTranslation?.name} </DialogTitle>
            <DialogDescription>
            <p className="line-clamp-4" dangerouslySetInnerHTML={{ __html: selectedExerciseTranslation?.description || 'Sem descrição' }} />
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
                Date
              </Label>
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                    variant={"outline"}
                    className={cn(
                        "w-[280px] justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                    )}
                    >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                    <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    />
                </PopoverContent>
                </Popover>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">
                Time (min)
              </Label>
              <Input  value={timeMinutes}
                onChange={(e) => setTimeMinutes(e.target.value)} 
                className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label  className="text-right">
                Sets 
              </Label>
              <Input value={sets}
               onChange={(e) => setSets(e.target.value)} 
               className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-left">
                Reps per set 
              </Label>
              <Input  value={repsPerSet}
               onChange={(e) => setRepsPerSet(e.target.value)}  className="col-span-3" />
            </div>
          </div>
          
          <DialogFooter>
            <Button type="submit" onClick={handleSaveWorkout}>Save workout</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
  );
}
