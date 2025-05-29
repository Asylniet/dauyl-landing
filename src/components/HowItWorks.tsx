import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { MedalIcon, MapIcon, PlaneIcon, GiftIcon } from '../components/Icons';

interface FeatureProps {
  icon: JSX.Element;
  title: string;
  description: string;
}

const features: FeatureProps[] = [
  {
    icon: <MedalIcon />,
    title: 'Двуязычные шаблоны',
    description:
      'Отправляйте сообщения на казахском и русском или же на обеих языках сразу. Настройте шаблоны под нужды своих клиентов',
  },
  {
    icon: <MapIcon />,
    title: 'Фильтруйте негатив',
    description:
      'Прежде чем просить клиента оценить товар, бот спрашивает понравилось ли все. Если что-то не понравилось, вы можете обработать клиента в чате. Если понравилось, бот отправляет ссылку',
  },
  {
    icon: <PlaneIcon />,
    title: 'Откладывайте время отправки',
    description:
      'Чтобы клиент успел проверить и достойной оценить товар, выбирайте когда именно клиенту должно прийти сообщение. Сразу или с задержкой до нескольких дней',
  },
  {
    icon: <GiftIcon />,
    title: 'Рекламируйте ассортимент',
    description:
      'В авторассылке вы можете рекламировать свой ассортимент каждому покупателю. Это поможет улучшить клиентский опыт и косвенно повысить продажи',
  },
];

export const HowItWorks = () => {
  return (
    <section
      id="howItWorks"
      className="container text-center py-24 sm:py-32"
    >
      <h2 className="text-3xl md:text-4xl font-bold ">
        Преимущества{' '}
        <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
          Dauyl{' '}
        </span>
      </h2>
      <p className="md:w-3/4 mx-auto mt-4 mb-8 text-xl text-muted-foreground">
        Все настройки в удобном интерфейсе в админ панели сайта
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map(({ icon, title, description }: FeatureProps) => (
          <Card
            key={title}
            className="bg-muted/50"
          >
            <CardHeader>
              <CardTitle className="grid gap-4 place-items-center">
                {icon}
                {title}
              </CardTitle>
            </CardHeader>
            <CardContent>{description}</CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};
