import { ContactRepository } from "../db/repository/contact.repository";
import { ICreateContact } from "../interfaces/create-contact.request";

export class ContactService {
    private  contactReposiotry: ContactRepository = ContactRepository.getContactRepositoryObj();
    constructor(){
    }

    async createContact(contact: ICreateContact){
        try {
            console.log(contact);
            const contactDB= await this.contactReposiotry.create(contact);
            return contactDB;
        } catch (error) {
            console.error(error)
            throw error;
        }
    }

    async getContacts(page: number){
        try {
            const contacts= await this.contactReposiotry.read(page);
            return contacts;
        } catch (error) {
            throw error;
        }
    }

    async updateContact(id: string, contact: any){
        try {
            //TODO: Notify All Connected clients to lock update with this contact id.
            console.log(id,contact)
            const contactAfterUpdate= await this.contactReposiotry.update(id,contact);
            return contactAfterUpdate;
        } catch (error) {
            throw error;
        }
    }

    async deleteContact(id: string){
        try {
            const deleteStatus= await this.contactReposiotry.delete(id);
            return deleteStatus;
        } catch (error) {
            throw error;
        }
    }
}