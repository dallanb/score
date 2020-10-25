/**
 * External dependencies
 */
import * as mongoose from 'mongoose';
import { generateUUID } from '../common/utils';
/**
 * Create the score schema
 */
const score: mongoose.Schema = new mongoose.Schema(
    {
        uuid: {
            type: String,
            required: true,
            default: generateUUID,
        },
        contest_uuid: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            required: true,
        },
        sheet: {
            type: Array,
            required: false,
        },
    },
    {
        timestamps: {
            createdAt: 'ctime',
            updatedAt: 'mtime',
        },
    }
);
/**
 * Export the model
 */
export default mongoose.model('Score', score);
