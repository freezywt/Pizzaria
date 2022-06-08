import { Request, Response } from 'express';
import { FinishOrderService } from '../../services/order/FinishOrderService';

class FishOrderController{
    async handle(req: Request, res: Response){
        const { order_id } = req.body;

        const finishOrderService = new FinishOrderService();
        const order = await finishOrderService.execute({
            order_id
        })

        return res.json(order);
    }
}

export { FishOrderController }