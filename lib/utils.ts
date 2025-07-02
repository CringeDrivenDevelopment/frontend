import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatSeconds(seconds: number) {
  return Math.floor(seconds / 60) + ':' + String((seconds - Math.floor(seconds / 60) * 60)).padStart(2, "0")
}