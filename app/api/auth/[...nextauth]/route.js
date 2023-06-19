import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import User from "@models/user"
import { connectToDatabase } from "@utils/database";

console.log(({
   clientId: process.env.GOOGLE_ID,
   clientSecret: process.env.GOOGLE_CLIENT_SECRET,
}))

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }
    )
  ],
  callbacks: {
    async session({ session }) {
      const sessionUser = await User.findOne({
        email: session.user.email
      })
      session.user.id = sessionUser._id.toString();

    return session;
    },

    async signIn({ profile }){
      try{
        // serverless -> lambda -> dynamoDB
        await connectToDatabase();
        // check if a user already exist
        const userExist = await User.findOne({ 
          email: profile.email 
        });
        // if not, create a new user
        if(!userExist){
        await User.create({
          email: profile.email,
          username: profile.name.replace(/\s/g, "").toLowerCase(),
          image: profile.picture
        })
        }
        return true;
      } catch(err){
        console.log(err)
        return false;
      }
    }
  }
})

export { handler as GET, handler as POST };
