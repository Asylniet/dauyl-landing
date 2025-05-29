'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  Check,
  CheckCheck,
  ChevronLeft,
  UserRoundIcon,
  VideoIcon,
  PhoneIcon, PlusIcon, CameraIcon, MicIcon,
} from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';

interface Message {
  id: number;
  text: React.ReactNode;
  sender: 'user' | 'contact';
  time: string;
  status: 'sent' | 'delivered' | 'read';
}

interface Phase {
  id: number;
  title: string;
  description: string;
  messages: Message[];
}

const phases: Phase[] = [
  {
    id: 1,
    title: 'Сообщение об оформлении заказа',
    description:
      'Как только клиент оформил заказ в каспи магазине, он получает сообщение на WhatsApp от вашего номера',
    messages: [
      {
        id: 1,
        text: <span>Добрый день, Шерхан! Спасибо за заказ в нашем МАГАЗИНЕ КАСПИ. Я - Диана, ваш менеджер <br />
Вы заказали: Велосипед <br />
Плановая дата доставки в Postamat: 03.05.2025
</span>,
        sender: 'user',
        time: '10:30',
        status: 'read',
      },
      {
        id: 2,
        text: <span>Добрый день, Диана!  <br />
            Спасибо, жду.</span>,
        sender: 'contact',
        time: '10:32',
        status: 'read',
      },
    ],
  },
  {
    id: 2,
    title: 'Сообщение о доставке',
    description: 'Сообщение о доставке в постомат со ссылкой для слежки',
    messages: [
      {
        id: 3,
        text: <span>Добрый вечер, Шерхан! Это Диана 😊 <br />

Ваш заказ передан в доставку. <br />
            Следите за ним тут: <span
            className="text-blue-600">https://shop.kaspi.kz/ords/f?p=104:1:::::P1_EXT_GUID. </span><br />
<br />
Курьер позвонит перед приездом — держите телефон рядом. <br />
Если будут вопросы, звоните на 9999, всё решим! <br />
<br />
            Хорошего дня!</span>,
        sender: 'user',
        time: '10:35',
        status: 'read',
      },
      {
        id: 4,
        text: 'Рахмет, жду. классный сервис 🔥',
        sender: 'contact',
        time: '10:36',
        status: 'read',
      },
    ],
  },
  {
    id: 3,
    title: 'Фильтр негативного отзыва',
    description: 'Сначала спрашиваем понравилось ли все, если нет - негатив остается в чате, где его можно обработать',
    messages: [
      {
        id: 6,
        text: <span>Доброе утро, Шерхан! 😊 <br />
Диана из МАГАЗИНА КАСПИ на связи. <br />
<br />
Уже получили заказ? Как вам велосипед? <br />
            Буду рада, если поделитесь впечатлениями — это очень помогает нам!</span>,
        sender: 'user',
        time: '10:40',
        status: 'read',
      },
      {
        id: 7,
        text: 'Рақмет Диана, сыну очень понравилось',
        sender: 'contact',
        time: '10:41',
        status: 'read',
      },
    ],
  },
  {
    id: 4,
    title: 'Отправляем ссылку для отзыва',
    description: 'Ссылка сразу же ведет на страницу оценки уже с 5 звездами именно этого товара',
    messages: [
      {
        id: 9,
        text: <span>Доброе утро, Шерхан! <br />
<br />
Огромное спасибо за ваш отзыв! 🥳 Это правда вдохновляет. <br />
Вы заказали: Велосипед. <br />
<br />
Если найдётся минутка, оставьте, пожалуйста, пару слов тут: <br />
<span
  className="text-blue-600">https://kaspi.kz/shop/review/productreview?orderCode=542287042&productCode=122100137&rating=5</span><br />
Каждое ваше мнение помогает нам расти! <br />
<br />
— Диана, МАГАЗИН КАСПИ</span>,
        sender: 'user',
        time: '10:45',
        status: 'read',
      },
      {
        id: 10,
        text: 'Обязательно поставлю 5 звезд 🔥',
        sender: 'contact',
        time: '10:46',
        status: 'read',
      },
    ],
  },
];

type WhatsAppScrollChatProps = {
  contactName?: string;
};

export default function WhatsAppScrollChat({ contactName = 'Покупатель' }: WhatsAppScrollChatProps) {
  const [currentPhase, setCurrentPhase] = useState(0);
  const [visibleMessages, setVisibleMessages] = useState<Message[]>([]);
  const [_, setScrollProgress] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const stickyContainerRef = useRef<HTMLDivElement>(null);
  
  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  };
  
  useEffect(() => {
    const handleScroll = () => {
      if (!stickyContainerRef.current) return;
      
      const stickyContainer = stickyContainerRef.current;
      const rect = stickyContainer.getBoundingClientRect();
      const containerHeight = stickyContainer.offsetHeight;
      const viewportHeight = window.innerHeight;
      
      // Calculate if we're in the sticky zone
      const stickyStart = rect.top <= 0;
      const stickyEnd = rect.bottom <= viewportHeight;
      
      if (stickyStart && !stickyEnd) {
        // We're in the sticky zone - calculate progress
        const scrollableHeight = containerHeight - viewportHeight;
        const scrolled = Math.abs(rect.top);
        const progress = Math.min(scrolled / scrollableHeight, 1);
        setScrollProgress(progress);
        
        // Calculate current phase based on progress
        const phaseProgress = progress * (phases.length - 1);
        const newPhase = Math.min(Math.floor(phaseProgress), phases.length - 1);
        setCurrentPhase(newPhase);
        
        // Calculate visible messages based on progress
        const totalMessages = phases.reduce((acc, phase) => acc + phase.messages.length, 0);
        const visibleMessageCount = Math.floor(progress * totalMessages);
        
        const messages: Message[] = [];
        let messageCount = 0;
        
        for (const phase of phases) {
          for (const message of phase.messages) {
            if (messageCount < visibleMessageCount) {
              messages.push(message);
              messageCount++;
            } else {
              break;
            }
          }
          if (messageCount >= visibleMessageCount) break;
        }
        
        setVisibleMessages(messages);
      } else if (stickyEnd) {
        // We've scrolled past the sticky zone - show all messages
        setScrollProgress(1);
        setCurrentPhase(phases.length - 1);
        const allMessages = phases.flatMap((phase) => phase.messages);
        setVisibleMessages(allMessages);
      } else {
        // We haven't reached the sticky zone yet
        setScrollProgress(0);
        setCurrentPhase(0);
        setVisibleMessages([]);
      }
    };
    
    handleScroll(); // Initial call
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  useEffect(() => {
    scrollToBottom();
  }, [visibleMessages]);
  
  const MessageStatus = ({ status }: { status: 'sent' | 'delivered' | 'read' }) => {
    if (status === 'sent') {
      return <Check className="w-4 h-4 text-gray-400" />;
    } else if (status === 'delivered') {
      return <CheckCheck className="w-4 h-4 text-gray-400" />;
    } else {
      return <CheckCheck className="w-4 h-4 text-blue-500" />;
    }
  };
  
  return (
    <div className="bg-secondary pt-4">
      <h1 className="text-2xl font-bold text-center py-2 md:hidden">
        Как это работает?
      </h1>
      {/* Sticky Chat Section - This creates the scrollable area */}
      <div ref={stickyContainerRef} className="h-[300vh] relative">
        <div className="sticky top-8 h-[95vh] bg-secondary pt-8 md:py-8">
          <div className="relative container mx-auto px-2 sm:px-6 h-full max-md:pb-24">
            <div
              className="block md:hidden absolute bottom-0 left-0 w-full py-2 px-2 sm:px-8 min-h-20 bg-gradient-to-t from-secondary z-10"
            >
              <div className="font-bold text-xl">
                {phases[currentPhase].title}
              </div>
              <span>
                {phases[currentPhase].description}
              </span>
            </div>
            <div className="max-w-7xl mx-auto h-full">
              <div className="flex gap-8 h-full">
                {/* Left Pane - Phase Descriptions */}
                <div className="hidden md:block min-w-72 w-1/3 bg-background rounded-lg shadow-lg p-6 overflow-y-auto">
                  <h2 className="text-2xl font-bold mb-6">Как это работает?</h2>
                  <div className="space-y-6">
                    {phases.map((phase, index) => (
                      <div
                        key={phase.id}
                        className={`p-4 rounded-lg border-2 transition-all duration-300 ${
                          index === currentPhase
                            ? 'border-green-500 bg-green-50 text-black'
                            : index < currentPhase
                              ? 'border-secondary bg-secondary'
                              : 'border-secondary bg-background opacity-50'
                        }`}
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <div
                            className={`w-3 h-3 rounded-full ${index <= currentPhase ? 'bg-green-500' : 'bg-secondary'}`}
                          />
                          <h3 className="font-semibold">{phase.title}</h3>
                        </div>
                        <p className="text-sm">{phase.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
                {/* Right Pane - WhatsApp Chat */}
                <div
                  className="flex-1 bg-[#E5DDD5] dark:bg-[#0A0A0A] rounded-lg shadow-lg overflow-hidden flex flex-col">
                  {/* WhatsApp Header */}
                  <div
                    className="sticky top-0 left-0 bg-secondary/95 dark:bg-secondary/70 px-0.5 py-2 z-10 flex items-center">
                    <ChevronLeft className="w-6 h-6" />
                    <div
                      className="ml-3 w-9 h-9 rounded-full bg-gray-400 flex items-center justify-center text-white font-bold">
                      <UserRoundIcon className="w-6 h-6" />
                    </div>
                    <div className="ml-3">
                      <div className="font-semibold">
                        {contactName}
                      </div>
                    </div>
                    <VideoIcon strokeWidth={1.5} className="w-6 h-6 ml-auto" />
                    <PhoneIcon className="w-5 h-5 ml-3 mr-2" />
                  </div>
                  
                  {/* Chat Messages */}
                  <div
                    ref={chatContainerRef}
                    className="flex-1 p-4 space-y-3 overflow-hidden no-scrollbar"
                  >
                    <AnimatePresence initial={false}>
                      {visibleMessages.length === 0 ? (
                        <div className="flex items-center justify-center h-full">
                          <p className="text-center">Листайте вниз, чтобы увидеть сообщения</p>
                        </div>
                      ) : (
                        visibleMessages.map((message) => (
                          <motion.div
                            key={message.id}
                            initial={{
                              opacity: 0,
                              height: 0,
                              marginBottom: 0,
                              x: message.sender === 'user' ? 100 : -100,
                            }}
                            animate={{ opacity: 1, height: 'auto', marginBottom: 8, x: 0 }}
                            exit={{
                              opacity: 0,
                            }}
                            transition={{ duration: 0.3 }}
                            className={`flex overflow-hidden ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                          >
                            <div
                              className={`max-w-[95%] sm:max-w-[80%] lg:max-w-md px-4 py-2 rounded-lg ${
                                message.sender === 'user' ? 'bg-whatsapp' : 'bg-secondary'
                              }`}
                            >
                              <p className="text-sm">{message.text}</p>
                              <div className="flex items-center justify-end gap-1 mt-1">
                              <span
                                className="text-xs text-gray-500"
                              >
                                {message.time}
                              </span>
                                {message.sender === 'user' && <MessageStatus status={message.status} />}
                              </div>
                            </div>
                          </motion.div>
                        ))
                      )}
                    </AnimatePresence>
                    <div ref={messagesEndRef} />
                  </div>
                  
                  {/* Chat Input */}
                  <div
                    className="p-2 flex items-center sticky bottom-0 left-0 bg-secondary/95 dark:bg-secondary/70 backdrop-blur">
                    <PlusIcon className="w-5 h-5 mx-1" />
                    <div className="flex-1 bg-background rounded-full px-4 py-3"></div>
                    <CameraIcon className="w-5 h-5 mx-1" />
                    <MicIcon className="w-5 h-5 mx-1" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
