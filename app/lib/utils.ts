import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: Array<string | Record<string, boolean> | undefined | null>) {
  // clsx typing is loose; cast to unknown[] for compatibility with clsx
  return twMerge(clsx(inputs as unknown[]))
}
