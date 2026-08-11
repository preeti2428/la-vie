import Replicate from "replicate";
import "dotenv/config";

async function test() {
  const replicate = new Replicate({
    auth: process.env.REPLICATE_API_TOKEN,
  });

  try {
    const output = await replicate.run(
      "adirik/interior-design:76604baddc85b1b4616e1c6475eca080da339c8875bd4996705440484a6eac38",
      {
        input: {
          image: "https://replicate.delivery/pbxt/HzaZ2xU4eBfF03sZ6D0m9K/room.png",
          prompt: "A beautiful interior design",
        }
      }
    );
    console.log("Success:", output);
  } catch (err: any) {
    console.error("Error details:", err.message);
  }
}
test();
