import {Request, Response} from "express";
import {authService} from "../service/authService.js";


export class AuthController {

     register = async (req: Request, res: Response) => {
          try {
               await authService.registration(req.body.userName, req.body.password, req.body.email)
          } catch (e: any) {
               res.send(e.message)
          }
     }
}

