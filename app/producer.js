// https://kafka.js.org/docs/producing

const { kafka } = require("./client");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function init() {
  const producer = kafka.producer();
  console.log("Producer connecting...");
  await producer.connect();
  console.log("Producer connected!");

  rl.setPrompt("> ");
  rl.prompt();
  rl.on("line", async (line) => {
    console.log("Sending message...");
    await producer.send({
      topic: "analytics",
      messages: [
        {
          partition: hasOnlyNumbers(line) ? 0 : 1, // messages with only numbers will go to partition 0, otherwise to partition 1
          value: line,
        },
      ],
    });
    console.log("Message sent!");
  }).on("close", async () => {
    console.log("Disconecting producer...");
    await producer.disconnect();
    process.exit(0);
  });
}

init();

function hasOnlyNumbers(inputString) {
  var digitsRegex = /^[0-9]+$/;
  return digitsRegex.test(inputString);
}
