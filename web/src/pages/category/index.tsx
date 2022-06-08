import { useState, FormEvent } from 'react'
import Head from 'next/head'
import { Header } from '../../components/Header'
import styles from './styles.module.scss'

import { setupAPIClient } from '../../services/api'
import { toast } from 'react-toastify'

import { canSSRAuth } from '../../utils/canSSRAuth'

export default function Category(){
    const [ name, setName ] = useState('')

    async function handleRegister(event: FormEvent){
        event.preventDefault()

        if(name === ''){
            return
        }

        const apiClient = setupAPIClient()
        apiClient.post('/category', {
            name: name
        })

        toast.success('Categoria cadastrada com sucesso!')
        setName('')
    }

    return(
        <>
            <Head>
                <title>Nova categoria - Projeto Pizzaria</title>
            </Head>
            <Header />
            <div className={styles.container}>
                <h1>Cadastrar categoria</h1>

                <form className={styles.form} onSubmit={handleRegister}>
                    <input
                        type="text" 
                        placeholder="Digite o nome da categoria"
                        className={styles.input}
                        value={name}
                        onChange={ (e) => setName(e.target.value) }
                    />

                    <button type="submit" className={styles.buttonAdd}>
                        Cadastrar
                    </button>
                </form>
            </div>
        </>
    )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
    return {
        props: {}
    }
})