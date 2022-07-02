import { Request, Response } from 'express';
import { RemoveProductService } from '../../services/product/RemoveProductService';
import { RemoveImageProductService } from '../../services/product/RemoveImageProductService';
import fs from 'fs';

class RemoveProductController {
  async handle(req: Request, res: Response) {
    const product_id = req.query.product_id as string;

    const removeImage = new RemoveImageProductService();
    const removeProduct = new RemoveProductService();

    const productbanner = await removeImage.execute({
      product_id,
    })

    fs.unlinkSync(__dirname + '/' + '..' + '/' + '..' + '/' + '..' + '/' + 'images' + '/' + productbanner.banner)

    const product = await removeProduct.execute({
      product_id,
    })

    return [productbanner, product];
  }
}

export { RemoveProductController }