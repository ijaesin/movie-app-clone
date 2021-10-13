import React, { useEffect, useState } from 'react'
import { API_URL, API_KEY, IMAGE_BASE_URL } from '../../Config'
import MainImage from '../LandingPage/Sections/ MainImage';
import MovieInfo from './Sections/MovieInfo';
import GridCards from '../commons/GridCards';
import Favorite from './Sections/Favorite';
import { Row } from 'antd';

function MovieDetail(props) {
  const movieId = props.match.params.movieId;
  const [Movie, setMovie] = useState([]);
  const [Casts, setCasts] = useState([]);
  const [ActorToggle, setActorToggle] = useState(false);

  useEffect(() => {
    const endpointCrew = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`;
    const endpointInfo = `${API_URL}movie/${movieId}?api_key=${API_KEY}`

    fetch(endpointInfo)
      .then(res => res.json())
      .then(res => {
        setMovie(res);
      })

    fetch(endpointCrew)
      .then(res => res.json())
      .then(res => {
        setCasts(res.cast);
      })
  }, [])

  const toggleActorView = () => {
    setActorToggle(!ActorToggle)
  }

  return (
    <div>
      <MainImage 
        image={`${IMAGE_BASE_URL}w1280${Movie.backdrop_path}`}
        title={Movie.original_title}
        text={Movie.overview}
      />

      <div style={{ width:'85', margin:'1rem auto'}}>
        <div style={{display:'flex', justifyContent:'flex-end'}}>
          <Favorite movieInfo={Movie} movieId={movieId} userFrom={localStorage.getItem('userId')} />
        </div>

        <MovieInfo 
          movie={Movie}
        />
        <br />
        <div style={{display:'flex', justifyContent:'center', margin:'2rem'}}>
          <button onClick={toggleActorView}>Togle Actor View</button>
        </div>

        {ActorToggle &&
          <Row gutter={[16, 16]}>
            {Casts && Casts.map((cast, index) => (
              <React.Fragment key={index}>
                <GridCards 
                  image={cast.profile_path ? `${IMAGE_BASE_URL}w500${cast.profile_path}` : null}
                  characterName={cast.name}
                />
              </React.Fragment>
            ))}
          </Row>
        }
      </div>
    </div>
  )
}

export default MovieDetail