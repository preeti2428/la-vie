import React, { useState, useRef, useEffect } from 'react';
import { MessageSquareCode, X, Send, Sparkles, Bot, User, PhoneCall, Globe, ArrowRight, Minimize2 } from 'lucide-react';
import { ChatMessage, Language } from '../types';

interface AIChatbotWidgetProps {
  isOpen: boolean;
  onToggle: () => void;
  onOpenBooking: () => void;
  currentLang: Language;
}

export const AIChatbotWidget: React.FC<AIChatbotWidgetProps> = ({
  isOpen,
  onToggle,
  onOpenBooking,
  currentLang,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-init',
      sender: 'bot',
      text: 'Grüezi! Ich bin der KI-Concierge von LA VIE Academy. Suchst du nach einer harmonischen Feng Shui Beratung für dein Zuhause oder photorealistischem 3D Virtual Staging für eine Immobilie?',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      options: [
        { label: '🛋️ Feng Shui Beratung', action: 'Ich interessiere mich für eine Feng Shui Raumberatung.' },
        { label: '🏙️ 3D Virtual Staging', action: 'Ich benötige 3D Virtual Staging für eine Immobilie.' },
        { label: '📞 Call a Designer (€199)', action: 'Ich möchte den 1-Stunden Call a Designer buchen.' },
        { label: '💶 Preise & Ablauf', action: 'Wie hoch sind die Kosten und wie ist der Ablauf?' },
      ],
    },
  ]);

  const [inputMsg, setInputMsg] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isOpen]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || inputMsg;
    if (!text.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputMsg('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMsg].map((m) => ({
            role: m.sender === 'user' ? 'user' : 'assistant',
            content: m.text,
          })),
        }),
      });

      const data = await response.json();

      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: data.reply || 'Danke für deine Nachricht! Wie kann ich dir weiterhelfen?',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, botMsg]);

      if (data.action === 'SHOW_BOOKING') {
        setTimeout(() => {
          onOpenBooking();
        }, 1200);
      }
    } catch (err) {
      console.error('Chat error:', err);
      setMessages((prev) => [
        ...prev,
        {
          id: `bot-err-${Date.now()}`,
          sender: 'bot',
          text: 'Vielen Dank für deine Anfrage. Du kannst direkt das 1-Stunden "Call a Designer" Format mit Cornelia Schmid buchen.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Trigger Button (When closed) */}
      {!isOpen && (
        <button
          onClick={onToggle}
          className="fixed bottom-6 right-6 z-50 p-4 rounded-full bg-[#7D8471] text-white shadow-2xl hover:scale-105 transition-all duration-300 border border-[#2D2926]/10 flex items-center gap-3 group"
          title="LA VIE Assistant öffnen"
        >
          <div className="relative">
            <Bot className="w-6 h-6 text-white group-hover:rotate-12 transition-transform" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-[#7D8471]" />
          </div>
          <span className="hidden sm:inline text-xs font-medium uppercase tracking-widest pr-1">
            LA VIE Assistant
          </span>
        </button>
      )}

      {/* Floating Chat Modal Box */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-full max-w-md bg-white rounded-3xl shadow-2xl border border-[#2D2926]/10 flex flex-col h-[560px] overflow-hidden animate-slide-up">
          
          {/* Header */}
          <div className="bg-[#2D2926] text-[#F7F5F2] p-4 flex items-center justify-between border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="relative w-9 h-9 rounded-full bg-[#7D8471] border border-white/20 flex items-center justify-center font-serif text-sm font-light text-white">
                LV
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-[#2D2926]" />
              </div>
              <div>
                <div className="font-serif text-sm font-light tracking-wide flex items-center gap-1.5">
                  LA VIE Assistant
                  <Sparkles className="w-3.5 h-3.5 text-[#7D8471]" />
                </div>
                <div className="text-[10px] uppercase tracking-wider text-[#DCD7D0]/70">KI-Concierge • Cornelia Schmid</div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={onOpenBooking}
                className="px-2.5 py-1 rounded-full bg-[#7D8471] hover:bg-[#6C7360] text-white text-[10px] font-medium uppercase tracking-wider flex items-center gap-1"
              >
                <PhoneCall className="w-3 h-3" />
                <span>Call €199</span>
              </button>

              <button
                onClick={onToggle}
                className="p-1.5 rounded-full text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-[#F7F5F2]">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-sm ${
                    msg.sender === 'user'
                      ? 'bg-[#2D2926] text-[#F7F5F2] rounded-br-none font-light'
                      : 'bg-white text-[#2D2926] border border-[#2D2926]/10 rounded-bl-none font-light'
                  }`}
                >
                  <p className="whitespace-pre-line">{msg.text}</p>
                  
                  <span className="block text-[10px] opacity-60 mt-1 text-right">
                    {msg.timestamp}
                  </span>
                </div>

                {/* Option Pills */}
                {msg.options && (
                  <div className="mt-2.5 flex flex-wrap gap-1.5 max-w-[90%]">
                    {msg.options.map((opt, i) => (
                      <button
                        key={i}
                        onClick={() => handleSendMessage(opt.action)}
                        className="px-3 py-1.5 rounded-full bg-white hover:bg-[#7D8471] hover:text-white text-[#2D2926] text-xs font-medium border border-[#2D2926]/10 shadow-sm transition-all"
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {isLoading && (
              <div className="flex items-center gap-2 text-xs text-[#2D2926]/70 bg-white p-3 rounded-2xl w-max border border-[#2D2926]/10 font-light">
                <Sparkles className="w-4 h-4 text-[#7D8471] animate-spin" />
                <span>LA VIE Assistant antwortet...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Bar */}
          <div className="p-3 bg-white border-t border-[#2D2926]/10 flex items-center gap-2">
            <input
              type="text"
              value={inputMsg}
              onChange={(e) => setInputMsg(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Schreibe eine Nachricht..."
              className="flex-1 px-4 py-2.5 rounded-full bg-[#F7F5F2] border border-[#2D2926]/10 text-xs sm:text-sm text-[#2D2926] focus:outline-none focus:ring-2 focus:ring-[#7D8471]"
            />

            <button
              onClick={() => handleSendMessage()}
              disabled={!inputMsg.trim() || isLoading}
              className="p-3 rounded-full bg-[#7D8471] text-white hover:bg-[#6C7360] disabled:opacity-50 transition-colors shadow-sm"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>

        </div>
      )}
    </>
  );
};
