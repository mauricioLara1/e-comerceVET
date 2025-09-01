import React, { useEffect } from 'react'
import CategoriaComida from './categoriaComida'
import { PRODUCTS } from './productos'

export default function CategoriaJuguetes() {

  useEffect(() =>{
    document.title = "Jueguetes"
  })

  return (
    <div >
    <CategoriaComida baseInfo={PRODUCTS} type={"Juguete"}/>
    </div>
  )
}
