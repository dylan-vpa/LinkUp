
"use client"
import React, { useState, FormEvent } from 'react';
import { Layout } from '@/components/Layout';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';


export default function CreateNoteView() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void  => {
    e.preventDefault();
    // Aquí iría la lógica para guardar la nota
    router.push('/dashboard/notes');
  };

  return (
    <Layout>
      <div className="container max-w-2xl mx-auto py-6">
        <div className="flex items-center mb-6">
          <h1 className="text-2xl font-bold ml-4">Nueva Nota</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            placeholder="Título de la nota"
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
          <Button type="submit" className="w-full">
            Crear Nota
          </Button>
        </form>
      </div>
    </Layout>
  );
};
