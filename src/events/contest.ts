import { Message } from 'kafka-node';
import { Constants } from '../common';
import { Score as ScoreModel } from '../models';

class ContestEvent {
    handleEvent = async (key: Message['key'], value: Message['value']) => {
        console.log(key);
        console.log(value);
        const data =
            typeof value === 'string' ? JSON.parse(value) : value.toString();
        switch (key) {
            case Constants.EVENTS.CONTESTS.CONTEST_CREATED: {
                const status = await ScoreModel.create({
                    contest_uuid: data.uuid,
                    status: 'active',
                });
                console.log(status);
                break;
            }
        }
    };
}

export default new ContestEvent();
