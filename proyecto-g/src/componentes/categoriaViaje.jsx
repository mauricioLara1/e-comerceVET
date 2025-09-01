import React, { useEffect } from 'react'
import CategoriaComida from './categoriaComida'
import { PRODUCTS } from './productos'

export default function CategoriaViaje() {

  useEffect(() =>{
    document.title="Viaje"
  })

  return (
    <div>
    <CategoriaComida baseInfo={PRODUCTS} type={"Viaje"}/>
    </div>
  )
}
