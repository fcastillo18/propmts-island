import { connectToDatabase } from "@utils/database"
import Prompt from "@models/prompt"

export const POST = async (req, res) => {
  const { userId, prompt, tag } = await req.json();
  console.log("userId: ", userId)
  console.log("prompt: ", prompt)
  console.log("tag: ", tag)
  try {
    await connectToDatabase();
    const newPrompt = new Prompt({ creator: userId, prompt, tag });
    console.log("newPrompt: ", newPrompt);
    await newPrompt.save();

    return new Response(JSON.stringify(newPrompt), {
      status: 201,
    })
  } catch (error) {
    console.log(error);
    return new Response("Failed to create the prompt", {
      status: 500,
    })
  }
}