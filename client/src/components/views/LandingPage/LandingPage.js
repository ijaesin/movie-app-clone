import React, { useState, useEffect } from 'react'
import { FaCode } from "react-icons/fa";
import { API_URL, API_KEY, IMAGE_BASE_URL } from '../../Config';
import MainImage from './Sections/ MainImage';
import GridCards from '../commons/GridCards';
import { Row } from 'antd';

function LandingPage() {
    const [Movies, setMovies] = useState([]);
    const [MainMovieImage, setMainMovieImage] = useState(null);
    const [CurrentPage, setCurrentPage] = useState(0);

    const fetchMovies = (endpoint) => {
        fetch(endpoint)
            .then(res => res.json())
            .then(res => {
                setMovies([...Movies, ...res.results]);
                setMainMovieImage(res.results[0]);
                setCurrentPage(res.page);
            })
    }
    
    useEffect(() => {
        const endpoint =`${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
        fetchMovies(endpoint);
    }, [])


    const loadMoreItems = () => {
        const endpoint =`${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${CurrentPage + 1}`;
        fetchMovies(endpoint);
    }

    return (
        <div style={{ width:'100%', margin:'0' }}>
            {MainMovieImage && <MainImage 
                image={`${IMAGE_BASE_URL}w1280${MainMovieImage.backdrop_path}`}
                title={MainMovieImage.original_title}
                text={MainMovieImage.overview}
            />}

            <div style={{ width:'85', margin:'1rem auto'}}>
                <h2>Movies by latest</h2>
                <hr /> 

                <Row gutter={[16, 16]}>
                    {Movies && Movies.map((movie, index) => (
                        <React.Fragment key={index}>
                            <GridCards 
                                LandingPage
                                image={movie.poster_path ? `${IMAGE_BASE_URL}w500${movie.poster_path}` : null}
                                movieId={movie.id}
                                movieName={movie.original_title}
                            />
                        </React.Fragment>
                    ))}
                </Row>

            </div>

            <div style={{ display:'flex', justifyContent:'center'}}> 
                <button onClick={loadMoreItems}>Load More</button>
            </div>
        </div>
    )
}

export default LandingPage
