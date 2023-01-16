import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import { Configuration, OpenAIApi } from "openai";
dotenv.config();
const configuration = new Configuration({
  organization: "org-5aXtvxOAwSF6IJuQZ9muAG35",
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", async (req, res) => {
  res.status(200).send({
    message: "Welcome to Nobita",
  });
});

app.get("/models", async (req, res) => {
  try {
    const response = await openai.listEngines();
    res.status(200).send({ models: response.data.data });
  } catch (err) {
    console.log({ ModelError: err });
  }
});

app.post("/", async (req, res) => {
  try {
    const { query, model, temp, maxLength } = req.body.prompt;
    const response = await openai.createCompletion({
      model: `${model}`,
      prompt: `${query}`,
      temperature: temp,
      max_tokens: maxLength,
      frequency_penalty: 0.5,
    });
    res.status(200).send({
      bot: response.data.choices[0].text,
    });
  } catch (err) {
    res.status(500).send({ error: err });
  }
});

app.listen(5000, () => {
  console.log(`server is running on port http://localhost:5000`);
});
