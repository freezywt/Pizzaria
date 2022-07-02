import { useContext } from 'react'
import styles from './styles.module.scss'
import Link from 'next/link'

import { FiLogOut } from 'react-icons/fi'

import { AuthContext } from '../../contexts/AuthContext'

export function Header() {
    const { signOut } = useContext(AuthContext)

    return (
        <header className={styles.headerContainer}>
            <div className={styles.headerContent}>
                <Link href="/dashboard">
                    <img src="./logo.svg" width={190} height={60} />
                </Link>

                <nav className={styles.menuNav}>
                    <Link href='/category'>
                        <a>Categoria</a>
                    </Link>
                    <Link href='/products'>
                        <a>Produtos</a>
                    </Link>
                    <Link href='/newproduct'>
                        <a>Cardapio</a>
                    </Link>

                    <button onClick={signOut}>
                        <FiLogOut color="#3C3A3B" size={24} />
                    </button>
                </nav>
            </div>
        </header>
    )
}