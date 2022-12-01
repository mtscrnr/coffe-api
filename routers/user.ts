import { Router } from 'express';
import UserController from './../controllers/User';

const router = Router();
const userController = new UserController();

router.get('/:id', userController.readOne);
router.post('/', userController.create);
router.put('/:id', userController.update);
router.delete('/:id', userController.delete);

export default router;