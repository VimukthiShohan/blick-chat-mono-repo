import './globals.css';
import React from 'react';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import ProvidesTheQueryClient from '@/utils/ProvidesTheQueryClient';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProvidesTheQueryClient>
      <html lang="en">
        <body>
          <AppRouterCacheProvider>{children}</AppRouterCacheProvider>
        </body>
      </html>
    </ProvidesTheQueryClient>
  );
}
