"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageSquare, X, Send, Image as ImageIcon } from "lucide-react";
import axios from "axios";
import { api } from "../api/api.js";
interface Message {
  idtext: number;
  text: string;
  sender: "user" | "bot";
  image?: string;
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [questionStep, setQuestionStep] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const toggleChat = () => setIsOpen(!isOpen);

  const sendConversationToAPI = async messages => {
    console.log("datos enviados:", messages);
    try {
      //const response = await ayuntamientoAPI.post(`mesadeatencion/dependences/`, messages);
      await axios.post(`http://127.0.0.1:8000/newChat/`, { messages });
      console.log("Conversación enviada exitosamente a la API");
    } catch (error) {
      console.error("Error al enviar la conversación a la API:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() || image) {
      const newMessage: Message = {
        idtext: Date.now(),
        text: input,
        sender: "user",
        image: image ? URL.createObjectURL(image) : undefined,
      };
      const updatedMessages = [...messages, newMessage];
      setMessages(updatedMessages);
      setInput("");
      setImage(null);

      // Manejar el flujo de preguntas
      setTimeout(async () => {
        let botResponse: Message;
        if (questionStep === 0) {
          botResponse = {
            idtext: Date.now() + 1,
            text: "¿Cuál es la dirección o ubicación del problema?",
            sender: "bot",
            image: null,
          };
          setQuestionStep(1);
        } else if (questionStep === 1) {
          botResponse = {
            idtext: Date.now() + 1,
            text: "¿A nombre de quién levantamos el reporte?",
            sender: "bot",
            image: null,
          };
          setQuestionStep(2);
        } else {
          botResponse = {
            idtext: Date.now() + 1,
            text: "Gracias por su reporte. Lo hemos registrado y será atendido a la brevedad.",
            sender: "bot",
            image: null,
          };
          setQuestionStep(0); // Reiniciar para futuros reportes
        }
        const finalMessages = [...updatedMessages, botResponse];
        setMessages(finalMessages);

        // Enviar la conversación completa a la API después de cada interacción
        await sendConversationToAPI(messages);
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
    if (isOpen && messages.length === 0) {
      const initialMessage: Message = {
        idtext: Date.now(),
        text: "¿Qué servicio público deseas reportar?",
        sender: "bot",
      };
      setMessages([initialMessage]);
    }
  }, [isOpen, messages]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Button onClick={toggleChat} className="rounded-full w-12 h-12 shadow-lg" aria-label={isOpen ? "Cerrar chat" : "Abrir chat"}>
        {isOpen ? <X className="h-6 w-6" /> : <MessageSquare className="h-6 w-6" />}
      </Button>

      {isOpen && (
        <div className="absolute bottom-16 right-0 w-80 sm:w-96 bg-background border rounded-lg shadow-xl">
          <div className="p-4 border-b">
            <h2 className="text-lg font-semibold">Chat de Soporte</h2>
          </div>
          <ScrollArea className="h-80 p-4">
            {messages.map(msg => (
              <div key={msg.idtext} className={`mb-4 ${msg.sender === "user" ? "text-right" : "text-left"}`}>
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
