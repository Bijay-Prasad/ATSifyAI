"use client";
import { useEffect } from "react";
import { usePuterStore } from "@/lib/puter";

export function PuterInitClient() {
  const { init } = usePuterStore();
  useEffect(() => {
    init();
  }, [init]);
  return null;
}
