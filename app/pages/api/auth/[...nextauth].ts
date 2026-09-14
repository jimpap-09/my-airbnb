
import { AuthOptions } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google"

import prisma from "@app/libs/prismadb";

export const authOptions: AuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        GithubProvider({
            clienId: process.env.GITHUB_ID as string,
            clienSecret: process.env.GITHUB_ID as string,
        }),
        GoogleProvider({
            clienId: process.env.GITHUB_ID as string,
            clienSecret: process.env.GITHUB_ID as string,
        }),
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                email
            }
        })
    ]
}