import React, { useEffect } from 'react'
import CategoriaComida from './categoriaComida'
import { PRODUCTS } from './productos'

export default function CategoriaSalud() {

  useEffect(()=>{
    document.title="Salud"
  })

  return (
    <div >
      <CategoriaComida baseInfo={PRODUCTS} type={"Salud"}/>
    </div>
  )
}
