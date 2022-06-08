import { Request, Response } from 'express';
import { ListOrderService } from '../../services/order/ListOrderService';

class ListOrdersController {
    async handle(req: Request, res: Response){
        const listOrderService = new ListOrderService()
        const orders = await listOrderService.execute()

        return res.json(orders)
    }
}

export { ListOrdersController }