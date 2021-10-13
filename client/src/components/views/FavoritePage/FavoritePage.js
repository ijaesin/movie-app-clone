import Axios from 'axios';
import React, { useEffect, useState } from 'react'
import './favorite.css';
import { Popover } from 'antd';
import { IMAGE_BASE_URL } from '../../Config';

function FavoritePage() {
  const [Favorites, setFavorites] = useState([]);

  useEffect(() => {
    fetchFavoredMovie();
  }, []);

  const fetchFavoredMovie = () => {
    Axios.post('/api/favorite/getFavoriteMovie', {userFrom: localStorage.getItem('userId')})
      .then(res => {
        if (res.data.success) {
          setFavorites(res.data.favorites);
        } else {
          alert('Favorite Moive를 가져오는데 실패했습니다.');
        }
      })
  }

  const renderCards = Favorites.map((favorite, index) => {
    const content = (
      <div>
        {favorite.moviePost ?
          <img src={`${IMAGE_BASE_URL}w500${favorite.moviePost}`} /> : "no image"
        } 
      </div>
    )    

    const onCLickDelete = (movieId, userFrom) => {
      const variables = {
      movieId,
      userFrom 
      }

      Axios.post('/api/favorite/removeFromFavorite', variables)
        .then(res => {
          if (res.data.success) {
            fetchFavoredMovie();
          } else {
            alert('Favorite에서 삭제하는데 실패하였습니다.'); 
          }
        })
    }

    return (
      <tr key={index}>
        <Popover content={content} title={`${favorite.movieTitle}`}>
          <td>{favorite.movieTitle}</td>
        </Popover>
        <td>{favorite.movieRuntime} mins</td>
        <td><button onClick={() => onCLickDelete(favorite.movieId, favorite.userFrom)}>Remove</button></td>        
      </tr>
    )
  })

  return (
    <div style={{width:'85%', margin:'3rem auto'}}>
      <h2>Favorite Movies</h2>
      <hr />

      <table>
        <thead>
          <tr>
            <th>Movie Title</th>
            <th>Movie Runtime</th>
            <td>Romove from Favorites</td>
          </tr>
        </thead>

        <tbody>
          {renderCards}
        </tbody>
      </table>
    </div>
  )
}

export default FavoritePage
