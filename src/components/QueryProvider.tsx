"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { useState } from "react";

const QueryProvider = ({ children }: { children: React.ReactNode }) => {
  //This ensures data isn't shared between diff users & requests creating queryclient once per component life cycle
  const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default QueryProvider;
