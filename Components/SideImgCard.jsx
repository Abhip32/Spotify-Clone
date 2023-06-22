"use client"
import React from 'react'
import Link from 'next/link';

const SideImgCard = ({heading,url,navi}) => {
  return (
    <div>
        <Link href={navi} class="flex flex-row items-center backdrop-blur-sm bg-black rounded-lg shadow md:flex-row w-[300px] p-2 hover:bg-black-100">
        <img class="object-cover rounded-lg h-20 w-20" src={url.src} alt=""/>
        <div class="flex flex-col justify-between p-4 leading-normal">
        <h5 class="mb-2 text-md font-bold tracking-tight text-white">{heading}</h5>
    </div>
    </Link>
    </div>
  )
}

export default SideImgCard