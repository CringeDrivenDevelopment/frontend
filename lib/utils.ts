import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatSeconds(seconds: number) {
  return (
    Math.floor(seconds / 60) +
    ":" +
    String(seconds - Math.floor(seconds / 60) * 60).padStart(2, "0")
  );
}

export function getNoun(
  number: number,
  one: string,
  two: string,
  five: string
) {
  let n = Math.abs(number);
  n %= 100;
  if (n >= 5 && n <= 20) {
    return five;
  }
  n %= 10;
  if (n === 1) {
    return one;
  }
  if (n >= 2 && n <= 4) {
    return two;
  }
  return five;
}
