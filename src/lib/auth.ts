import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // TODO: Replace with real DB lookup + bcrypt compare
        if (!credentials?.email || !credentials?.password) return null;

        // Placeholder — replace with Prisma query
        if (
          credentials.email === "demo@inflatacraft.com" &&
          credentials.password === "demo123"
        ) {
          return {
            id: "1",
            email: "demo@inflatacraft.com",
            name: "Demo User",
            role: "CUSTOMER",
          };
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as any).role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.id;
        (session.user as any).role = token.role;
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },
  session: {
    strategy: "jwt",
  },
});

/**
 * Convenience wrapper: get the current session in Server Components / API routes.
 *
 * Usage:
 *   import { getServerSession } from "@/lib/auth";
 *   const session = await getServerSession();
 */
export async function getServerSession() {
  return auth();
}
