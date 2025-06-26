'use client';

import translator from '@/lib/helpers/translator';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/ui/components/breadcrumb';
import clsx from 'clsx';
import { usePathname } from 'next/navigation';

export default function Breadcrumbs() {
  const pathname = usePathname();
  const paths = pathname
    .split('/')
    .filter((path) => path.length)
    .map((path) => ({
      label: translator(path, 'paths'),
      href: path,
    }));

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {paths.map((path, index, array) => {
          const isLast = index === array.length - 1;

          const href = array
            .slice(0, index + 1)
            .map((path) => path.href)
            .join('/');

          return (
            <>
              <BreadcrumbItem
                key={href}
                className={clsx(
                  'font-bold text-lg',
                  isLast && 'text-black dark:text-white'
                )}
              >
                <BreadcrumbLink href={`/${href}`}>{path.label}</BreadcrumbLink>
              </BreadcrumbItem>
              {!isLast && <BreadcrumbSeparator />}
            </>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
