"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageSquare, X, Send, Image as ImageIcon } from "lucide-react";

interface Message {
  id: number;
  text: string;
  sender: "user" | "bot";
  image?: string;
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const toggleChat = () => setIsOpen(!isOpen);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() || image) {
      const newMessage: Message = {
        id: Date.now(),
        text: input,
        sender: "user",
        image: image ? URL.createObjectURL(image) : undefined,
      };
      setMessages([...messages, newMessage]);
      console.log("enviar:", messages);
      setInput("");
      setImage(null);
      // Simular respuesta del bot
      setTimeout(() => {
        const botResponse: Message = {
          id: Date.now() + 1,
          text: "¡Gracias por tu mensaje! Tu reporte será procesado al departamento correspondiente.",
          sender: "bot",
        };
        setMessages(prevMessages => [...prevMessages, botResponse]);
      }, 1000);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
    }
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="fixed bottom-4 right-4 z-50 ">
      <Button onClick={toggleChat} className="rounded-full w-12 h-12 shadow-lg bg-green-500" aria-label={isOpen ? "Cerrar chat" : "Abrir chat"}>
        {isOpen ? <X className="h-6 w-6 " /> : <MessageSquare className="h-6 w-6" />}
      </Button>

      {isOpen && (
        <div className="absolute bottom-16 right-0 w-80 sm:w-96 bg-background border rounded-lg shadow-xl">
          <div className="p-4 border-b">
            <h2 className="text-lg font-semibold">Chat de reporte ciudadano</h2>
          </div>
          <ScrollArea className="h-80 p-4">
            {messages.map(msg => (
              <div key={msg.id} className={`mb-4 ${msg.sender === "user" ? "text-right" : "text-left"}`}>
                <div className={`inline-block p-2 rounded-lg ${msg.sender === "user" ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"}`}>
                  {msg.image && <img src={msg.image} alt="Imagen subida por el usuario" className="max-w-full h-auto rounded-lg mb-2" />}
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={chatEndRef} />
          </ScrollArea>
          <form onSubmit={handleSubmit} className="p-4 border-t">
            <div className="flex items-center space-x-2 mb-2">
              <Textarea value={input} onChange={e => setInput(e.target.value)} placeholder="Escribe tu mensaje..." className="flex-grow" />
              <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" ref={fileInputRef} />
              <Button type="button" variant="outline" size="icon" onClick={() => fileInputRef.current?.click()} aria-label="Subir imagen">
                <ImageIcon className="h-4 w-4" />
              </Button>
              <Button type="submit" size="icon" aria-label="Enviar mensaje">
                <Send className="h-4 w-4" />
              </Button>
            </div>
            {image && <div className="text-sm text-muted-foreground">Imagen seleccionada: {image.name}</div>}
          </form>
        </div>
      )}
    </div>
  );
}
