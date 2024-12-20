


import express from "express";
import { UserControllers } from "./user.controller";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "./user.constant";
import validateRequest from "../../middlewares/validateRequest";
import { createUserValidationSchema } from "./user.validation";

const router = express.Router()


// router.post('/create-user', UserControllers.createUser)
router.post('/create-user', auth(USER_ROLE.user), validateRequest(createUserValidationSchema), UserControllers.createUser);

router.get('/', UserControllers.getAllUsers);

// router.get('/:userId', UserControllers.getSingleUser);
router.get('/:id', UserControllers.getSingleUser);

router.patch('/:id', UserControllers.updateUser);

router.delete('/:id', UserControllers.deleteUser) ;

export const UserRoutes = router;


