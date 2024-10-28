"use client"

import React, { useState } from 'react';
import {
  ChevronDown,
  Calendar,
  Tag,
  Clock,
  MoreHorizontal,
  Star,
  ArrowLeft,
  Plus,
  CheckSquare,
  Square,
  MapPin,
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Layout } from '@/components/Layout';
import { Card, CardContent } from "@/components/ui/card";

const TaskDetailView = () => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [title, setTitle] = useState("Reunión con equipo creativo");
  const [isCompleted, setIsCompleted] = useState(false);
  
  const task = {
    category: "Trabajo",
    tags: ["urgente", "marketing"],
    dueDate: "2024-03-01",
    lastEdited: "2024-02-20",
    priority: "Alta",
    status: "En progreso",
    assignedTo: "Ana García",
    relatedNotes: [
      { id: 1, title: "Proyecto de Marketing Q4", preview: "Objetivos principales..." },
      { id: 2, title: "Notas reunión anterior", preview: "Puntos pendientes..." }
    ],
    relatedEvents: [
      { 
        id: 1, 
        title: "Reunión de Planificación Q4", 
        date: "2024-03-01T10:00:00",
        location: "Sala de conferencias A"
      },
      {
        id: 2,
        title: "Follow-up Marketing",
        date: "2024-03-08T15:00:00",
        location: "Sala B"
      }
    ],
    description: `
## Objetivos de la reunión
- Revisar avance de campañas actuales
- Definir estrategia de contenido Q4
- Asignar responsabilidades

## Puntos a tratar
1. Estado actual de métricas
2. Propuestas nuevas campañas
3. Timeline de implementación
4. Presupuesto disponible

## Material necesario
- Presentación de resultados Q3
- Benchmark competencia
- Propuesta creativa inicial
    `
  };

  return (
    <Layout>
      <header className="border-b">
        <div className="flex h-14 items-center px-4 gap-4">
          <div className="flex-1 flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsCompleted(!isCompleted)}
            >
              {isCompleted ? (
                <CheckSquare className="h-4 w-4 text-green-500" />
              ) : (
                <Square className="h-4 w-4" />
              )}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsFavorite(!isFavorite)}
            >
              <Star className={`h-4 w-4 ${isFavorite ? 'fill-yellow-400 text-yellow-400' : ''}`} />
            </Button>
            <div className="hidden md:flex items-center gap-1">
              {task.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
              <Button variant="ghost" size="icon" className="h-5 w-5">
                <Plus className="h-3 w-3" />
              </Button>
            </div>
          </div>

          <div className="flex items-center gap-4">
           <div className='hidden md:flex items-center gap-4'>
           <Badge variant="outline" className="gap-1">
              <Clock className="h-3 w-3" />
              {new Date(task.dueDate).toLocaleDateString()}
            </Badge>
            <Badge variant="outline" className="gap-1 bg-red-50">
              {task.priority}
            </Badge>
            <Badge variant="secondary">{task.status}</Badge>
           </div>
            <div className="text-sm text-muted-foreground">
              Editado {new Date(task.lastEdited).toLocaleDateString()}
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Cambiar fecha</DropdownMenuItem>
                <DropdownMenuItem>Cambiar prioridad</DropdownMenuItem>
                <DropdownMenuItem className="text-destructive">
                  Eliminar
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <main className="container max-w-4xl mx-auto py-6">
  <div className="mb-8">
    <Input
      value={title}
      onChange={(e) => setTitle(e.target.value)}
      className="text-3xl font-bold border-none px-0 focus-visible:ring-0"
    />
    <div className="mt-2 text-sm text-muted-foreground">
      Asignado a: {task.assignedTo}
    </div>
  </div>

  <div className="grid grid-cols-1 md:grid-cols-[1fr,16rem] gap-8">
    <div className="prose prose-sm max-w-none">
      <div className="whitespace-pre-wrap">
        {task.description}
      </div>
    </div>

    <aside className="space-y-6">
      {task.relatedNotes.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-3">Notas relacionadas</h3>
          <div className="grid gap-2">
            {task.relatedNotes.map((note) => (
              <Card key={note.id} className="cursor-pointer hover:bg-accent">
                <CardContent className="p-4">
                  <h4 className="font-medium">{note.title}</h4>
                  <p className="text-sm text-muted-foreground">{note.preview}</p>
                </CardContent>
              </Card>
            ))}
            <Button variant="outline" size="sm" className="w-full">
              <Plus className="h-4 w-4 mr-2" />
              Añadir nota
            </Button>
          </div>
        </div>
      )}

      {task.relatedEvents.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-3">Eventos relacionados</h3>
          <div className="grid gap-2">
            {task.relatedEvents.map((event) => (
              <Card key={event.id} className="cursor-pointer hover:bg-accent">
                <CardContent className="p-4">
                  <h4 className="font-medium">{event.title}</h4>
                  <div className="mt-1 text-sm text-muted-foreground">
                    {new Date(event.date).toLocaleString()}
                  </div>
                  <div className="mt-1 text-sm text-muted-foreground flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {event.location}
                  </div>
                </CardContent>
              </Card>
            ))}
            <Button variant="outline" size="sm" className="w-full">
              <Plus className="h-4 w-4 mr-2" />
              Añadir evento
            </Button>
          </div>
        </div>
      )}
    </aside>
  </div>
</main>
    </Layout>
  );
};

export default TaskDetailView;