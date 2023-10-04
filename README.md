# kafka-node

This repo demonstrates a simple Node.js app that is using kafka with `Kafka.js`.

The producer has a topic named `analytics`. This topic has two partition. We want to store data coming in producer based on data content. If the data consists of all digit then we want to store it in partition 0 otherwise in partition 1.

<img width="1024" alt="image" src="https://github.com/NafiAsib/kafka-node/assets/38901581/3bc25976-ea30-473e-80e7-48441deda675">

The app has the following structure:

```
├── app
│   ├── admin.js
│   ├── client.js
│   ├── consumer.js
│   ├── node_modules
│   ├── package.json
│   ├── pnpm-lock.yaml
│   └── producer.js
├── docker-compose.yml
```

Please note that the following code in `producer.js` is used for creating command-line interfaces (CLIs) in Node.js, allowing users to input data interactively through the console.

```javascript
çconst rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
```

Similarly, in `consumer.js` the following code is used to take command line arguement from the console.

```javascript
const group = process.argv[2];
```

**These are not specific to kafka implementation**

## Running locally

- Initial setup

```bash
git clone git@github.com:NafiAsib/kafka-node.git
docker compose up -d # make sure to change IP to your device's private IP in docker-compose.yml
cd app
pnpm i
node admin.js
```

![node-admin](https://github.com/NafiAsib/kafka-node/assets/38901581/990e57fd-b5cb-476e-a6a0-08d3a571ba3d)

- Start Producer & start sending message

```bash
node producer.js
```

This'll start an interactive shell session. Type your messages and press `Enter`

- You can start consumers with the following command

```bash
node consumer.js <consumer-group-name>
```

If you run multiple consumer with same `<consumer-group-name>`, kafka will start auto balancing.

## Demo

<img width="1156" alt="image" src="https://github.com/NafiAsib/kafka-node/assets/38901581/57f6c649-fbea-46a9-8840-a69ea278ec52">

Here we have two consumer group, `group-1` & `group-2`. `group-1` has only one consumer, thus all message are going to that consumer. `group-2` has two consumer. So, one consumer is consuming partition 0 another one is consuming partition 1

<img width="1019" alt="image" src="https://github.com/NafiAsib/kafka-node/assets/38901581/ca93ec55-fc28-42cd-b635-f1ccee4285cd">
