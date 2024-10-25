import mongoose, { Document, Model, Schema } from "mongoose";

export interface IContactSchema extends Document{
    name: string,
    phoneNumber: string,
    address: string,
    notes: string,
    status: boolean,
}

export interface IContactModel extends Model<IContactSchema>{}

const contactSchema: Schema<IContactSchema>= new Schema({
    name: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
        unique: true
    },
    address: {
        type: String, 
        required: false,
    },
    notes: {
        type: String, 
        required: false,
    },
    status: {
        type: Boolean,
        default: true,
    }
})

export const ContactModel= mongoose.model<IContactSchema,IContactModel>("contacts",contactSchema)