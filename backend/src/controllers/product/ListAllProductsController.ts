import { Request, Response } from 'express';
import { ListAllProductsService } from '../../services/product/ListAllProductsService';

class ListAllProductsController {
    async handle(req: Request, res: Response) {
        const listAllProducts = new ListAllProductsService();
        const product = await listAllProducts.execute();

        return res.json(product);
    }
}

export { ListAllProductsController }