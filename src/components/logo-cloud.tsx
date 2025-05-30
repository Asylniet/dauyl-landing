import { InfiniteSlider } from '@/components/ui/infinite-slider';
import { ProgressiveBlur } from '@/components/ui/progressive-blur';

type PartnerSlide = {
  name: string
  logo?: string
}

const PARTNERS: PartnerSlide[] = [
  {
    name: 'Xiaomi',
    logo: '/partners/xiaomi.png',
  },
  {
    name: 'Ria Cosmetics',
  },
  {
    name: 'Techno Lider',
    logo: '/partners/technolider.png',
  },
  {
    name: 'Aizer',
  },
  {
    name: 'TSSP',
    logo: '/partners/tssp.png',
  },
  {
    name: 'Askona Halal',
  },
  {
    name: 'Шин Line',
    logo: '/partners/shin-line.png',
  },
  {
    name: '100kolyasok-kz',
  },
  {
    name: 'Самоделкин',
    logo: '/partners/samodelkin.png',
  },
  {
    name: 'ХАММЕР-Н1 SHYM',
  },
] as const;

export const LogoCloud = () => {
  return (
    <section className="bg-background pb-16 md:pb-32">
      <div className="group relative m-auto max-w-6xl px-6">
        <div className="flex flex-col items-center md:flex-row">
          <div className="inline md:max-w-44 md:border-r md:pr-6">
            <p className="text-end text-sm">С нами уже поднимают рейтинги:</p>
          </div>
          <div className="relative py-6 md:w-[calc(100%-11rem)]">
            <InfiniteSlider
              speedOnHover={40}
              speed={60}
              gap={80}
              className="items-center"
            >
              {PARTNERS.map(partner => (
                <div className="flex items-center gap-2">
                  {partner.logo ? (
                    <img
                      className="mx-auto h-8 w-auto"
                      src={partner.logo}
                      alt={partner.name}
                      height="32"
                      width="auto"
                    />
                  ) : (
                    <span>
                      {partner.name}
                    </span>
                  )}
                </div>
              ))}
            </InfiniteSlider>
            
            <div className="bg-linear-to-r from-background absolute inset-y-0 left-0 w-20"></div>
            <div className="bg-linear-to-l from-background absolute inset-y-0 right-0 w-20"></div>
            <ProgressiveBlur
              className="pointer-events-none absolute left-0 top-0 h-full w-20"
              direction="left"
              blurIntensity={1}
            />
            <ProgressiveBlur
              className="pointer-events-none absolute right-0 top-0 h-full w-20"
              direction="right"
              blurIntensity={1}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
