import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Check } from 'lucide-react';

enum PopularPlanType {
  NO = 0,
  YES = 1,
}

interface PricingProps {
  title: string;
  popular: PopularPlanType;
  price: number;
  description: string;
  buttonText: string;
  benefitList: string[];
}

const pricingList: PricingProps[] = [
  {
    title: 'STANDART',
    popular: 0,
    price: 14990,
    description:
      'Повышение количества отзывов',
    buttonText: 'Получить 3 дня беслплатно',
    benefitList: [
      'Сообщение при оформлении',
      'Сообщение при выдаче',
    ],
  },
  {
    title: 'PREMIUM',
    popular: 1,
    price: 29990,
    description:
      'Полный пакет со всеми функциями',
    buttonText: 'Получить 3 дня бесплатно',
    benefitList: [
      'Сообщение при оформлении',
      'Сообщение при передаче на доставку',
      'Ссылка на слежку за доставкой',
      'Фильтрация негативных отзывов',
      'Сообщение о доставке',
      'Сообщение о доставке в Postomat',
      'Напоминание о Postomat',
    ],
  },
];

export const Pricing = () => {
  return (
    <section
      id="pricing"
      className="container py-24 sm:py-32"
    >
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
        Получите доступ
        <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
          {' '}
          без ограничений{' '}
        </span>
      </h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {pricingList.map((pricing: PricingProps) => (
          <Card
            key={pricing.title}
            className={
              pricing.popular === PopularPlanType.YES
                ? 'drop-shadow-xl shadow-black/10 dark:shadow-white/10'
                : ''
            }
          >
            <CardHeader>
              <CardTitle className="flex item-center justify-between">
                {pricing.title}
                {pricing.popular === PopularPlanType.YES ? (
                  <Badge
                    variant="secondary"
                    className="text-sm text-primary"
                  >
                    Популярный
                  </Badge>
                ) : null}
              </CardTitle>
              <div>
                <span className="text-3xl font-bold">{pricing.price.toLocaleString('ru-RU')}₸</span>
                <span className="text-muted-foreground"> /мес</span>
              </div>
              
              <CardDescription>{pricing.description}</CardDescription>
            </CardHeader>
            
            <CardContent>
              <Button className="w-full">{pricing.buttonText}</Button>
            </CardContent>
            
            <hr className="w-4/5 m-auto mb-4" />
            
            <CardFooter className="flex">
              <div className="space-y-4">
                {pricing.benefitList.map((benefit: string) => (
                  <span
                    key={benefit}
                    className="flex"
                  >
                    <Check className="text-green-500" />{' '}
                    <h3 className="ml-2">{benefit}</h3>
                  </span>
                ))}
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
};
