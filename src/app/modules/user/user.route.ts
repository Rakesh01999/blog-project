


import express from "express";
import { UserControllers } from "./user.controller";

const router = express.Router()


router.post('/create-user', UserControllers.createUser)

router.get('/', UserControllers.getAllUsers);

// router.get('/:userId', UserControllers.getSingleUser);
router.get('/:id', UserControllers.getSingleUser);

router.patch('/:id', UserControllers.updateUser);

router.delete('/:id', UserControllers.deleteUser) ;

export const UserRoutes = router;


