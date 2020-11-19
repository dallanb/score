import Joi from 'joi';

class ScoreSchema {
    _holeCreateSchema = Joi.object({
        name: Joi.string().allow(null),
        strokes: Joi.number().integer().allow(null),
        uuid: Joi.string().guid().required(),
        distance: Joi.number().integer().required(),
        par: Joi.number().integer().required(),
    });
    _holeUpdateSchema = Joi.object({
        name: Joi.string().allow(null),
        strokes: Joi.number().integer().allow(null),
        uuid: Joi.string().guid(),
        distance: Joi.number().integer(),
        par: Joi.number().integer(),
    });

    _sheetSchema = Joi.object({
        uuid: Joi.string().guid().required(),
        participant: Joi.string().guid().required(),
        handicap: Joi.number().integer().allow(null),
        status: Joi.string()
            .valid('pending', 'accepted', 'rejected')
            .required(),
        holes: Joi.object({
            '1': this._holeCreateSchema.required(),
            '2': this._holeCreateSchema.required(),
            '3': this._holeCreateSchema.required(),
            '4': this._holeCreateSchema.required(),
            '5': this._holeCreateSchema.required(),
            '6': this._holeCreateSchema.required(),
            '7': this._holeCreateSchema.required(),
            '8': this._holeCreateSchema.required(),
            '9': this._holeCreateSchema.required(),
            '10': this._holeCreateSchema.required(),
            '11': this._holeCreateSchema.required(),
            '12': this._holeCreateSchema.required(),
            '13': this._holeCreateSchema.required(),
            '14': this._holeCreateSchema.required(),
            '15': this._holeCreateSchema.required(),
            '16': this._holeCreateSchema.required(),
            '17': this._holeCreateSchema.required(),
            '18': this._holeCreateSchema.required(),
        }),
    });

    updateSchema = Joi.object({
        status: Joi.string().valid(
            'pending',
            'active',
            'inactive',
            'completed'
        ),
        sheet: Joi.array().items(this._sheetSchema.required()),
    });

    updateSheetSchema = Joi.object({
        status: Joi.string().valid('pending', 'approved', 'rejected'),
        handicap: Joi.number(),
    });

    updateHoleSchema = this._holeUpdateSchema;
}

export default new ScoreSchema();
