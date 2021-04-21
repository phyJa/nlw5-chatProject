import { Router } from "express";
import { getCustomRepository } from "typeorm";
import { SettingsRespository } from "./repositories/SettingsRepository";

const routes = Router();

routes.post(
    "/settings",
    async (request, response) => {
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
        return response.json({settings});
    }
);

export { routes };