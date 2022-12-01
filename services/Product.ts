import ProductModel from "../models/Product";
import { Product, productSchema} from "../interfaces/Product";
import Service, { ServiceError } from "./Service";

export default class ProductService extends Service<Product> {
    constructor(model = new ProductModel()) {
        super(model);
    }

    public async create(obj: Product): Promise<Product | ServiceError> {
        const parsed = productSchema.safeParse(obj);
        if (!parsed.success) return {
            error: parsed.error
        };
        return this.model.create(obj);
    }

    public async update(id: string, obj: Product): Promise<Product | null  | ServiceError> {
        const parsed = productSchema.safeParse(obj);
        if (!parsed.success) return {
            error: parsed.error
        };
        return super.update(id, obj);
    }
}