import prismaClient from '../../prisma';

interface ProductRequest {
    product_id: string;
}

class RemoveProductService {
    async execute({ product_id }: ProductRequest) {
        const product = prismaClient.product.delete({
            where: {
                id: product_id
            }
        })
        return product
    }
}

export { RemoveProductService }