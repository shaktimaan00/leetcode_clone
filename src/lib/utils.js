import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { NextResponse } from 'next/server';

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export const errorResponse = (message, status) => {
  return NextResponse.json({ error: message, success: false }, { status });
};