import { logger } from '../../common';
import {
    KafkaClient,
    Producer as KafkaProducer,
    ProduceRequest,
} from 'kafka-node';
import config from '../../config';

class Producer {
    private readonly _client: KafkaClient;
    private _producer?: KafkaProducer;
    private readonly _options: any;

    constructor() {
        this._client = new KafkaClient({
            kafkaHost: config.KAFKA_URL,
        });
        this._producer = undefined;
        this._options = {};
    }

    get producer(): KafkaProducer | undefined {
        return this._producer;
    }

    set producer(producer: KafkaProducer | undefined) {
        this._producer = producer;
    }

    run = (): Promise<any> =>
        new Promise(
            (
                resolve: (value?: any) => void,
                reject: (reason?: any) => void
            ) => {
                this.producer = new KafkaProducer(this._client, this._options);

                this.producer.on('ready', () => {
                    logger.info('Kafka Producer ready');
                    resolve();
                });

                this.producer.on('error', (error: Error) => {
                    logger.error('Kafka Producer error: ', error);
                    reject();
                });
            }
        );

    send = (payload: ProduceRequest[]): Promise<any> =>
        new Promise(
            (resolve: (data: any) => void, reject: (err: Error) => void) => {
                this.producer?.send(payload, (error, data) => {
                    if (error) {
                        reject(error);
                    }
                    resolve(data);
                });
            }
        );
}

export default Producer;
