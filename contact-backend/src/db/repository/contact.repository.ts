import { Document, Model } from "mongoose";
import { ContactModel, IContactModel, IContactSchema } from "../contacts.model";

export class ContactRepository {
    private static contactRepository: ContactRepository;
    private constructor(private contactModel: IContactModel
    ) { }

    public static getContactRepositoryObj() : ContactRepository{
        if (this.contactRepository) {
            return this.contactRepository;
        }
        this.contactRepository = new ContactRepository(ContactModel);
        return this.contactRepository;
    }

    async create(obj: any): Promise<IContactSchema| null> {
        try {
            const doc = await this.contactModel.create(obj);
            return doc;
        } catch (error) {
            console.error(error)
            throw error;
        }
    }

    async update(id: string, obj: any): Promise<IContactSchema| null> {
        try {
            const doc = await this.contactModel.findByIdAndUpdate(id, obj, { returnDocument: "after" });
            return doc;
        } catch (error) {
            console.error(error)
            throw error;
        }
    }

    async delete(id: string): Promise<boolean| null> {
        try {
            await this.contactModel.findByIdAndDelete(id);
            return true;
        } catch (error) {
            console.error(error)
            throw error;
        }
    }
    async read(page: number=0,skip: number = 10, limit: number =5): Promise<{data:IContactSchema[], count:number}| null> {
        try {
            const docs = await this.contactModel.find({}, {}, {skip: skip*page, limit});
            const count  = await this.contactModel.countDocuments();
            console.log(docs,count)
            return {data: docs, count:count};
        } catch (error) {
            console.error(error)
            throw error;
        }
    }
    
}