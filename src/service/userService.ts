import {User} from "../models/models.js";

export class UserService {
    async switchToAuthor(userName: string | undefined) {
        try {
            const user = await User.update(
                {
                  role: 'AUTHOR'
                },
                {
                    where: {
                        userName: userName
                    }
                })
        } catch (e) {
            return null;
        }
    };
}

export const userService = new UserService();
