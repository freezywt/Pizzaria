import prismaClient from '../../prisma';

interface ProductRequest {
    product_id: string;
}

class RemoveImageProductService {
    async execute({ product_id }: ProductRequest) {
        const productbanner = prismaClient.product.findUnique({
            where: {
                id: product_id
            }
        })
        return productbanner
    }
}

export { RemoveImageProductService }