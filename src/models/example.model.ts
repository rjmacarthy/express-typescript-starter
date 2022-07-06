import { Document, Model, model, Schema } from 'mongoose'

export interface IExample extends Document {
  name: string
  creted: Date
}

export let ExampleSchema: Schema = new Schema({
  name: {
    type: Schema.Types.String,
    required: true,
  },
  created: {
    type: Schema.Types.String,
    default: Date.now(),
  },
})

export const Example: Model<IExample> = model<IExample>(
  'Example',
  ExampleSchema,
)
