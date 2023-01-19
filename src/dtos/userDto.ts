import {UserAttributes} from "../models/models.js";

export class UserDto {
    userName: string
    email: string
    role: string
    constructor(model: UserAttributes) {
        this.userName = model.userName
        this.email = model.email
        this.role = model.role
    }
}