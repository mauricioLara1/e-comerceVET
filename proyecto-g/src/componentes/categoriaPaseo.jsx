import React, { useEffect } from 'react'
import CategoriaComida from './categoriaComida'
import { PRODUCTS } from './productos'

export default function CategoriaPaseo() {

  useEffect(() =>{
    document.title="Paseo"
  })

  return (
    <div >
      <CategoriaComida baseInfo={PRODUCTS} type={"Paseo"}/>
    </div>

  )
}
