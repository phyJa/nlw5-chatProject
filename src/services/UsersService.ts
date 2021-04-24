import { getCustomRepository } from "typeorm";
import { UsersRepository } from "../repositories/UsersRepository";

class UsersService {
    async create(email: string) {
        const usersRepository = getCustomRepository(UsersRepository);
        // Verify if the user already exists
        const userAlreadyExists = usersRepository.findOne({ email });
        // If user already exists, return them
        if(userAlreadyExists)
            return userAlreadyExists;
        // Else, add them to the database and return them
        const user = usersRepository.create({ email });
        await usersRepository.save(user);
        return user;
    }
}

export { UsersService };