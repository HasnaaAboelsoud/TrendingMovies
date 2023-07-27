import axios from 'axios';
import React, { useState } from 'react'
import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Loading from '../Loading/Loading';

export default function SimilarMedia() {
    const [items,setItems]=useState([]);
    const {mediaType}= useParams();
    const [loading,setLoading]=useState(false);

    async function GetSimilar(){
        try {
            setLoading(true);
            const {data}= await axios(`https://api.themoviedb.org/3/${mediaType}/346698/similar?api_key=1931e7e27655b416a2b7d6c124b40d73`);
            setItems(data.results)
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(()=>{
        GetSimilar();
    },[])
    return (<div className='mt-4 mb-5 pb-5'>
    {items && !loading?<div className="row gy-1">
        <h3 className='fw-bolder mb-3'>Similar {mediaType} : </h3>
        {items.map((item,index)=><div key={index} className='col-6 col-md-4 col-lg-3'>
        <Link className='text-decoration-none text-white' to={`/mediaDetails/${item.id}/movie`}>
            <div className="position-relative">
                {item.poster_path !== null || undefined?<img src={`https://image.tmdb.org/t/p/w500`+item.poster_path} className='w-100' alt={item.title}></img>:""}
                <h3 className='h6 mt-1'>{item.title}</h3>
                <h6 className='position-absolute top-0 end-0 bg-info p-1'>{item.vote_average.toFixed(1)}</h6>
            </div>
        </Link>
    </div>)}
    </div>:<Loading/>}
    </div>
)
}
