import { StatusBar } from "expo-status-bar";
import React from "react";
import { NativeBaseProvider } from "native-base";
import Navigation from "./Navigation";
import { QueryClient, QueryClientProvider } from "react-query";
import { RecoilRoot } from "recoil";
const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <NativeBaseProvider>
          <Navigation />
          <StatusBar />
        </NativeBaseProvider>
      </RecoilRoot>
    </QueryClientProvider>
  );
}
