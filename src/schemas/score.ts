import Joi from 'joi';

class ScoreSchema {
    _holeSchema = Joi.object({
        strokes: Joi.number().integer().allow(null),
    });

    _sheetSchema = Joi.object({
        uuid: Joi.string().guid().required(),
        participant: Joi.string().guid().required(),
        handicap: Joi.number().integer().allow(null),
        holes: Joi.object({
            '1': this._holeSchema.required(),
            '2': this._holeSchema.required(),
            '3': this._holeSchema.required(),
            '4': this._holeSchema.required(),
            '5': this._holeSchema.required(),
            '6': this._holeSchema.required(),
            '7': this._holeSchema.required(),
            '8': this._holeSchema.required(),
            '9': this._holeSchema.required(),
            '10': this._holeSchema.required(),
            '11': this._holeSchema.required(),
            '12': this._holeSchema.required(),
            '13': this._holeSchema.required(),
            '14': this._holeSchema.required(),
            '15': this._holeSchema.required(),
            '16': this._holeSchema.required(),
            '17': this._holeSchema.required(),
            '18': this._holeSchema.required(),
        }),
    });

    updateSchema = Joi.object({
        status: Joi.string().valid('pending', 'active', 'inactive'),
        sheet: Joi.array().items(this._sheetSchema.required()),
    });
}

export default new ScoreSchema();
