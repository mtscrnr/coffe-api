import { Router } from 'express';
import tokenVerify from '../middlewares/tokenVerify';
import UserController from './../controllers/User';

const router = Router();
const userController = new UserController();

router.get('/:id', userController.readOne);
router.post('/', userController.create);
router.put('/:id', tokenVerify, userController.update);
router.delete('/:id', tokenVerify, userController.delete);
router.post('/login', userController.login);

export default router;