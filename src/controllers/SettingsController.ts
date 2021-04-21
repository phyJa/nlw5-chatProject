import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { SettingsRespository } from "../repositories/SettingsRepository";

class SettingsController {
    async create(request: Request, response: Response) {
        const { chat, username } = request.body;

        const settingsRespository = getCustomRepository(SettingsRespository);
        /**
         * This line executes the constructor of the entity
         * and creates a representation of it in the code
         */
        const settings = settingsRespository.create({
            chat,
            username
        });
        // Save 
        await settingsRespository.save(settings);
        return response.status(201).json({settings});
    }
}

export { SettingsController };