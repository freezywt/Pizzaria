import { Request, Response } from 'express';
import { ListCategoryService } from '../../services/category/ListCategoryServices';

class ListCategoryController{
    async handle(req: Request, res: Response){
        const listCategoryService = new ListCategoryService();
        const category = await listCategoryService.execute();

        return res.json(category);
    }
}

export { ListCategoryController }