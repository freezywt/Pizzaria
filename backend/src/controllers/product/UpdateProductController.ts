import { Request, Response } from 'express';
import { UpdateProductService } from '../../services/product/UpdateProductService';

class UpdateProductController {
  async handle(req: Request, res: Response) {
    const { name, price, description, category_id, product_id } = req.body;


    const updateProductService = new UpdateProductService();

    if (!req.file) {
      throw new Error('error upload file')
    } else {
      const { originalname, filename: banner } = req.file;

      const product = await updateProductService.execute({
        product_id,
        name,
        price,
        description,
        banner,
        category_id,
      });
      return res.json(product);
    }
  }
}

export { UpdateProductController }
