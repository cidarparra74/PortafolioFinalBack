import { Router } from "express";
import { getUsers, getUserId, postUser, putUser, deleteUserID} from "../controllers/usersController";

const userRouter = Router();

userRouter.get('/', getUsers);
userRouter.get('/:id', getUserId);
userRouter.post('/', postUser);
userRouter.put('/:id', putUser);
userRouter.delete('/:id', deleteUserID);

export default userRouter;