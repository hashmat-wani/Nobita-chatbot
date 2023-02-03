import express from "express";
import cors from "cors";
import { Configuration, OpenAIApi } from "openai";
import {
  APP_PORT,
  CLIENT_DEV_API,
  CLIENT_PROD_API,
  DEV_API,
  MODE,
  OPENAI_API_KEY,
  OPENAI_ORGANIZATION,
  PROD_API,
} from "./env.js";

const PORT = APP_PORT || 3000;

const app = express();
const corsOptions = {
  origin: `${MODE === "dev" ? CLIENT_DEV_API : CLIENT_PROD_API}`,
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
  methods: "GET,POST,PUT,DELETE,PATCH",
};
app.use(cors(corsOptions));
app.use(express.json());


const configuration = new Configuration({
  organization: OPENAI_ORGANIZATION,
  apiKey: OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

app.get("/", async (req, res) => {
  res.status(200).send({
    message: "Welcome to Nobita",
  });
});

app.get("/models", async (req, res) => {
  try {
    const response = await openai.listEngines();
    res.status(200).json({ models: response.data });
  } catch (err) {
    res.status(500).json({ error: true, message: err.message });
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

app.listen(PORT, () => {
  console.log(`server is running on ${MODE === "dev" ? DEV_API : PROD_API}`);
});
