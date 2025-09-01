import React, { createContext, useState, useEffect } from 'react';

// Creación del contexto
export const ShopContext = createContext(null);

// Función para mapear idcategoria a type
function mapCategoryToType(idcategoria) {
    switch (idcategoria) {
        case 1:
            return 'Comida';
        case 2:
            return 'Hogar';
        case 3:
            return 'Juguetes';
        case 4:
            return 'Salud';
        case 5:
            return 'Viaje';
        case 6:
            return 'Paseo';
        default:
            return 'Otros';
    }
}

// Función para mapear idespecie a category
function mapSpeciesToCategory(idespecie) {
    switch (idespecie) {
        case 1:
            return 'Gato';
        case 2:
            return 'Perro';
        default:
            return 'Otros';
    }
}

// Función para convertir un array de bytes a una cadena base64
const convertImage = (foto) => {
    if (!foto) {
        return ''; // Devuelve una cadena vacía si la foto no está definida
    }
    // Convierte un array de bytes a una cadena base64
    return `data:image/jpeg;base64,${btoa(
        new Uint8Array(foto.data).reduce(
            (data, byte) => data + String.fromCharCode(byte),
            ''
        )
    )}`;
};

// Proveedor del contexto
export const ShopContextProvider = ({ children }) => {
    const [productos, setProductos] = useState([]); // Estado para almacenar los productos
    const [detalleCompra, setDetalleCompra] = useState({}); // Estado para almacenar el detalle de la compra

    // Función para obtener los productos desde la API
    const fetchProductos = async () => {
        try {
            const url = `http://localhost:5000/productos/activos`; // URL de la API
            const response = await fetch(url, {
                method: "GET",
                headers: { "Content-Type": "application/json" }
            });
            const data = await response.json();

            // Mapeo de los datos obtenidos a la estructura esperada por el componente
            const mappedData = data.map(item => ({
                id: item.idproducto,
                productName: item.producto,
                precio: item.precioventa,
                productImage: convertImage(item.foto), // Convierte la imagen desde el array de bytes a base64
                category: mapSpeciesToCategory(item.idespecie), // Función para mapear idespecie a category
                type: mapCategoryToType(item.idcategoria) // Función para mapear idcategoria a type
            }));

            // Actualiza el estado con los datos mapeados
            setProductos(mappedData);
        } catch (error) {
            console.log(error.message); // Manejo de errores
        }
    };

    // Llama a fetchProductos cuando el componente se monta
    useEffect(() => {
        fetchProductos();
    }, []);

    // Función para filtrar productos por tipo (primer filtro)
    const preFiltrar = (products, type) => {
        return products.filter(product => product.type === type);
    };

    const [filtro, setFiltro] = useState({ category: "all" }); // Estado para almacenar el filtro seleccionado

    // Función para filtrar productos según el tipo y la categoría seleccionada
    const filtrarProductos = (products, type) => {
        return products.filter(product => 
            filtro.category === "all" || product.category === filtro.category || product.type === type
        );
    };

    // Maneja el cambio de categoría en el filtro
    const handleCategory = (event) => {
        setFiltro(prevState => ({
            ...prevState, category: event.target.value
        }));
    };

    // Función para agregar un producto al detalle de la compra
    const agregarProducto = (productoId) => {
        setDetalleCompra((prev) => {
            const nuevoDetalle = { ...prev };
            if (!nuevoDetalle[productoId]) {
                nuevoDetalle[productoId] = { cantidad: 0, total: 0 };
            }
            if (nuevoDetalle[productoId].cantidad < 10) {
                nuevoDetalle[productoId].cantidad += 1;
                nuevoDetalle[productoId].total = nuevoDetalle[productoId].cantidad * productos.find(p => p.id === productoId).precio;
            }
            return nuevoDetalle;
        });
    };

    // Función para remover un producto del detalle de la compra
    const removerProducto = (productoId) => {
        setDetalleCompra((prev) => {
            const nuevoDetalle = { ...prev };
            if (nuevoDetalle[productoId] && nuevoDetalle[productoId].cantidad > 0) {
                nuevoDetalle[productoId].cantidad -= 1;
                if (nuevoDetalle[productoId].cantidad === 0) {
                    delete nuevoDetalle[productoId];
                } else {
                    nuevoDetalle[productoId].total = nuevoDetalle[productoId].cantidad * productos.find(p => p.id === productoId).precio;
                }
            }
            return nuevoDetalle;
        });
    };

    // Nueva función para actualizar la cantidad de un producto
    const actualizarCantidadProducto = (productoId, cantidad) => {
        if (cantidad < 0) return; // Asegúrate de que la cantidad no sea negativa
        setDetalleCompra((prev) => {
            const nuevoDetalle = { ...prev };
            if (!nuevoDetalle[productoId]) {
                nuevoDetalle[productoId] = { cantidad: 0, total: 0 };
            }
            nuevoDetalle[productoId].cantidad = cantidad;
            nuevoDetalle[productoId].total = cantidad * productos.find(p => p.id === productoId).precio;
            if (nuevoDetalle[productoId].cantidad === 0) {
                delete nuevoDetalle[productoId];
            }
            return nuevoDetalle;
        });
    };

    // Función para obtener la cantidad total de productos en el carrito
    const getCantidadProductos = () => {
        return Object.values(detalleCompra).reduce((acc, item) => acc + item.cantidad, 0);
    };

    // Función para obtener el subtotal de todos los productos en el carrito
    const getSubtotalProductos = () => {
        return Object.values(detalleCompra).reduce((acc, item) => acc + item.total, 0);
    };

    // Valor del contexto que será accesible para los componentes hijos
    const contextValue = {
        productos,
        detalleCompra,
        agregarProducto,
        removerProducto,
        actualizarCantidadProducto,
        getSubtotalProductos,
        getCantidadProductos,
        filtrarProductos,
        handleCategory,
        preFiltrar
    };

    // Retorna el proveedor del contexto con el valor actual
    return (
        <ShopContext.Provider value={contextValue}>
            {children}
        </ShopContext.Provider>
    );
};
