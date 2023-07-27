import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Loading from '../Loading/Loading';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

export default function Movies() {
  const [movies,setMovies]=useState([]);
  const [loading,setLoading]=useState(false);
  const pages=new Array(10).fill(1).map((page,index)=>index + 1);

  async function GetMovies(pagenum){
    try {
      setLoading(true);
      const {data}= await axios(`https://api.themoviedb.org/3/discover/movie?api_key=1931e7e27655b416a2b7d6c124b40d73&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=true&page=${pagenum}`)
      setMovies(data.results);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(()=>{
    GetMovies(1);
  },[])

  return (<div className='mt-3 mb-5 pb-5'>
  <Helmet>
        <title>Movies Page</title>
    </Helmet>
    {movies && !loading?<div className="row gy-1">
        {movies.map((item,index)=><div key={index} className='col-6 col-md-3'>
        <Link className='text-decoration-none text-white' to={`/mediaDetails/${item.id}/movie`}>
            <div className="position-relative">
                <img src={`https://image.tmdb.org/t/p/w500`+item.poster_path} className='w-100' alt={item.title}></img>
                <h3 className='h6 mt-1'>{item.title}</h3>
                <h6 className='position-absolute top-0 end-0 bg-info p-1'>{item.vote_average.toFixed(1)}</h6>
            </div>
        </Link>
    </div>)}
      </div>:<Loading/>}
      <div className='d-flex justify-content-center mt-5'>
      <nav aria-label="Page navigation example">
      <ul className="pagination">
        <li className="page-item">
          <Link className="page-link bg" onClick={()=>{GetMovies(pages.map((page)=>page))}} to="#" aria-label="Previous">
            <span aria-hidden="true">&laquo;</span>
          </Link>
        </li>
        {pages.map((page,index)=><li key={index} className="page-item active"  aria-current="page"><Link className="page-link bg active" onClick={()=>{GetMovies(page)}} to="#">{page}</Link></li>)}
        <li className="page-item">
          <Link className="page-link bg" onClick={()=>{GetMovies(pages.map((page)=>page))}} to="#" aria-label="Next">
            <span aria-hidden="true">&raquo;</span>
          </Link>
        </li>
      </ul>
    </nav>
      </div>
    </div>
  )

}
