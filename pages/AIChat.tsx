import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
// FIX: Replaced non-existent BookmarkSquareIcon with existing BookmarkIcon as suggested by the error message.
import { ChevronLeftIcon, BookmarkIcon } from '../components/Icons';
import { GoogleGenAI, Chat } from '@google/genai';
import { usePlan } from '../context/PlanContext';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'ai';
  timestamp: string;
}

const systemInstruction = `Você é uma nutricionista virtual especialista chamada 'Nutri.IA'. Sua missão é ajudar pessoas que passaram por cirurgia bariátrica e sofreram reganho de peso a emagrecer com saúde em 21 dias.
Seu método é um plano completo Low Carb, interativo e sem mensalidade.
Seja sempre amigável, motivadora e profissional.
Responda em português do Brasil.
Quando pedirem receitas ou um plano, forneça respostas claras e bem formatadas.
Exemplo de receita:
**Nome da Receita**
*Ingredientes:*
- 1 xícara de...
- 2 colheres de...
*Modo de Preparo:*
1. Faça isso...
2. Depois aquilo...
Não use markdown de cabeçalho (#). Use negrito (**) para títulos.`;

const AIChat: React.FC = () => {
  const navigate = useNavigate();
  const { addPlan } = usePlan();
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: 'Olá! Sou a Nutri.IA, sua assistente de nutrição. Como posso montar seu plano low-carb hoje?', sender: 'ai', timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [chat, setChat] = useState<Chat | null>(null);

  const messagesEndRef = useRef<null | HTMLDivElement>(null);
  const inputRef = useRef<null | HTMLInputElement>(null);

  useEffect(() => {
    const initChat = () => {
      try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
        const chatInstance = ai.chats.create({
          model: 'gemini-2.5-flash',
          config: { systemInstruction },
        });
        setChat(chatInstance);
      } catch (error) {
        console.error("Erro ao inicializar a I.A.:", error);
        setMessages((prev) => [...prev, {id: Date.now(), text: "Desculpe, não consegui me conectar. Verifique a configuração da API.", sender: 'ai', timestamp: ''}]);
      }
    };
    initChat();
  }, []);
  

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() === '' || !chat || isTyping) return;

    const userMessage: Message = {
      id: Date.now(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    const aiMessageId = Date.now() + 1;
    const aiMessageTimestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    setMessages((prev) => [
      ...prev,
      { id: aiMessageId, text: '', sender: 'ai', timestamp: aiMessageTimestamp },
    ]);

    try {
      const responseStream = await chat.sendMessageStream({ message: inputValue });
      
      let fullText = '';
      for await (const chunk of responseStream) {
        fullText += chunk.text;
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === aiMessageId ? { ...msg, text: fullText } : msg
          )
        );
      }
    } catch (error) {
       console.error("Erro ao enviar mensagem:", error);
       setMessages((prev) =>
          prev.map((msg) =>
            msg.id === aiMessageId ? { ...msg, text: "Ocorreu um erro ao processar sua solicitação." } : msg
          )
        );
    } finally {
        setIsTyping(false);
    }
  };

  const handleSavePlan = (text: string) => {
    addPlan(text);
  };

  return (
    <div className="flex flex-col h-full bg-brand-dark">
      <header className="px-4 pt-8 flex items-center gap-4 bg-brand-dark sticky top-0 z-10 pb-4 border-b border-brand-gray-1">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2 text-white">
          <ChevronLeftIcon className="w-6 h-6" />
        </button>
        <img src="https://i.pravatar.cc/150?u=ai-nutri" alt="Nutri.IA" className="w-10 h-10 rounded-full" />
        <div>
            <h1 className="text-lg font-bold text-white">Assistente I.A.</h1>
            <p className="text-xs text-brand-green">Online</p>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex flex-col ${message.sender === 'user' ? 'items-end' : 'items-start'}`}
          >
            <div
              className={`max-w-[80%] p-3 rounded-2xl relative group ${
                message.sender === 'user'
                  ? 'bg-brand-green text-black rounded-br-none'
                  : 'bg-brand-gray-1 text-white rounded-bl-none'
              }`}
            >
              <p className="text-sm whitespace-pre-wrap">{message.text}</p>
              {message.sender === 'ai' && message.text && (
                <button 
                  onClick={() => handleSavePlan(message.text)}
                  className="absolute -top-2 -right-2 p-1 bg-brand-gray-3 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity"
                  aria-label="Salvar no plano"
                >
                  <BookmarkIcon className="w-5 h-5"/>
                </button>
              )}
            </div>
            <p className="text-xs text-brand-text-secondary mt-1 px-1">{message.timestamp}</p>
          </div>
        ))}

        {isTyping && (
           <div className="flex items-start">
            <div className="bg-brand-gray-1 text-white rounded-bl-none rounded-2xl p-3 inline-flex items-center gap-1.5">
                <span className="w-2 h-2 bg-brand-text-secondary rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                <span className="w-2 h-2 bg-brand-text-secondary rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                <span className="w-2 h-2 bg-brand-text-secondary rounded-full animate-bounce"></span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 bg-brand-dark sticky bottom-0 border-t border-brand-gray-1">
        <form onSubmit={handleSendMessage} className="flex items-center bg-brand-gray-1 rounded-full p-1">
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Digite uma mensagem..."
            className="flex-1 bg-transparent px-3 text-white placeholder-brand-text-secondary focus:outline-none"
            aria-label="Chat message input"
          />
          <button
            type="submit"
            className="bg-brand-green rounded-full w-10 h-10 flex items-center justify-center shrink-0 disabled:bg-brand-gray-3 transition-colors"
            disabled={!inputValue.trim() || isTyping}
            aria-label="Send message"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-black">
              <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
};

export default AIChat;