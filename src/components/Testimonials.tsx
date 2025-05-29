const testimonials: string[] = [
  '/testimonials/1.jpg',
  '/testimonials/2.jpg',
  '/testimonials/3.jpg',
  '/testimonials/4.jpg',
];

export const Testimonials = () => {
  return (
    <section
      id="testimonials"
      className="container py-24 sm:py-32"
    >
      <h2 className="text-3xl md:text-4xl font-bold">
        Что говорят
        <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
          {' '}
          наши клиенты{' '}
        </span>
        о нас
      </h2>
      
      <p className="text-xl text-muted-foreground pt-4 pb-8">
        Больше отзывов можете увидеть на нашей <a target="_blank" rel="noopener noreferrer"
                                                  href="https://www.instagram.com/dauyl.bot/"
                                                  className="text-pink-500 underline">инстаграм</a> странице
      </p>
      
      <div
        className="flex flex-wrap gap-3 justify-center">
        {testimonials.map(
          (image) => (
            <img
              key={image}
              src={image}
              alt=""
              className="w-full rounded-lg sm:max-w-60"
            />
          ),
        )}
      </div>
    </section>
  );
};
