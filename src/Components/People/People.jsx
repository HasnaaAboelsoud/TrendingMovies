import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Loading from '../Loading/Loading';
import axios from 'axios';
import { Helmet } from 'react-helmet';

export default function People() {
    const [tvs,setTvs]=useState([]);
    const [loading,setLoading]=useState(false);
    const pages=new Array(10).fill(1).map((page,index)=>index + 1);

    async function GetPeople(pagenum){
        try {
            setLoading(true);
            const {data}= await axios(`https://api.themoviedb.org/3/person/popular?api_key=1931e7e27655b416a2b7d6c124b40d73&language=en-US&page=${pagenum}`)
            setTvs(data.results);
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(()=>{
        GetPeople(1);
    },[])
    return (<div className='mt-3 mb-5 pb-5'>
    <Helmet>
        <title>people Page</title>
    </Helmet>
    {tvs && !loading?<div className="row gy-1">
        {tvs.map((item,index)=><div key={index} className='col-6 col-md-3'>
        <Link className='text-decoration-none text-white' to={`/mediaDetails/${item.id}/person`}>
            <div className="position-relative">
                <img src={item.profile_path?`https://image.tmdb.org/t/p/w500`+item.profile_path:""}
                className='w-100' alt={item.name}></img>
                <h3 className='h6 mt-1'>{item.name}</h3>
            </div>
        </Link>
    </div>)}
    </div>:<Loading/>}
    <div className='d-flex justify-content-center mt-5'>
        <nav aria-label="Page navigation example">
            <ul className="pagination">
                <li className="page-item">
                    <Link className="page-link bg" onClick={()=>{GetPeople(pages.map((page)=>page))}} to="#" aria-label="Previous">
                        <span aria-hidden="true">&laquo;</span>
                    </Link>
                </li>
                {pages.map((page,index)=><li key={index} className="page-item active"  aria-current="page"><Link className="page-link bg active" onClick={()=>{GetPeople(page)}} to="#">{page}</Link></li>)}
                <li className="page-item">
                    <Link className="page-link bg" onClick={()=>{GetPeople(pages.map((page)=>page))}} to="#" aria-label="Next">
                        <span aria-hidden="true">&raquo;</span>
                    </Link>
                </li>
            </ul>
        </nav>
    </div>
    </div>
    )
}
