"use client"

import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react'
import { FaAngleDoubleLeft } from "react-icons/fa";
import { FaAngleLeft } from "react-icons/fa";
import { FaAngleDoubleRight } from "react-icons/fa";
import { FaAngleRight } from "react-icons/fa";

interface Props{
    itemsCount: number; //total number of items
    pageSize: number;   //items to fit in a page
    currentPage: number //current page number 
}

const Pagination = ({itemsCount, pageSize, currentPage}: Props) => {

    const totalPages= Math.ceil(itemsCount/pageSize)
    if(totalPages <=1) return null

    const router= useRouter()
    const searchParams= useSearchParams()

    const changePage= (page: number)=>{
        const params= new URLSearchParams(searchParams)
        params.set('page', page.toString())
        router.push('?' + params.toString())
    }

    return (
        <div className='flex items-center gap-x-2 text-lg'>
            <FaAngleDoubleLeft className='cursor-pointer' onClick={()=> changePage(1)}/>
            <FaAngleLeft className='cursor-pointer' onClick={()=> changePage(currentPage -1)}/>

            <h3>Page {currentPage} of {totalPages}</h3>

            <FaAngleRight className='cursor-pointer' onClick={()=> changePage(currentPage +1)}/>
            <FaAngleDoubleRight className='cursor-pointer' onClick={()=> changePage(totalPages)}/>
        </div>
    )
}

export default Pagination
