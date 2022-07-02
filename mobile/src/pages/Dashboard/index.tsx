import React, { useState } from 'react'
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ActivityIndicator,
} from 'react-native'

import { useNavigation } from '@react-navigation/native'

import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { StackParamsList } from '../../routes/app.routes'

import { api } from '../../services/api'

export default function Dashboard() {
  const navigation = useNavigation<NativeStackNavigationProp<StackParamsList>>()

  const [number, setNumber] = useState('')
  const [loading, setLoading] = useState(false)

  async function openOrder() {
    setLoading(true)

    if (number === '') {
      return;
    }

    try {
      const response = await api.post('/order', {
        table: Number(number),
      })

      navigation.navigate('Order', { number: number, order_id: response.data.id })

      setNumber('')
      setLoading(false)
    } catch {
      setLoading(false)
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Novo pedido</Text>
      <TextInput
        placeholder='Número da mesa'
        placeholderTextColor='#8E8E8E'
        keyboardType='numeric'
        value={number}
        onChangeText={setNumber}
        style={styles.input}
      />

      <TouchableOpacity style={styles.button} onPress={openOrder}>
        {loading ? (
          <ActivityIndicator size={25} color='#1d1d2e' Ty />
        ) : (
          <Text style={styles.buttonText}>Abrir mesa</Text>
        )}
      </TouchableOpacity>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 15,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#3C3A3B',
    marginBottom: 24,
  },
  input: {
    width: '90%',
    height: 60,
    backgroundColor: '#f9f9f9',
    elevation: 2,
    borderRadius: 4,
    paddingHorizontal: 8,
    textAlign: 'center',
    fontSize: 22,
    color: '#8E8E8E',
  },
  button: {
    width: '90%',
    height: 40,
    backgroundColor: '#FFC448',
    borderRadius: 4,
    marginVertical: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  }
})
