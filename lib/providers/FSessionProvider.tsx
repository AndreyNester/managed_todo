import { SessionProvider } from "next-auth/react"
import { ReactNode } from "react"

export const FSessionProvider = ({ children }: { children: ReactNode }): JSX.Element => {
    return <SessionProvider>{children}</SessionProvider>
}
