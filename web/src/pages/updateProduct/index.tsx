import { useState, ChangeEvent, FormEvent, useContext, useEffect } from 'react'

import styles from '../newproduct/styles.module.scss'
import Head from 'next/head'
import { Header } from '../../components/Header'

import Router from 'next/router'
import { useRouter } from 'next/router'

import { canSSRAuth } from '../../utils/canSSRAuth'

import { FiUpload } from 'react-icons/fi'

import { setupAPIClient } from '../../services/api'

import { toast } from 'react-toastify'

type ItemProps = {
    id: string
    name: string
}

interface CategoryProps {
    categoryList: ItemProps[]
}

export default function Product({ categoryList }: CategoryProps) {

    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [description, setDescription] = useState('')

    const [avatarUrl, setAvatarUrl] = useState('');
    const [imageAvatar, setImageAvatar] = useState(null);

    const [categories, setCategories] = useState(categoryList || [])
    const [categorySelected, setCategorySelected] = useState(0)

    const router = useRouter()

    useEffect(() => {
        async function updateProduct() {
            const apiClient = setupAPIClient()
            const data = new FormData()
            const item_id = router.query.item_id
            const responseProduct = await apiClient.get(`/product/exact?item_id=${item_id}`)
            const { name, price, description, banner, category_id } = responseProduct.data
            let categoryFilter = categories.filter(result => result.id.match(category_id));

            setName(name)
            setPrice(price)
            setDescription(description)
            setCategories(categoryFilter)
            setAvatarUrl(`http://localhost:1337/images/${banner}`)
        }

        updateProduct()
    }, [])

    function handleFile(e: ChangeEvent<HTMLInputElement>) {
        if (!e.target.files) {
            return
        }

        const image = e.target.files[0]
        if (!image) {
            return
        }

        if (image.type === 'image/jpeg' || image.type === 'image/png') {
            setImageAvatar(image)
            setAvatarUrl(URL.createObjectURL(image))
        }
    }

    function handleChangeCategory(e: any) {
        setCategorySelected(e.target.value)
    }

    async function handleRegister(event: FormEvent) {
        event.preventDefault();

        try {
            const data = new FormData()
            const item_id = router.query.item_id

            data.append('product_id', item_id as string)
            data.append('name', name)
            data.append('price', price)
            data.append('description', description)
            data.append('category_id', categories[categorySelected].id)
            data.append('file', imageAvatar)

            const apiClient = setupAPIClient()

            await apiClient.put('/product/update', data)
            toast.success('Produto atualizado com sucesso')
        } catch (err) {
            toast.error('Ops erro ao atualizar (verifique todos os campos, e atualize a foto)')
        }
    }

    return (
        <>
            <Head>
                <title>Atualizar produto - Projeto Pizzaria</title>
            </Head>
            <div>
                <Header />
                <main className={styles.container}>
                    <h1>Atualizar Produto</h1>

                    <form className={styles.form} onSubmit={handleRegister}>
                        <label className={styles.labelAvatar}>
                            <span>
                                <FiUpload size={30} color="#8E8E8E" />
                            </span>

                            <input type='file' accept='image/png, image/jpeg' onChange={handleFile} />

                            {avatarUrl && (
                                <img
                                    className={styles.preview}
                                    src={avatarUrl}
                                    alt='Foto do produto'
                                    width={250}
                                    height={250}
                                />
                            )}
                        </label>

                        <select value={categorySelected} onChange={handleChangeCategory}>
                            {categories.map((item, index) => {
                                return (
                                    <option key={item.id} value={index}>
                                        {item.name}
                                    </option>
                                )
                            })}
                        </select>

                        <input
                            type='text'
                            placeholder={`${name}`}
                            className={styles.input}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <input
                            type='text'
                            placeholder={`${price}`}
                            className={styles.input}
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                        <textarea
                            placeholder={`${description}`}
                            className={styles.input}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />

                        <button className={styles.buttonAdd} type='submit'>
                            Atualizar
                        </button>
                    </form>
                </main>
            </div>
        </>
    )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
    const apiClient = setupAPIClient(ctx)
    const response = await apiClient.get('/category')

    return {
        props: {
            categoryList: response.data
        }
    }
})