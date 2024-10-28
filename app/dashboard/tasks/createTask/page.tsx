"use client"
import React, { useState, FormEvent } from 'react';
import { Layout } from '@/components/Layout';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function CreateTaskView() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void  => {
    e.preventDefault();
    // Aquí iría la lógica para guardar la tarea
    router.push('/dashboard/tasks');
  };

  return (
    <Layout>
      <div className="container max-w-2xl mx-auto py-6">
        <div className="flex items-center mb-6">
          <h1 className="text-2xl font-bold ml-4">Nueva Tarea</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            placeholder="Título de la tarea"
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
          <Input
            placeholder="Etiquetas (separadas por comas)"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />
          <Input
            type="date"
            placeholder="Fecha de vencimiento"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
          <Button type="submit" className="w-full">
            Crear Tarea
          </Button>
        </form>
      </div>
    </Layout>
  );
};
