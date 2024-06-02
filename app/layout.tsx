"use client"

import type { ReactNode } from "react"
import { StoreProvider } from "../lib/providers/StoreProvider"
import "./styles/globals.css"
import styles from "./styles/layout.module.css"
import { FSessionProvider } from "@/lib/providers/FSessionProvider"
import { Layout } from "antd"
import { Content, Header } from "antd/es/layout/layout"
import { HeaderContent } from "./components/HeaderContent/HeaderContent"

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <StoreProvider>
            <html lang='en'>
                <body>
                    <FSessionProvider>
                        <Layout>
                            <Header className={styles.fheader}>
                                <HeaderContent />
                            </Header>
                            <Layout>
                                <Content>
                                    <section className={styles.container}>
                                        <main className={styles.main}>{children}</main>
                                    </section>
                                </Content>
                            </Layout>
                        </Layout>
                    </FSessionProvider>
                </body>
            </html>
        </StoreProvider>
    )
}
