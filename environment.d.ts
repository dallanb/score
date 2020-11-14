declare global {
    namespace NodeJS {
        interface ProcessEnv {
            ENV: string;
            PORT: number;
            KAFKA_HOST: string;
            KAFKA_PORT: number;
            KAFKA_TOPICS: string;
            MONGO_URL: string;
        }
    }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};
