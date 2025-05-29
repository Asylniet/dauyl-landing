import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

interface FAQProps {
  question: string;
  answer: string;
  value: string;
}

const FAQList: FAQProps[] = [
  {
    question: 'Это безопасно?',
    answer: 'Да, это 100% безопасно. Мы не храним лишних данных у себя',
    value: 'item-1',
  },
  {
    question: 'Не будете ли вы видеть мои личные сообщения?',
    answer:
      'Нет, бот отвечает только чатам с номерами клиентов Kaspi',
    value: 'item-2',
  },
  {
    question:
      'У меня мало заказов, даст ли мне эффект?',
    answer:
      'Можете подписаться на стандартный тариф и повышать лояльность клиентов. Со временем это окупиться',
    value: 'item-3',
  },
  {
    question: 'Будет ли результат за 3 дня пробного периода?',
    answer: 'Если за 3 дня у вас будет мало заказов, то мы можем сделать архивную рассылку - разом повысить отзывы за день',
    value: 'item-4',
  },
];

export const FAQ = () => {
  return (
    <section
      id="faq"
      className="container py-24 sm:py-32"
    >
      <h2 className="text-3xl md:text-4xl font-bold mb-4">
        Часто задаваемые{' '}
        <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
          вопросы
        </span>
      </h2>
      
      <Accordion
        type="single"
        collapsible
        className="w-full AccordionRoot"
      >
        {FAQList.map(({ question, answer, value }: FAQProps) => (
          <AccordionItem
            key={value}
            value={value}
          >
            <AccordionTrigger className="text-left">
              {question}
            </AccordionTrigger>
            
            <AccordionContent>{answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
      
      <h3 className="font-medium mt-4">
        Еще остались вопросы?{' '}
        <a
          rel="noreferrer noopener"
          href="#"
          className="text-primary transition-all border-primary hover:border-b-2"
        >
          Свяжитесь с нами
        </a>
      </h3>
    </section>
  );
};
