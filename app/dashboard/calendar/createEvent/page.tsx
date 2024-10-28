
"use client"
import React, { useState, FormEvent } from 'react';
import { Layout } from '@/components/Layout';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';


export default function CreateEventView() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [location, setLocation] = useState('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void  => {
    e.preventDefault();
    // Aquí iría la lógica para guardar el evento
    router.push('/dashboard/events');
  };

  return (
    <Layout>
      <div className="container max-w-2xl mx-auto py-6">
        <div className="flex items-center mb-6">
          <h1 className="text-2xl font-bold ml-4">Nuevo Evento</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            placeholder="Título del evento"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="text-xl"
          />
          <Textarea
            placeholder="Descripción"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="min-h-[200px]"
          />
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-muted-foreground">Inicio</label>
              <Input
                type="datetime-local"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm text-muted-foreground">Fin</label>
              <Input
                type="datetime-local"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
          </div>
          <Input
            placeholder="Ubicación"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <Button type="submit" className="w-full">
            Crear Evento
          </Button>
        </form>
      </div>
    </Layout>
  );
};
