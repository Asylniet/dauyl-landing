import { Card, CardDescription, CardHeader, CardTitle } from './ui/card';
import { MagnifierIcon, WalletIcon, ChartIcon } from './Icons';
import FilterNegativeSchemeSvg from '@/components/filter-negative-scheme-svg.tsx';

interface ServiceProps {
  title: string;
  description: string;
  icon: JSX.Element;
}

const serviceList: ServiceProps[] = [
  {
    title: 'Повышайте отзывы',
    description:
      'Фильтруйте негатив в чате и повышайте лояльность клиента',
    icon: <ChartIcon />,
  },
  {
    title: 'Предотвращайте возвраты',
    description:
      'Обрабатывая клиента в чате, вы уменьшаете возвраты - не теряете доход',
    icon: <WalletIcon />,
  },
  {
    title: 'Получайте оповещение',
    description:
      'Если при общении с ботом клиенту не нравится что-то, вы сразу же получаете оповещение',
    icon: <MagnifierIcon />,
  },
];

export const Services = () => {
  return (
    <section className="container py-24">
      <div className="grid lg:grid-cols-[1fr,1fr] gap-8 place-items-center">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold">
            Фильтр{' '}
            <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
              негатива{' '}
            </span>
          </h2>
          
          <p className="text-muted-foreground text-xl mt-4 mb-8 ">
            Фильтруйте негатив, прежде чем клиенты оставят его на каспи. У вас будет время обработать негатив в чате
          </p>
          
          <div className="flex flex-col gap-8">
            {serviceList.map(({ icon, title, description }: ServiceProps) => (
              <Card key={title}>
                <CardHeader className="space-y-1 flex md:flex-row justify-start items-start gap-4">
                  <div className="mt-1 bg-primary/20 p-1 rounded-2xl">
                    {icon}
                  </div>
                  <div>
                    <CardTitle>{title}</CardTitle>
                    <CardDescription className="text-md mt-2">
                      {description}
                    </CardDescription>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
        
        <FilterNegativeSchemeSvg
          className="w-full object-contain"
        />
      </div>
    </section>
  );
};
