import React, { useEffect } from 'react'
import CategoriaComida from './categoriaComida'
import { PRODUCTS } from './productos'

export default function CategoriaHogar() {

  useEffect(() =>{
    document.title="Hogar"
  })

  return (
    <div>
      <CategoriaComida baseInfo={PRODUCTS} type={"Hogar"}/>
    </div>

  )
}
