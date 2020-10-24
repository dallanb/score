import { KafkaConsumer, KafkaProducer, MongoDB } from '../libs';
import { Constants } from '../common';
import { Message } from 'kafka-node';
import { Score } from '../services';

class Libs {
    mongo: any;
    consumer: any;
    producer: any;

    constructor() {
        this.consumer = undefined;
        this.producer = undefined;
        this.mongo = undefined;
    }

    async initKafkaConsumer(): Promise<void> {
        this.consumer = new KafkaConsumer(({ topic, key, value }: Message) => {
            switch (topic) {
                case Constants.TOPICS.CONTESTS:
                    Score.handleEvent(key, value);
                    break;
                default:
                    throw new Error('Invalid topic');
            }
        });
        this.consumer.run();
    }

    async initKafkaProducer(): Promise<void> {
        this.producer = new KafkaProducer();
        await this.producer.run();
    }

    async initMongo(): Promise<void> {
        this.mongo = MongoDB;
        await this.mongo.connect();
    }
}

export default new Libs();
