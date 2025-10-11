"use client";
import { useRef } from "react";
import { Provider } from "react-redux";
import { HeroUIProvider } from "@heroui/react";
import { makeStore, AppStore } from "../redux/store";
import { AntdRegistry } from "@ant-design/nextjs-registry";

export default function SportyFyProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const storeRef = useRef<AppStore | null>(null);
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore();
  }

  return (
    <AntdRegistry>
      <HeroUIProvider>
        <Provider store={storeRef.current}>{children}</Provider>
      </HeroUIProvider>
    </AntdRegistry>
  );
}
