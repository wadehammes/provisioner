"use client";

import { useSearchParams } from "next/navigation";
import { createContext, Suspense, useContext } from "react";

const UrlParamsContext = createContext<URLSearchParams | null>(null);

function UrlParamsProviderInner({ children }: { children: React.ReactNode }) {
  const searchParams = useSearchParams();

  return (
    <UrlParamsContext.Provider value={searchParams}>
      {children}
    </UrlParamsContext.Provider>
  );
}

export function UrlParamsProvider({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={null}>
      <UrlParamsProviderInner>{children}</UrlParamsProviderInner>
    </Suspense>
  );
}

export function useUrlParams() {
  const ctx = useContext(UrlParamsContext);

  if (!ctx) {
    throw new Error("useUrlParams must be used within UrlParamsProvider");
  }

  return ctx;
}
