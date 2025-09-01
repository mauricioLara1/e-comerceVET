import React, { createContext, useState } from 'react'
import { PRODUCTS } from '../productos';

export const ShopContext = createContext(null);

const getDetalleCompra = () => {
    let detalle = {}
    for (let i = 1; i < PRODUCTS.length + 1; i++) {
        detalle[i] = 0
    }
    return detalle
}



export const ShopContextProvider = ({ children }) => {

    const [detalleCompra, setDetalleCompra] = useState(getDetalleCompra());

    const preFiltrar = (products, type) =>{
        return products.filter(product =>{
            return (
                product.type === type
            )
        })
    }


    const [filtro, setFiltro] = useState({
        category: "all"
    })

    const filtrarProductos = (products, type) => {
        return products.filter(product => {
            return (
                filtro.category === "all" ||
                product.category === filtro.category ||
                product.type === type
            )
        })
    }

    const handleCategory = (event) => {
        setFiltro(prevState => ({
            ...prevState, category: event.target.value
        }))
    }



    const agregarProducto = (productoId) => {
        setDetalleCompra((prev) => ({ ...prev, [productoId]: prev[productoId] + 1 }))
    }

    const removerProducto = (productoId) => {
        setDetalleCompra((prev) => ({ ...prev, [productoId]: prev[productoId] - 1 }))
    }

    const getCantidadProductos = () => {
        let cantidad = 0
        for (const item in detalleCompra) {
            if (detalleCompra[item] > 0) {
                // let itemInfo = PRODUCTS.find((product) => product.id === Number(item))
                cantidad += detalleCompra[item]
            }
        }
        return cantidad
    }

    const getSubtotalProductos = () => {
        let cantidad = 0
        for (const item in detalleCompra) {
            if (detalleCompra[item] > 0) {
                let itemInfo = PRODUCTS.find((product) => product.id === Number(item))
                cantidad += detalleCompra[item] * itemInfo.precio
            }
        }
        return cantidad
    }


    const contextValue = { detalleCompra, agregarProducto, removerProducto, getSubtotalProductos, getCantidadProductos, filtrarProductos, handleCategory, preFiltrar, }

    console.log(detalleCompra)

    return (
        <ShopContext.Provider value={contextValue}>
            {children}
        </ShopContext.Provider>
    )

};
