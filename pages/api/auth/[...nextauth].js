import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
    }),
    // ...add more providers here
  ],
};
export default NextAuth(authOptions);
