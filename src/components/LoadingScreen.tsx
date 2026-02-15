"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const SPLASH_STORAGE_KEY = "bible-splash-seen";

export function LoadingScreen() {
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (typeof window === "undefined") return;
    const seen = sessionStorage.getItem(SPLASH_STORAGE_KEY);
    setVisible(seen !== "1");
  }, []);

  const handleContinue = () => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem(SPLASH_STORAGE_KEY, "1");
    }
    setVisible(false);
  };

  if (!mounted || !visible) return null;

  const base = process.env.NEXT_PUBLIC_BASE_PATH || "";

  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center px-6 py-8"
      style={{ backgroundColor: "#efdfc8" }}
    >
      <div className="flex flex-col items-center gap-8 max-w-md w-full">
        <div className="relative w-48 h-48 sm:w-56 sm:h-56 flex-shrink-0">
          <Image
            src={`${base}/logo.jpg`}
            alt=""
            fill
            className="object-contain"
            priority
            sizes="224px"
          />
        </div>
        <p
          className="text-center text-[var(--color-ink-muted)] text-sm sm:text-base italic font-serif"
          style={{ color: "#5c5344" }}
        >
          Non nobis, Domine, non nobis, sed nomini tuo da gloriam.
        </p>
        <button
          type="button"
          onClick={handleContinue}
          className="btn btn-primary min-w-[180px]"
        >
          Напред
        </button>
      </div>
    </div>
  );
}
