"use client";

import type { ThemeProviderProps } from "next-themes";
import { Toaster } from "sonner";

import * as React from "react";
import { HeroUIProvider } from "@heroui/system";
import { useRouter } from "next/navigation";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { AppStore, makeStore } from "@/redux/store";
import { Provider } from "react-redux";
import { SessionProvider } from "next-auth/react";


export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
  session: any
}

declare module "@react-types/shared" {
  interface RouterConfig {
    routerOptions: NonNullable<
      Parameters<ReturnType<typeof useRouter>["push"]>[1]
    >;
  }
}

export  function SportyFyProvider({
  children,
  themeProps,
  session
}: ProvidersProps) {
  const router = useRouter();
  const storeRef = React.useRef<AppStore | null>(null);
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore();
  }




  return (
    <SessionProvider session={session}>
      <HeroUIProvider navigate={router.push}>
        <Provider store={storeRef.current}>
          <Toaster />
          <NextThemesProvider {...themeProps}>{children}</NextThemesProvider>
        </Provider>
      </HeroUIProvider>
    </SessionProvider>
  );
}
