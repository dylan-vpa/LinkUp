"use client"

import React, { useState } from 'react';
import { Search, Plus, Filter, MoreVertical, ChevronDown, ArrowUp, ArrowDown, Clock, Circle, Grid, List as ListIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Layout } from '@/components/Layout';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const priorities = {
  High: <ArrowUp className="w-4 h-4 text-red-500" />,
  Medium: <ArrowDown className="w-4 h-4 text-yellow-500" />,
  Low: <ArrowDown className="w-4 h-4 text-blue-500" />,
};

const statusIcons = {
  "In Progress": <Clock className="w-4 h-4 text-yellow-500" />,
  "Todo": <Circle className="w-4 h-4 text-gray-500" />,
  "Done": <Circle className="w-4 h-4 text-green-500" />,
  "Backlog": <Circle className="w-4 h-4 text-blue-500" />,
  "Canceled": <Circle className="w-4 h-4 text-red-500" />,
};

export default function TasksView() {
  const [tasks] = useState([
    {
      id: "TASK-8782",
      title: "You can't compress the program without quantifying the open-source SSD...",
      type: "Documentation",
      status: "In Progress",
      priority: "Medium"
    },
  ]);
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <Layout>
      {/* Header con filtros */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4 w-full">
          <div className="relative flex-1 md:flex-initial">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Filtrar tareas..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Estado" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="in-progress">En Progreso</SelectItem>
              <SelectItem value="todo">Por Hacer</SelectItem>
              <SelectItem value="done">Completado</SelectItem>
              <SelectItem value="backlog">Backlog</SelectItem>
              <SelectItem value="canceled">Cancelado</SelectItem>
            </SelectContent>
          </Select>
          <Select value={priorityFilter} onValueChange={setPriorityFilter}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Prioridad" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas</SelectItem>
              <SelectItem value="high">Alta</SelectItem>
              <SelectItem value="medium">Media</SelectItem>
              <SelectItem value="low">Baja</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Lista de tareas */}
      <Card className="flex-1">
        <CardContent className="p-0">
          <div className="divide-y">
            {tasks.map((task) => (
              <div key={task.id} className="flex items-center p-4 hover:bg-accent/50">
                <input type="checkbox" className="mr-4" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-muted-foreground">
                      {task.id}
                    </span>
                    <span className="px-2 py-1 text-xs rounded-full bg-accent">
                      {task.type}
                    </span>
                  </div>
                  <p className="text-sm mt-1 truncate">{task.title}</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <span className="text-sm">{task.status}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm">{task.priority}</span>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Edit</DropdownMenuItem>
                      <DropdownMenuItem>Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 border-t flex items-center justify-between text-sm text-muted-foreground">
            <span>0 de 100 fila(s) seleccionada(s)</span>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span>Filas por página</span>
                <Button variant="ghost" size="sm">
                  10 <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </div>
              <span>Página 1 de 10</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Layout>
  );
}