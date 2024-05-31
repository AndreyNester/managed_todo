'use client'

import type { ReactNode } from "react";
import { StoreProvider } from "../lib/providers/StoreProvider";
import "./styles/globals.css";
import styles from "./styles/layout.module.css";
import { FSessionProvider } from "@/lib/providers/FSessionProvider";

export default function RootLayout({ children }: {children: ReactNode}) {
  return (
    <StoreProvider>
      <html lang="en" className="h-full bg-white">
        <body className="h-full">
          <section className={styles.container}>
            <main className={styles.main}>
              <FSessionProvider>
                {children}
              </FSessionProvider>
            </main>
          </section>
        </body>
      </html>
    </StoreProvider>
  );
}
