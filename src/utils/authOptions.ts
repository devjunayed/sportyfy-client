import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";

const authOptions = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "email",
          type: "email",
          placeholder: "jsmith@gmail.com",
        },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials, req) {
        console.log("Credentials from authOptions:", credentials);
        // const res = await fetch("your/endpoint", {
        //     method: 'POST',
        //     body: JSON.stringify(credentials),
        //     headers: {"Content-Type": "application/json"}
        // })
        // const user = await res.json();

        // if(res.ok && user){
        //     return user
        // }
        // return user;
        return {
          id: "1",
          name: "Demo User",
          email: credentials?.email,
        };
      },
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    // ...add more providers here
  ],
};

export default authOptions;
