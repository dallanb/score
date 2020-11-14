declare var process: {
    env: {
        ENV: string;
        PORT: number;
        KAFKA_URL: string;
        KAFKA_TOPICS: string;
        MONGO_URL: string;
    };
};

class Config {
    ENV: string = process.env.ENV;
    PORT: number = process.env.PORT;
    KAFKA_URL: string = process.env.KAFKA_URL;
    KAFKA_TOPICS: string[] = process.env.KAFKA_TOPICS
        ? process.env.KAFKA_TOPICS.split(',')
        : [];
    MONGO_URL: string = process.env.MONGO_URL;
}

export default new Config();
