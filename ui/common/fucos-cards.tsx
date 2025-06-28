'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import clsx from 'clsx';

export const Card = React.memo(
  ({
    card,
    index,
    action,
    hovered,
    setHovered,
  }: {
    card: any;
    index: number;
    hovered: number | null;
    action: string | (() => void);
    setHovered: React.Dispatch<React.SetStateAction<number | null>>;
  }) =>
    typeof action == 'string' ? (
      <Link href={action}>
        <div
          onMouseEnter={() => setHovered(index)}
          onMouseLeave={() => setHovered(null)}
          className={cn(
            'rounded-lg relative bg-white/25 dark:bg-black/25 overflow-hidden h-60 md:h-96 w-full transition-all duration-300 ease-out',
            'cursor-pointer',
            hovered !== null && hovered !== index && 'blur-sm scale-[0.98]'
          )}
        >
          <img
            src={card.src}
            alt={card.title}
            className="object-cover absolute inset-0"
          />
          <div
            className={cn(
              'absolute inset-0 bg-black/50 flex items-end py-8 px-4 transition-opacity duration-300',
              'max-lg:opacity-100',
              hovered === index ? 'opacity-100' : 'opacity-25'
            )}
          >
            <div className="text-xl md:text-2xl w-full text-center font-[vazir-bold] bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-200">
              {card.title}
            </div>
          </div>
        </div>
      </Link>
    ) : (
      <div
        onMouseEnter={() => setHovered(index)}
        onMouseLeave={() => setHovered(null)}
        onClick={action}
        className={cn(
          'rounded-lg relative bg-gray-100 dark:bg-neutral-900 overflow-hidden h-60 md:h-96 w-full transition-all duration-300 ease-out',
          'cursor-pointer',
          hovered !== null && hovered !== index && 'blur-sm scale-[0.98]'
        )}
      >
        <img
          src={card.src}
          alt={card.title}
          className="object-cover absolute inset-0"
        />
        <div
          className={cn(
            'absolute inset-0 bg-black/50 flex items-end py-8 px-4 transition-opacity duration-300',
            hovered === index ? 'opacity-100' : 'opacity-0'
          )}
        >
          <div className="text-xl md:text-2xl w-full text-center font-[vazir-bold] bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-200">
            {card.title}
          </div>
        </div>
      </div>
    )
);

Card.displayName = 'Card';

type Card = {
  title: string;
  src: string;
  action: string | (() => void);
};

export default function FocusCards({ cards }: { cards: Card[] }) {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <>
      {/* Mobile view */}
      <div className={clsx('lg:hidden', 'grid grid-cols-1 gap-5 w-full')}>
        {cards.map((card, index, array) =>
          // padded last item
          index === array.length - 1 ? (
            <div key={card.title}>
              <Card
                key={card.title}
                card={card}
                index={index}
                action={card.action}
                hovered={hovered}
                setHovered={setHovered}
              />
              <div className="Blank h-3" />
            </div>
          ) : (
            <Card
              key={card.title}
              card={card}
              index={index}
              action={card.action}
              hovered={hovered}
              setHovered={setHovered}
            />
          )
        )}
      </div>

      {/* Desktop view */}
      <div
        className={clsx(
          'max-lg:hidden',
          'grid gap-10 max-w-5xl mx-auto md:px-8 w-full'
        )}
        style={{
          gridTemplateColumns: `repeat(${cards.length}, minmax(0, 1fr))`,
        }}
      >
        {cards.map((card, index) => (
          <Card
            key={card.title}
            card={card}
            index={index}
            action={card.action}
            hovered={hovered}
            setHovered={setHovered}
          />
        ))}
      </div>
    </>
  );
}
