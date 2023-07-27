import axios from 'axios'
import React, { useState } from 'react'
import { useEffect } from 'react';
import { useParams } from 'react-router-dom'
import Loading from '../Loading/Loading';
import SimilarMedia from '../SimilarMedia/SimilarMedia';
import { Helmet } from 'react-helmet';

export default function MediaDetails() {
    const [details,setDetails]= useState({});
    const [loading,setLoading]=useState(false);
    const {id,mediaType}= useParams();

    async function getDetails(){
        try {
            setLoading(true);
            const {data}=await axios.get(`https://api.themoviedb.org/3/${mediaType}/${id}?api_key=1931e7e27655b416a2b7d6c124b40d73&language=en-US`)
            setDetails(data);
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(()=>{
        getDetails();
    },[id])
    return (
    <div>
    <Helmet>
        <title>{details.title} Details Page</title>
    </Helmet>
    {!loading?<>
        <div className='row pb-5 mt-4'>
        <div className='col-md-4 col-lg-3'>
            {details.poster_path?<img src={`https://image.tmdb.org/t/p/w500`+details.poster_path} className='w-100' alt={details.title}></img>:<img src={`https://image.tmdb.org/t/p/w500`+details.profile_path}
            className='w-100' alt={details.title}></img>}
        </div>
        <div className='col-md-8 col-lg-7 d-flex align-items-center mt-3 mt-lg-0'>
            <div>
                <h3>{details.title} {details.name}</h3>
                <p className='text-muted my-3'>{details.overview} {details.biography}</p>
                {details.vote_average?<h5>Vote Average : {details.vote_average}</h5>:""}
                {details.vote_count?<h5>Vote Count : {details.vote_count}</h5>:""}
            </div>
        </div>
    </div>
    {mediaType === "movie"?<SimilarMedia/>:""}
    </>:<Loading/>}
    </div>
    )
}
