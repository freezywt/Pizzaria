import prismaClient from '../../prisma';

class ListExactProductService {
    async execute({ item_id }) {
        const ExactProduct = await prismaClient.product.findUnique({
            where: {
                id: item_id
            }
        })
        return ExactProduct;
    }
}

export { ListExactProductService }