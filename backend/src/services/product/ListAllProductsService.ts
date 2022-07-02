import prismaClient from '../../prisma';

class ListAllProductsService {
    async execute() {
        const findAll = await prismaClient.product.findMany()
        return findAll;
    }
}

export { ListAllProductsService }