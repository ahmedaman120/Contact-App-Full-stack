import { Application, Request, Response } from "express";
import { ContactController } from "../controllers/contact.controller";
import authenticateToken from "../middlewares/auth.middleware";

export class ContactRoutes{
    static contactController: ContactController = new ContactController()
    public router(app: Application){
        app
        .get("/api/contacts",authenticateToken,ContactRoutes.contactController.getContacts)
        .post("/api/contact", authenticateToken,ContactRoutes.contactController.createContact)
        .patch("/api/contact/:id",authenticateToken, ContactRoutes.contactController.updateContact)
        .delete("/api/contact/:id",authenticateToken, ContactRoutes.contactController.deleteContact);
    }
}