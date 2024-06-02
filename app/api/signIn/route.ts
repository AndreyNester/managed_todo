import { ISignInCredentials } from "@/lib/features/forms/signInForm/types"
import { NextRequest, NextResponse } from "next/server"

interface IData {
    email: string
    password: string
    type: "user" | "admin"
}

const dataBase: IData[] = [
    {
        email: "user@user.com",
        password: "12345",
        type: "user",
    },
    {
        email: "admin@admin.com",
        password: "67890",
        type: "admin",
    },
]

export async function POST(request: NextRequest) {
    const { email, password } = (await request.json()) as ISignInCredentials
    const foundUser = dataBase.find((item) => item.email === email)
    if (!foundUser || foundUser.password != password)
        return new NextResponse(
            JSON.stringify({
                status: 422,
                errors: {
                    email: "Wrong email or password",
                    password: "Wrong email or password",
                },
            }),
            { status: 422 }
        )

    return new NextResponse(
        JSON.stringify({
            email: foundUser.email,
            type: foundUser.type,
        }),
        {
            status: 200,
        }
    )
}
