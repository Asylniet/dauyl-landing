import { Button } from './ui/button';
import { env } from '@/lib/env.ts';

export const Cta = () => {
  return (
    <section
      id="cta"
      className="bg-muted/50 py-16 my-24"
    >
      <div className="container lg:grid lg:grid-cols-2 place-items-center">
        <div className="lg:col-start-1">
          <h2 className="text-3xl md:text-4xl font-bold ">
            Повысьте
            <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
              {' '}
              рейтинг и лояльность{' '}
            </span>
            магазина Kaspi
          </h2>
          <p className="text-muted-foreground text-xl mt-4 mb-8 lg:mb-0">
            Зарегистрируйтесь сейчас и получите 3 дня бесплатно пробного периода
          </p>
        </div>
        
        <div className="space-y-4 lg:col-start-2">
          <Button className="w-full md:mr-4 md:w-auto" asChild>
            <a target="_blank" rel="noreferrer noopener"
               href={`${env().VITE_APP_URL}/register`}>
              Получить 3 дня бесплатно
            </a>
          </Button>
          <Button
            variant="outline"
            className="w-full md:w-auto"
            asChild
          >
            <a
              target="_blank"
              rel="noreferrer noopener"
              href={`https://wa.me/${env().VITE_SUPPORT_NUMBER}?text=Хочу подключить авторассылку Dauyl, есть вопросы`}
            >
              Написать нам
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};
