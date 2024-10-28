"use client"

import React, { useState } from 'react';
import {
  ChevronDown,
  Calendar,
  Tag,
  Clock,
  MoreHorizontal,
  Star,
  Plus,
  CheckSquare,
  Square,
  MapPin,
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Layout } from '@/components/Layout';
import { Card, CardContent } from "@/components/ui/card";

const EventDetailView = () => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [title, setTitle] = useState("Reunión de Planificación Q4");
  
  const event = {
    date: "2024-03-01T10:00:00",
    location: "Sala de conferencias A",
    description: `
## Detalles del Evento
- Reunión con el equipo de marketing
- Discusión sobre la estrategia de contenido Q4

## Agenda
1. Revisión de métricas actuales
2. Propuestas de nuevas campañas
3. Asignación de responsabilidades
    `,
    lastEdited: "2024-02-20",
    relatedTasks: [
      { id: 1, title: "Reunión con equipo creativo", completed: false, dueDate: "2024-03-01" },
      { id: 2, title: "Definir timeline", completed: false, dueDate: "2024-03-05" },
      { id: 3, title: "Aprobar presupuestos", completed: false, dueDate: "2024-03-10" }
    ],
    relatedNotes: [
      { id: 1, title: "Notas de reunión anterior", preview: "Puntos discutidos..." }
    ],
  };

  return (
    <Layout>
      <header className="border-b">
        <div className="flex h-14 items-center px-4 gap-4">
          <div className="flex-1 flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsFavorite(!isFavorite)}
            >
              <Star className={`h-4 w-4 ${isFavorite ? 'fill-yellow-400 text-yellow-400' : ''}`} />
            </Button>
            <div className="hidden md:flex items-center gap-1">
              <Button variant="ghost" size="icon" className="h-5 w-5">
                <Plus className="h-3 w-3" />
              </Button>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Badge variant="outline" className="hidden md:flex gap-1">
              <Clock className="h-3 w-3" />
              {new Date(event.date).toLocaleString()}
            </Badge>
            <div className="text-sm text-muted-foreground">
              Editado {new Date(event.lastEdited).toLocaleDateString()}
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Cambiar fecha</DropdownMenuItem>
                <DropdownMenuItem>Cambiar ubicación</DropdownMenuItem>
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
            Ubicación: {event.location}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[1fr,16rem] gap-8">
          <div className="prose prose-sm max-w-none">
            <div className="whitespace-pre-wrap">
              {event.description}
            </div>
          </div>

          <aside className="space-y-6">
          {event.relatedNotes.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-3">Notas relacionadas</h3>
                <div className="grid gap-2">
                  {event.relatedNotes.map((note) => (
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

            {event.relatedTasks.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-3">Tareas relacionadas</h3>
                <div className="grid gap-2">
                  {event.relatedTasks.map((task) => (
                    <Card key={task.id} className="cursor-pointer hover:bg-accent">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-2">
                          {task.completed ? (
                            <CheckSquare className="h-4 w-4 text-green-500" />
                          ) : (
                            <Square className="h-4 w-4" />
                          )}
                          <span className="flex-1">{task.title}</span>
                        </div>
                        <div className="mt-1 text-xs text-muted-foreground">
                          Vence: {new Date(task.dueDate).toLocaleDateString()}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  <Button variant="outline" size="sm" className="w-full">
                    <Plus className="h-4 w-4 mr-2" />
                    Añadir tarea
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

export default EventDetailView;