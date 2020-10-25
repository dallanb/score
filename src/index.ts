import { App, Libs, Middlewares, Routes } from './providers';
import { logger } from './common';

const run = async () => {
    Middlewares.initBodyParser(App.application);
    Middlewares.initCors(App.application);

    await Libs.initKafkaConsumer();
    await Libs.initKafkaProducer();
    await Libs.initMongo();

    // routes
    Routes.init(App.application);

    // middlewares
    Middlewares.initErrorHandler(App.application);
    Middlewares.initNotFoundHandler(App.application);

    App.listen();
};

run()
    .then(() => logger.info('App Ready'))
    .catch((err) => logger.error('App Not Ready', err));
