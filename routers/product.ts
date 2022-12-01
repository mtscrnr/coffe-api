import { Router } from 'express';
import ProductController from '../controllers/Product';
const router = Router();
const productController = new ProductController();

router.get('/', productController.read);
router.get('/:id', productController.readOne);
router.post('/', productController.create);
router.put('/:id', productController.update);
router.delete('/:id', productController.delete);

export default router;
