import chunky from './imagenes/chunky.jpg'
import purina from './imagenes/purinacat.jpg'
import hueso from './imagenes/huesomasticable.webp'

export const PRODUCTS = [
    {
        id: 1,
        productName: "Concentrado Chunky",
        precio: 999999,
        productImage: chunky,
        category : "Perro",
        type: "Comida"
    },
    {
        id: 2,
        productName: "Purina Cat Chow",
        precio: 2000,
        productImage: purina,
        category : "Gato",
        type: "Comida",
    },
    {
        id: 3,
        productName: "Hueso masticable",
        precio: 50000,
        productImage: hueso,
        category : "Perro",
        type: "Arena",
    }
]