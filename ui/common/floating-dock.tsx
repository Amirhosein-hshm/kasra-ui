'use client';

import { useMeStore } from '@/lib/stores/me.stores';
import { FloatingDockItem } from '../../lib/ui-types';
import { cn } from '@/lib/utils';
import { IconLayoutNavbarCollapse } from '@tabler/icons-react';
import clsx from 'clsx';
import {
  AnimatePresence,
  MotionValue,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from 'motion/react';

import { useRef, useState } from 'react';

const FloatingDock = ({
  items,
  desktopClassName,
  mobileClassName,
}: {
  items: FloatingDockItem[];
  desktopClassName?: string;
  mobileClassName?: string;
}) => {
  const userTypeId = useMeStore((s) => s.user?.userTypeId);
  const calculateItems = items.filter((item) =>
    !item.permissions ? true : item.permissions.includes(userTypeId || 0)
  );
  return (
    <>
      <FloatingDockDesktop
        items={calculateItems}
        className={desktopClassName}
      />
      <FloatingDockMobile items={calculateItems} className={mobileClassName} />
    </>
  );
};

const FloatingDockMobile = ({
  items,
  className,
}: {
  items: FloatingDockItem[];
  className?: string;
}) => {
  const [open, setOpen] = useState(false);
  return (
    <div className={cn('relative block md:hidden', className)}>
      <AnimatePresence>
        {open && (
          <motion.div
            layoutId="nav"
            className="absolute inset-x-0 bottom-full mb-2 flex flex-col gap-2"
            style={{ direction: 'ltr' }}
          >
            {items.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 10 }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  y: 10,
                  transition: {
                    delay: idx * 0.05,
                  },
                }}
                transition={{ delay: (items.length - 1 - idx) * 0.05 }}
              >
                <a
                  href={
                    typeof item.action === 'string' ? item.action : undefined
                  }
                  onClick={
                    typeof item.action === 'string' ? undefined : item.action
                  }
                  key={item.title}
                  className={clsx(
                    'relative flex flex-row-reverse h-10 w-fit items-center justify-center rounded-full gap-1 px-2 backdrop-blur-lg',
                    item.isActive
                      ? 'bg-white/100 dark:bg-black/100'
                      : 'bg-white/50 dark:bg-black/50'
                  )}
                >
                  <div className="text-nowrap font-[vazir-bold] text-neutral-800 dark:text-neutral-100">
                    {item.title}
                  </div>
                  <div className="h-4 w-4">{item.icon}</div>
                </a>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      <button
        onClick={() => setOpen(!open)}
        className="flex h-10 w-10 items-center justify-center rounded-full bg-white/50 dark:bg-black/50 backdrop-blur-lg"
      >
        <IconLayoutNavbarCollapse className="h-5 w-5 text-neutral-800 dark:text-neutral-400" />
      </button>
    </div>
  );
};

const FloatingDockDesktop = ({
  items,
  className,
}: {
  items: FloatingDockItem[];
  className?: string;
}) => {
  let mouseX = useMotionValue(Infinity);

  const IconsContainer = items.map((item) => (
    <IconContainer mouseX={mouseX} key={item.title} {...item} />
  ));
  return (
    <motion.div
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className={cn(
        'mx-auto hidden h-16 items-end gap-4 rounded-2xl bg-white/5 px-4 pb-3 md:flex dark:bg-black/5 backdrop-blur-lg',
        className
      )}
    >
      {IconsContainer}
    </motion.div>
  );
};

function IconContainer({
  mouseX,
  title,
  icon,
  action,
  isActive,
}: {
  mouseX: MotionValue;
} & FloatingDockItem) {
  let ref = useRef<HTMLDivElement>(null);

  let distance = useTransform(mouseX, (val) => {
    let bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };

    return val - bounds.x - bounds.width / 2;
  });

  let widthTransform = useTransform(distance, [-150, 0, 150], [40, 80, 40]);
  let heightTransform = useTransform(distance, [-150, 0, 150], [40, 80, 40]);

  let widthTransformIcon = useTransform(distance, [-150, 0, 150], [20, 40, 20]);
  let heightTransformIcon = useTransform(
    distance,
    [-150, 0, 150],
    [20, 40, 20]
  );

  let width = useSpring(widthTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });
  let height = useSpring(heightTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  let widthIcon = useSpring(widthTransformIcon, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });
  let heightIcon = useSpring(heightTransformIcon, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  const [hovered, setHovered] = useState(false);

  return (
    <a
      href={typeof action === 'string' ? action : undefined}
      onClick={typeof action === 'string' ? undefined : action}
      className={clsx(
        'cursor-pointer backdrop-blur-xs rounded-[50%]',
        isActive
          ? 'bg-white/95 dark:bg-black/75'
          : 'bg-white/50 dark:bg-black/25'
      )}
    >
      <motion.div
        ref={ref}
        style={{ width, height }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className={clsx(
          'relative flex aspect-square items-center justify-center rounded-full'
        )}
      >
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0, y: 10, x: '-50%' }}
              animate={{ opacity: 1, y: 0, x: '-50%' }}
              exit={{ opacity: 0, y: 2, x: '-50%' }}
              className="absolute -top-8 left-1/2 w-fit rounded-md border border-gray-200 bg-gray-100 px-2 py-0.5 text-xs whitespace-pre text-neutral-700 dark:border-neutral-900 dark:bg-neutral-800 dark:text-white"
            >
              {title}
            </motion.div>
          )}
        </AnimatePresence>
        <motion.div
          style={{ width: widthIcon, height: heightIcon }}
          className="flex items-center justify-center"
        >
          {icon}
        </motion.div>
      </motion.div>
    </a>
  );
}

export default FloatingDock;
