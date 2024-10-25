import { Request, Response } from "express";
import { ICreateContact } from "../interfaces/create-contact.request";
import { ContactService } from "../services/contact.service";

export class ContactController{
    private static contactService: ContactService = new ContactService()
    public async createContact(req: Request, res: Response){
        try {
            const createdContact = await ContactController.contactService.
            createContact(req.body)
            res.status(201).send(createdContact);
        } catch (error: any) {
            console.error(error.msg);
            res.status(500).send(error);
        }
        
    }


    public async getContacts(req: Request, res: Response){
        try {
            const contactsPage = await ContactController.contactService.getContacts(<number><unknown>req.query.page)
            res.status(200).send(contactsPage);
        } catch (error: any) {
            console.error(error.msg);
            res.status(500).send(error);
        }
        
    }

    public async updateContact(req: Request, res: Response){
      try {
            const contactAfterUpdate = ContactController.contactService.updateContact(req.params.id, req.body);
            res.status(200).send(contactAfterUpdate);
        } catch (error: any) {
            console.error(error.msg);
            res.status(500).send(error);
        }
    }

    public async deleteContact(req: Request, res: Response){

        try {
            const contactStatus = ContactController.contactService.deleteContact(req.params.id);
            res.status(200).send(contactStatus);
        } catch (error: any) {
            console.error(error.msg);
            res.status(500).send(error);
        }
    }
}