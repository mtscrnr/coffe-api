import { Request, Response } from 'express';
import { Product } from '../interfaces/Product';
import ProductService from '../services/Product';
import Controller, { RequestWithBody, ResponseError } from './Controller';

export default class ProductController extends Controller<Product> {
    private product: ProductService;

    constructor(
        product: ProductService = new ProductService()
    ) {
        super(product);
        this.product = product;
   }

   create = async (req: RequestWithBody<Product>, res: Response<Product | ResponseError>): Promise<typeof res> => {
        try {
              const data = await this.product.create(req.body);
              if('error' in data) return res.status(400).json(data);
              return res.json(data);
         } catch (error) {
              return res.status(500).json({ error: this.errors.internal });
         }
    }

    readOne = async (req: Request<{ id: string }>, res: Response<Product | ResponseError>): Promise<typeof res> => {
        try {
            const data = await this.product.readOne(req.params.id);
            if(!data) {
                return res.status(404).json({ error: this.errors.notFound });
            }
            return res.json(data);
        } catch (error) {
            return res.status(500).json({ error: this.errors.internal });
        }
    }
    
    update = async (req: RequestWithBody<Product>, res: Response<Product | ResponseError>): Promise<typeof res> => {
        try {
            const { id } = req.params;
            const data = await this.product.update(id, req.body);

            return res.json(data!);
        } catch (error) {
            return res.status(500).json({ error: this.errors.internal });
        }
    }

    delete = async (req: Request<{ id: string }>, res: Response<Product | ResponseError>): Promise<typeof res> => {
        try {
            const data = await this.product.delete(req.params.id);
            if (!data) {
                return res.status(404).json({ error: this.errors.notFound });
            }
            return res.json(data);
        } catch (error) {
            return res.status(500).json({ error: this.errors.internal });
        }
    }
}
