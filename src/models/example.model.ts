import { Schema, Model, model, Document } from 'mongoose';

export interface IExample extends Document {
    name: string;
    creted : Date;
}

export var ExampleSchema: Schema = new Schema({
    name: {
        type: Schema.Types.String,
        required: true
    },
    created : {
        type: Schema.Types.String,
        default: Date.now()
    }
});

export const Example: Model<IExample> = model<IExample>('Example', ExampleSchema);
