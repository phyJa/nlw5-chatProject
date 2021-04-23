import { getCustomRepository } from "typeorm";
import { SettingsRespository } from "../repositories/SettingsRepository";

interface ISettingsCreate {
    chat: boolean;
    username: string;
}

class SettingsService {
    async create({ chat, username }: ISettingsCreate) {
        const settingsRespository = getCustomRepository(SettingsRespository);

        /**
         * This is equivalent to:
         * SELECT * FROM settings WHERE username = "username" LIMIT 1
         */
        const userAlreadyExists = await settingsRespository.findOne({ username });

        if(userAlreadyExists)
            throw new Error("User already exists");

        /**
         * This line executes the constructor of the entity
         * and creates a representation of it in the code
         */
        const settings = settingsRespository.create({
            chat,
            username
        });
        // Save in the database
        await settingsRespository.save(settings);
        // Return the new settings
        return settings;
    }
}

export { SettingsService };