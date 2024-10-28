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
  MapPin,
  Square,
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

const NoteDetailView = () => {
  const [isFavorite, setIsFavorite] = useState(true);
  const [title, setTitle] = useState("Proyecto de Marketing Q4");
  
  const note = {
    category: "Trabajo",
    tags: ["marketing", "Q4", "estrategia"],
    lastEdited: "2024-02-20",
    relatedTasks: [
      { id: 1, title: "Reunión con equipo creativo", completed: false, dueDate: "2024-03-01" },
      { id: 2, title: "Definir timeline", completed: false, dueDate: "2024-03-05" },
      { id: 3, title: "Aprobar presupuestos", completed: false, dueDate: "2024-03-10" }
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
        title: "Presentación de Estrategia",
        date: "2024-03-15T14:00:00",
        location: "Sala de juntas"
      }
    ],
    content: `
# Objetivos Q4 2024

## Objetivos Principales
- Aumentar engagement en redes sociales en un 25%
- Lanzar nueva campaña de marca
- Optimizar funnel de conversión

## Estrategias
1. Content Marketing
   - Crear calendario editorial
   - Definir pilares de contenido
   - Establecer KPIs

2. Social Media
   - Análisis de competencia
   - Definir tone of voice
   - Planificar contenido viral

## Presupuesto
- Paid Media: $10,000
- Influencer Marketing: $5,000
- Content Creation: $3,000

## Próximos Pasos
- [ ] Reunión con equipo creativo
- [ ] Definir timeline
- [ ] Aprobar presupuestos
    `
  };

  return (
    <Layout>
      {/* Header */}
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
            <div className="md:flex items-center gap-1 hidden">
              {note.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
              <Button variant="ghost" size="icon" className="h-5 w-5">
                <Plus className="h-3 w-3" />
              </Button>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="text-sm text-muted-foreground">
              Editado {new Date(note.lastEdited).toLocaleDateString()}
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Exportar</DropdownMenuItem>
                <DropdownMenuItem>Duplicar</DropdownMenuItem>
                <DropdownMenuItem className="text-destructive">
                  Eliminar
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="container max-w-4xl mx-auto py-6">
  <div className="mb-8">
    <Input
      value={title}
      onChange={(e) => setTitle(e.target.value)}
      className="text-3xl font-bold border-none px-0 focus-visible:ring-0"
    />
  </div>

  <div className="grid grid-cols-1 md:grid-cols-[1fr,16rem] gap-8">
    <div className="prose prose-sm max-w-none">
      <div className="whitespace-pre-wrap">
        {note.content}
      </div>
    </div>

    <aside className="space-y-6">
      {note.relatedTasks.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-3">Tareas relacionadas</h3>
          <div className="grid gap-2">
            {note.relatedTasks.map((task) => (
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

      {note.relatedEvents.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-3">Eventos relacionados</h3>
          <div className="grid gap-2">
            {note.relatedEvents.map((event) => (
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

export default NoteDetailView;