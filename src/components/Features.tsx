import { Badge } from './ui/badge';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import image from '../assets/growth.png';
import image3 from '../assets/reflecting.png';
import image4 from '../assets/looking-ahead.png';

interface FeatureProps {
  title: string;
  description: string;
  image: string;
}

const features: FeatureProps[] = [
  {
    title: 'Повышаем конверсию на 35%',
    description:
      'С нами ваши клиенты будут на 35% чаще оставлять отзывы на Kaspi',
    image: image4,
  },
  {
    title: 'С нами 4.6 станет 4.8',
    description:
      'На долгосрочной перспективе наши клиенты повышают свой рейтинг на >0.2 позиции',
    image: image3,
  },
  {
    title: 'Клиенты возвращаются чаще',
    description:
      'Клиентам нравиться забота и при сообщениях от магазина они чувствуют уверенность - более склонны заказать еще раз',
    image: image,
  },
];

const featureList: string[] = [
  'ИИ обработка',
  'Отложенная отправка',
  'Сообщение на все статусы заказа',
  'Меняйте шаблоны под себя',
  'Админ панель',
  'Сообщение о постомате',
  'Ссылка на Zammler',
  'Архивная рассылка',
  '100% Безопасно',
];

export const Features = () => {
  return (
    <section
      id="features"
      className="container py-24 sm:py-32 space-y-8"
    >
      <h2 className="text-3xl lg:text-4xl font-bold md:text-center">
        Почему{' '}
        <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
          мы?
        </span>
      </h2>
      
      <div className="flex flex-wrap md:justify-center gap-4">
        {featureList.map((feature: string) => (
          <div key={feature}>
            <Badge
              variant="secondary"
              className="text-sm"
            >
              {feature}
            </Badge>
          </div>
        ))}
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map(({ title, description, image }: FeatureProps) => (
          <Card key={title}>
            <CardHeader>
              <CardTitle>{title}</CardTitle>
            </CardHeader>
            
            <CardContent>{description}</CardContent>
            
            <CardFooter>
              <img
                src={image}
                alt="About feature"
                className="w-[200px] lg:w-[300px] mx-auto"
              />
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
};
