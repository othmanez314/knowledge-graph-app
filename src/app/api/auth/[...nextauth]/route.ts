// app/api/auth/[...nextauth]/route.ts
import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/lib/prisma"; // Adjust the import path as necessary

const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
  ],
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET!,
  callbacks: {
    async session({ session, user }) {
      // Attach the user ID to the session object
      if (session.user) {
        session.user.id = user.id;
      }
      return session;
    },
  },
  debug: true,
};

// Next.js 13 App Router-compatible route handler
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
