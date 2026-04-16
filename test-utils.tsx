import "src/styles/globals.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { type RenderOptions, render } from "@testing-library/react";
import { RouterContext } from "next/dist/shared/lib/router-context.shared-runtime";
import type { ReactElement } from "react";
import type { PropsWithChildrenOnly } from "src/@types/react";
import ToastProvider from "src/components/Toast/ToastProvider";
import { UrlParamsProvider } from "src/providers/UrlParamsProvider.provider";
import { mockedUseRouterReturnValue } from "src/tests/mocks/mockNextRouter";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { refetchOnWindowFocus: false, retry: false, staleTime: 60 },
  },
});

const Providers = ({ children }: PropsWithChildrenOnly) => (
  <RouterContext.Provider value={mockedUseRouterReturnValue}>
    <QueryClientProvider client={queryClient}>
      <UrlParamsProvider>
        <ToastProvider>{children}</ToastProvider>
      </UrlParamsProvider>
    </QueryClientProvider>
  </RouterContext.Provider>
);

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "queries">,
) => render(ui, { wrapper: Providers, ...options });

export * from "@testing-library/react";

export { customRender as render, queryClient };
