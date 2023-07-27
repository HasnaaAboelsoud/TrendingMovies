import React from 'react'
import { Link } from 'react-router-dom';

export default function MediaItem({item}) {
    return (
        <div className='col-6 col-md-3 col-lg-2'>
            <Link className='text-decoration-none text-white' to={`/mediaDetails/${item.id}/${item.media_type}`}>
                <div className="position-relative">
                    {item.poster_path?<img src={`https://image.tmdb.org/t/p/w500`+item.poster_path} className='w-100' alt={item.title}></img>:<img src={item.profile_path?`https://image.tmdb.org/t/p/w500`+item.profile_path:""}
                    className='w-100' alt={item.title}></img>}
                    <h3 className='h6'>{item.title} {item.name}</h3>
                    {item.vote_average?<h6 className='position-absolute top-0 end-0 bg-info p-1'>{item.vote_average.toFixed(1)}</h6>:""}
                </div>
            </Link>
        </div>
    )
}
