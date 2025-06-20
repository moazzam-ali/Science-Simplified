import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}


export function cleanName(name) {
  return name.trim().replace(/\s*\d+$/, "");
}

