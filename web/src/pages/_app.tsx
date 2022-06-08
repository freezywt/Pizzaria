import '../../styles/globals.scss'
import { AppProps } from 'next/app'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { AuthProvider } from '../contexts/AuthContext'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Component {...pageProps} /> 
      <ToastContainer autoClose={3000}/>
    </AuthProvider>
  )
}

export default MyApp
