// import { Kafka } from "kafkajs";
// import { Buffer } from "buffer";
// import { useEffect } from "react";


export const KafkaJS = () => {
  
  // window.Buffer = Buffer;
  
  // const kafka = new Kafka({
  //   clientId: "provision",
  //   ssl: true,
  //   brokers: ["KAFKA_PORT:9092"],
  // });
  
  // const producer = kafka.producer();

  // useEffect(()=>{
  //   producer.connect();
  //   producer.send({
  //     topic: "provision",
  //     messages: [{ value: "Hello World!" }],
  //   });
  // })

  return (
    <div className="flex flex-col justify-center items-center h-[100vh] w-full gap-5">
      <h1 className="text-3xl font-bold">Kafka</h1>
    </div>
  );
};