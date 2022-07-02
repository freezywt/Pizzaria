import { useState, useContext } from 'react'

import styles from './styles.module.scss'
import Head from 'next/head'
import Image from 'next/image'
import { Header } from '../../components/Header'

import Link from 'next/link';

import { canSSRAuth } from '../../utils/canSSRAuth'

import { setupAPIClient } from '../../services/api'

type ItemProps = {
    id: string
    name: string
    banner: string
}

interface CategoryProps {
    productsList: ItemProps[]
}

export default function Product({ productsList }: CategoryProps) {
    const [products, setProducts] = useState(productsList || [])

    return (
        <>
            <Head>
                <title>Lista De Produtos - Projeto Pizzaria</title>
            </Head>
            <div>
                <Header />
                <main className={styles.container}>
                    <div className={styles.productsList}>
                        {products.map((item) => {
                            return (
                                <Link key={item.id} href={`/updateProduct?item_id=${item.id}`}>
                                    <Image src={`http://localhost:1337/images/` + item.banner} width={190} height={190} alt={item.name} className={styles.productImg} />
                                </Link>
                            )
                        })}
                    </div>
                </main>
            </div>
        </>
    )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
    const apiClient = setupAPIClient(ctx)
    const Products = await apiClient.get('/product/all')

    return {
        props: {
            productsList: Products.data
        }
    }
})