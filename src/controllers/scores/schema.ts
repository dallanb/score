import Joi from 'joi';

const _holeSchema = Joi.object({
    strokes: Joi.number(),
});

const _sheetSchema = Joi.object({
    uuid: Joi.string().guid().required(),
    participant: Joi.string().guid().required(),
    handicap: Joi.number(),
    holes: Joi.object({
        '1': _holeSchema.required(),
        '2': _holeSchema.required(),
        '3': _holeSchema.required(),
        '4': _holeSchema.required(),
        '5': _holeSchema.required(),
        '6': _holeSchema.required(),
        '7': _holeSchema.required(),
        '8': _holeSchema.required(),
        '9': _holeSchema.required(),
        '10': _holeSchema.required(),
        '11': _holeSchema.required(),
        '12': _holeSchema.required(),
        '13': _holeSchema.required(),
        '14': _holeSchema.required(),
        '15': _holeSchema.required(),
        '16': _holeSchema.required(),
        '17': _holeSchema.required(),
        '18': _holeSchema.required(),
    }),
});

export const updateSchema = Joi.object({
    status: Joi.string().valid('pending', 'active', 'inactive'),
    sheet: Joi.array().items(_sheetSchema.required()),
});
