import { Router } from 'express';
import ProductController from '../controllers/Product';
import tokenVerify from '../middlewares/tokenVerify';
import verifyRole from '../middlewares/roleVerify';
const router = Router();
const productController = new ProductController();

router.get('/', productController.read);
router.get('/:id', productController.readOne);
router.post('/', tokenVerify, verifyRole('admin'), productController.create);
router.put('/:id', tokenVerify, verifyRole('admin'), productController.update);
router.delete('/:id', tokenVerify, verifyRole('admin'), productController.delete);

export default router;
