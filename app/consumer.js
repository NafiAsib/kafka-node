// https://kafka.js.org/docs/consuming

const { kafka } = require("./client");
const group = process.argv[2];

async function init() {
  const consumer = kafka.consumer({ groupId: group });

  console.log("Consumer connecting...");
  await consumer.connect();
  console.log("Consumer connected!");

  await consumer.subscribe({ topics: ["analytics"], fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log({
        group,
        partition,
        topic,
        offset: message.offset,
        value: message.value.toString(),
      });
    },
  });
}

init();
