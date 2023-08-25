const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const AWS = require("aws-sdk");
const cors = require("cors");

app.use(cors());
app.use(bodyParser.json());

AWS.config.update({
  region: "us-east-1",
  accessKeyId: "AKIAEXAMPLE123",
  secretAccessKey: "AWSSECRETACCESSEY123",
});

const sqs = new AWS.SQS();

app.post("/send-message", async (req, res) => {
  const { queueUrl, messageBody } = req.body;

  const params = {
    QueueUrl: queueUrl,
    MessageBody: messageBody,
  };

  try {
    await sqs.sendMessage(params).promise();
    res.json({ message: "Message sent successfully" });
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
});

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
