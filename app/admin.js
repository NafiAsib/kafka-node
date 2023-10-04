// https://kafka.js.org/docs/admin

const { kafka } = require("./client");

async function init() {
  const admin = kafka.admin();
  console.log("Admin connecting...");
  await admin.connect();
  console.log("Admin connected!");

  console.log("Topic creating...");
  await admin.createTopics({
    topics: [
      {
        topic: "analytics",
        numPartitions: 2,
      },
    ],
  });
  console.log("Topic created Successfully!");

  console.log("Disconecting admin...");
  await admin.disconnect();
}

init();
