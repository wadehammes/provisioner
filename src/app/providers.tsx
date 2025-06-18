"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { type ReactNode, useState } from "react";
import ToastProvider from "src/components/Toast/ToastProvider";
import { UrlParamsProvider } from "src/providers/UrlParamsProvider.provider";

export default function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <UrlParamsProvider>
        <ToastProvider>{children}</ToastProvider>
      </UrlParamsProvider>
    </QueryClientProvider>
  );
}
