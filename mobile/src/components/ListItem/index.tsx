import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'

import { api } from '../../services/api'

import { Feather } from '@expo/vector-icons'

interface ItemProps {
    data: {
        id: string
        product_id: string
        name: string
        banner: string
        amount: string | number
    }
    deleteItem: (item_id: string) => void
}

export function ListItem({ data, deleteItem }: ItemProps) {
    function handleDeleteItem() {
        deleteItem(data.id)
    }

    return (
        <View style={styles.container}>
            <Text style={styles.item}>• {data.name} ({data.amount})</Text>

            <TouchableOpacity onPress={handleDeleteItem}>
                <Feather name='trash-2' color='#ff3f4b' size={25} />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f9f9f9',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginBottom: 12,
        paddingVertical: 12,
        paddingHorizontal: 12,
        borderRadius: 3,
        elevation: 2,
    },
    banner: {
        width: '20px'
    },
    item: {
        color: '#8E8E8E'
    },
})