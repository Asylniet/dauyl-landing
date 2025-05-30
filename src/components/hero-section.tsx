import { LogoCloud } from './logo-cloud';
import { TextEffect } from '@/components/ui/text-effect.tsx';
// import { AnimatedGroup } from '@/components/ui/animated-group';
// import WhatsAppChat from '@/components/whatsapp-chat.tsx';
// import { MESSAGES } from '@/lib/constants.tsx';
import { Button } from '@/components/ui/button.tsx';
import { env } from '@/lib/env.ts';

// const transitionVariants = {
//   item: {
//     hidden: {
//       opacity: 0,
//       filter: 'blur(12px)',
//       y: 12,
//     },
//     visible: {
//       opacity: 1,
//       filter: 'blur(0px)',
//       y: 0,
//       transition: {
//         type: 'spring',
//         bounce: 0.3,
//         duration: 1.5,
//       },
//     },
//   },
// };

export default function HeroSection() {
  return (
    <>
      <main
        className="overflow-hidden [--color-primary-foreground:var(--color-white)] [--color-primary:var(--color-green-600)]">
        <section>
          <div className="relative mx-auto max-w-6xl px-2 sm:px-6 pb-20 pt-32 lg:pt-48">
            <div className="relative z-10 mx-auto max-w-4xl text-center">
              <TextEffect
                preset="fade-in-blur"
                speedSegment={0.3}
                as="h1"
                className="text-balance text-5xl font-medium md:text-6xl">
                Продажи. Рейтинг. Отзывы. Dauyl - ваш главный помощник на Kaspi
              </TextEffect>
              <TextEffect
                per="line"
                preset="fade-in-blur"
                speedSegment={0.3}
                delay={0.5}
                as="p"
                className="mx-auto mt-6 max-w-2xl text-pretty text-lg">
                Автоматизируйте общение с клиентами, собирайте отзывы и растите в выдаче — без лишних движений.
              </TextEffect>
              
              <Button className="w-auto my-4" size="lg" asChild>
                <a
                  target="_blank"
                  rel="noreferrer noopener"
                  href={`${env().VITE_APP_URL}/register`}
                >
                  Получить 3 дня бесплатно
                </a>
              </Button>
              
              {/*<AnimatedGroup*/}
              {/*  variants={{*/}
              {/*    container: {*/}
              {/*      visible: {*/}
              {/*        transition: {*/}
              {/*          staggerChildren: 0.05,*/}
              {/*          delayChildren: 0.75,*/}
              {/*        },*/}
              {/*      },*/}
              {/*    },*/}
              {/*    ...transitionVariants,*/}
              {/*  }}*/}
              {/*  className="mt-12"*/}
              {/*>*/}
              {/*  <div*/}
              {/*    aria-hidden*/}
              {/*    className="bg-radial from-primary/50 dark:from-primary/25 relative mx-auto mt-32 max-w-2xl to-transparent to-55% text-left">*/}
              {/*    <div*/}
              {/*      className="hidden sm:block bg-background border-border/50 absolute inset-0 mx-auto w-96 -translate-x-3 -translate-y-10 rounded-[2rem] border p-2 [mask-image:linear-gradient(to_bottom,#000_70%,transparent_90%)] sm:-translate-x-6">*/}
              {/*      <div*/}
              {/*        className="relative h-96 overflow-hidden rounded-[1.5rem] border p-2 pb-12 before:absolute before:inset-0 before:bg-[repeating-linear-gradient(-45deg,var(--color-border),var(--color-border)_1px,transparent_1px,transparent_6px)] before:opacity-50"></div>*/}
              {/*    </div>*/}
              {/*    <div*/}
              {/*      className="bg-muted dark:bg-background/50 border-border/50 mx-auto w-full sm:w-96 sm:translate-x-4 rounded-[2rem] border p-2 backdrop-blur-3xl [mask-image:linear-gradient(to_bottom,#000_70%,transparent_90%)]">*/}
              {/*      <div*/}
              {/*        className="bg-background space-y-2 overflow-hidden rounded-[1.5rem] border p-2 shadow-xl dark:bg-white/5 dark:shadow-black dark:backdrop-blur-3xl">*/}
              {/*        <img src="/kaspi-screen.jpg" className="w-full h-full rounded-[1.5rem]" />*/}
              {/*        */}
              {/*        <div className="bg-muted rounded-[1rem] p-4 pb-16 dark:bg-white/5"></div>*/}
              {/*      </div>*/}
              {/*    </div>*/}
              {/*    <div*/}
              {/*      className="absolute -z-10 inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] mix-blend-overlay [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] dark:opacity-5" />*/}
              {/*  </div>*/}
              {/*</AnimatedGroup>*/}
            </div>
          </div>
        </section>
        <LogoCloud />
      </main>
    </>
  );
}