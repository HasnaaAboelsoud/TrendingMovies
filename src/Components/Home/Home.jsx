import  axios  from 'axios';
import React, { useEffect, useState } from 'react'
import MediaItem from '../MediaItem/MediaItem';
import Loading from './../Loading/Loading';

export default function Home() {
  const [movies,setMovies]= useState([]);
  const [tv,setTv]= useState([]);
  const [people,setPeople]= useState([]);
  const [loading,setLoading]=useState(false);

  async function GetTrending(mediaType,setMedia){
      try {
          setLoading(true);
          const {data}=await axios.get(`https://api.themoviedb.org/3/trending/${mediaType}/week?api_key=1931e7e27655b416a2b7d6c124b40d73`)
          setMedia(data.results);
          setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
    useEffect(()=>{
      GetTrending("movie",setMovies);
      GetTrending("tv",setTv);
      GetTrending("person",setPeople);
    },[])

  return (
    <>
        {movies && tv && !loading?<div className='mt-3 mb-5 pb-5'>
          <div className="row gy-1">
              <div className='col-6 col-md-4 d-flex align-items-center'>
                <div>
                    <div className='brdr w-25'></div>
                    <h2 className='h3 mt-3'>Trending<br/> Movies <br/> To Watch Now</h2>
                    <p className='text-muted'>Most Watched</p>
                    <div className='brdr w-100'></div>
                </div>
              </div>
              {movies.slice(0,10).map((item,index)=><MediaItem key={index} item={item}/>)}
        </div>

        <div className="row mt-3 gy-1">
              <div className='col-6 col-md-4 d-flex align-items-center'>
                <div>
                    <div className='brdr w-25'></div>
                    <h2 className='h3 mt-3'>Trending<br/> TV <br/> To Watch Now</h2>
                    <p className='text-muted'>Most Watched</p>
                    <div className='brdr w-100'></div>
                </div>
              </div>
              {tv.slice(0,10).map((item,index)=><MediaItem key={index} item={item}/>)}
        </div>

        <div className="row mt-3 gy-1">
            <div className='col-6 col-md-4 d-flex align-items-center'>
              <div>
                <div className='brdr w-25'></div>
                <h2 className='h3 mt-3'>Trending<br/> People <br/> To Watch Now</h2>
                <p className='text-muted'>Most Watched</p>
                <div className='brdr w-100'></div>
              </div>
            </div>
            {people.slice(0,10).map((item,index)=><MediaItem key={index} item={item}/>)}
        </div>
        </div>:<Loading/>}


    </>
    )
}
