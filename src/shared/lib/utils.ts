// shared/lib/utils.ts
import { clsx, ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatRelativeTime(createdAt: Date | string): string {
  const now = new Date();
  const createdDate = new Date(createdAt);

  // Calculate time difference in milliseconds
  const timeDiff = now.getTime() - createdDate.getTime();

  // Convert to different time units
  const seconds = Math.floor(timeDiff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  // Return appropriate relative time string
  if (days < 7) {
    if (days === 0) {
      return "Today";
    } else if (days === 1) {
      return "Yesterday";
    } else {
      return `${days} Days ago`;
    }
  } else if (weeks < 4) {
    return weeks === 1 ? "Week ago" : `${weeks} Weeks ago`;
  } else if (months < 12) {
    return months === 1 ? "Month ago" : `${months} Months ago`;
  } else {
    return years === 1 ? "Year ago" : `${years} Years ago`;
  }
}
