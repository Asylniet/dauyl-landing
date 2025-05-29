'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  CameraIcon,
  Check,
  CheckCheck,
  ChevronLeft,
  Clock, MicIcon,
  PhoneIcon,
  PlusIcon,
  UserRoundIcon,
  VideoIcon,
} from 'lucide-react';

export interface Message {
  id: number;
  text: React.ReactNode;
  sender: 'user' | 'other';
  name?: string;
  timestamp: string;
  date: Date | string;
}

interface WhatsAppChatProps {
  messages: Message[];
  animationSpeed?: number; // Speed multiplier (higher = faster)
  contactName: string;
}

const formatMessageDate = (date: Date | string): string => {
  const messageDate = typeof date === 'string' ? new Date(date) : date;
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  
  if (messageDate.toDateString() === today.toDateString()) {
    return 'Сегодня';
  } else if (messageDate.toDateString() === yesterday.toDateString()) {
    return 'Вчера';
  } else {
    return messageDate.toLocaleDateString('ru-RU', {
      month: 'short',
      day: 'numeric',
      year: messageDate.getFullYear() !== today.getFullYear() ? 'numeric' : undefined,
    });
  }
};

const groupMessagesByDate = (messages: Message[]) => {
  const groups: { date: string; messages: Message[] }[] = [];
  
  messages.forEach((message) => {
    const dateStr = formatMessageDate(message.date);
    const existingGroup = groups.find((group) => group.date === dateStr);
    
    if (existingGroup) {
      existingGroup.messages.push(message);
    } else {
      groups.push({ date: dateStr, messages: [message] });
    }
  });
  
  return groups;
};

export default function WhatsAppChat({ messages, animationSpeed = 1, contactName }: WhatsAppChatProps) {
  const [visibleMessages, setVisibleMessages] = useState<Message[]>([]);
  const [typingUser, setTypingUser] = useState<string | null>(null);
  const [messageStatus, setMessageStatus] = useState<Record<number, 'sending' | 'sent' | 'delivered' | 'read'>>({});
  const chatContainerRef = useRef<HTMLDivElement>(null);
  
  // Smooth scroll to bottom
  const scrollToBottom = useCallback((smooth = true) => {
    if (chatContainerRef.current) {
      const scrollOptions = smooth ? { behavior: 'smooth' as const } : undefined;
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        ...scrollOptions,
      });
    }
  }, [chatContainerRef]);
  
  useEffect(() => {
    setVisibleMessages([]);
    setTypingUser(null);
    setMessageStatus({});
    
    const timeouts: NodeJS.Timeout[] = [];
    const baseDelay = 1000 / animationSpeed;
    
    messages.forEach((message, index) => {
      const typingTimeout = setTimeout(() => {
        setTypingUser(message.sender === 'user' ? 'Dauyl bot' : message.name || contactName);
      }, index * baseDelay * 3);
      
      const messageTimeout = setTimeout(() => {
        setVisibleMessages((prev) => [...prev, message]);
        setTypingUser(null);
        
        if (message.sender === 'user') {
          setMessageStatus((prev) => ({ ...prev, [message.id]: 'sending' }));
          timeouts.push(setTimeout(() => setMessageStatus((prev) => ({ ...prev, [message.id]: 'sent' })), 500));
          timeouts.push(setTimeout(() => setMessageStatus((prev) => ({ ...prev, [message.id]: 'delivered' })), 1000));
          timeouts.push(setTimeout(() => setMessageStatus((prev) => ({ ...prev, [message.id]: 'read' })), 1500));
        }
      }, index * baseDelay * 3 + baseDelay * 2);
      
      timeouts.push(typingTimeout, messageTimeout);
    });
    
    timeouts.push(setTimeout(() => scrollToBottom(false), 50));
    
    return () => {
      timeouts.forEach(clearTimeout);
    };
  }, [messages, animationSpeed, contactName, scrollToBottom]);
  
  const messageGroups = groupMessagesByDate(visibleMessages);
  
  return (
    <section className="border rounded-xl overflow-hidden">
      <div className="flex flex-col bg-[#E5DDD5] dark:bg-[#0A0A0A] h-[700px] shadow-lg overflow-y-auto">
        {/* WhatsApp header */}
        <div className="sticky top-0 left-0 bg-secondary/95 backdrop-blur px-0.5 py-2 z-10 flex items-center">
          <ChevronLeft className="w-6 h-6" />
          <div className="ml-3 w-9 h-9 rounded-full bg-gray-400 flex items-center justify-center text-white font-bold">
            <UserRoundIcon className="w-6 h-6" />
          </div>
          <div className="ml-3">
            <div className="font-semibold">
              {messages.length > 0 && contactName}
            </div>
            <div className="text-xs opacity-80">{typingUser ? `${typingUser} печатает...` : 'online'}</div>
          </div>
          <VideoIcon strokeWidth={1.5} className="w-6 h-6 ml-auto" />
          <PhoneIcon className="w-5 h-5 ml-3 mr-2" />
        </div>
        
        {/* Chat area */}
        {/* Chat area with absolute positioning for stability */}
        <div className="flex-1 p-3 relative overflow-hidden">
          <div className="absolute inset-0 overflow-y-auto scroll-smooth no-scrollbar" ref={chatContainerRef}>
            <div className="min-h-full flex flex-col justify-end space-y-2 p-2">
              <AnimatePresence initial={false}>
                {messageGroups.map((group) => (
                  <React.Fragment key={group.date}>
                    <motion.div
                      layout
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className="flex justify-center my-3"
                    >
                      <div
                        className="bg-secondary px-3 py-1 rounded-full text-xs font-medium text-secondary-foreground shadow-sm">
                        {group.date}
                      </div>
                    </motion.div>
                    
                    {group.messages.map((message) => (
                      <motion.div
                        layout
                        key={message.id}
                        initial={{ opacity: 0, height: 0, marginBottom: 0, x: message.sender === 'user' ? 100 : -100 }}
                        animate={{ opacity: 1, height: 'auto', marginBottom: 8, x: 0 }}
                        transition={{ duration: 0.3 }}
                        onUpdate={() => scrollToBottom(true)}
                        className={`flex overflow-hidden ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-[80%] rounded-lg p-2 px-3 ${
                            message.sender === 'user' ? 'bg-whatsapp' : 'bg-secondary'
                          }`}
                        >
                          {message.sender === 'other' && message.name && (
                            <div className="text-xs font-medium text-primary">{message.name}</div>
                          )}
                          <div className="text-sm">{message.text}</div>
                          <div className="text-xs text-gray-500 flex justify-end items-center mt-1">
                            {message.timestamp}
                            {message.sender === 'user' && (
                              <span className="ml-1">
                              {messageStatus[message.id] === 'sending' && <Clock size={12} />}
                                {messageStatus[message.id] === 'sent' && <Check size={12} />}
                                {messageStatus[message.id] === 'delivered' && <CheckCheck size={14} />}
                                {messageStatus[message.id] === 'read' &&
                                  <CheckCheck size={14} className="text-blue-500" />}
                            </span>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </React.Fragment>
                ))}
              </AnimatePresence>
              
              {/* Typing indicator with fixed height */}
              <AnimatePresence>
                {typingUser && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    onAnimationComplete={() => scrollToBottom(true)}
                    className={`flex ${typingUser === 'Dauyl bot' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`rounded-lg p-2 px-3 ${typingUser === 'Dauyl bot' ? 'bg-whatsapp' : 'bg-secondary'}`}
                    >
                      <div className="flex space-x-1">
                        <motion.div
                          animate={{ y: [0, -5, 0] }}
                          transition={{ repeat: Number.POSITIVE_INFINITY, duration: 0.8, delay: 0 }}
                          className="w-1.5 h-1.5 bg-gray-400 rounded-full"
                        />
                        <motion.div
                          animate={{ y: [0, -5, 0] }}
                          transition={{ repeat: Number.POSITIVE_INFINITY, duration: 0.8, delay: 0.2 }}
                          className="w-1.5 h-1.5 bg-gray-400 rounded-full"
                        />
                        <motion.div
                          animate={{ y: [0, -5, 0] }}
                          transition={{ repeat: Number.POSITIVE_INFINITY, duration: 0.8, delay: 0.4 }}
                          className="w-1.5 h-1.5 bg-gray-400 rounded-full"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
        
        {/* Input area (just for visual representation) */}
        <div className="p-2 flex items-center sticky bottom-0 left-0 bg-secondary/95 backdrop-blur">
          <PlusIcon className="w-5 h-5 mx-1" />
          <div className="flex-1 bg-background rounded-full px-4 py-3"></div>
          <CameraIcon className="w-5 h-5 mx-1" />
          <MicIcon className="w-5 h-5 mx-1" />
        </div>
      </div>
    </section>
  );
}
