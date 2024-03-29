import { logger } from './common';

declare var process: {
    env: {
        ENV: string;
        HOST: string;
        PORT: number;
        KAFKA_URL: string;
        KAFKA_TOPICS: string;
        KAFKA_GROUP_ID: string;
        MONGO_URL: string;
    };
};

class Config {
    ENV: string = process.env.ENV;
    HOST: string = process.env.HOST;
    PORT: number = process.env.PORT;
    KAFKA_URL: string = process.env.KAFKA_URL;
    KAFKA_TOPICS: string[] = process.env.KAFKA_TOPICS
        ? process.env.KAFKA_TOPICS.split(',')
        : [];
    KAFKA_GROUP_ID: string = process.env.KAFKA_GROUP_ID;
    MONGO_URL: string = process.env.MONGO_URL;
}

export default new Config();
