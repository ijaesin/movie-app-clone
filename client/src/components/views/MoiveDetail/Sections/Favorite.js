import Axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button } from 'antd';

function Favorite(props) {
  const movieId = props.movieId;
  const userFrom = props.userFrom;
  const movieTitle = props.movieInfo.title;
  const moviePost = props.movieInfo.backdrop_path;
  const movieRuntime = props.movieInfo.runtime;
  const variables = {userFrom, movieId, movieTitle, moviePost, movieRuntime};

  const [FavoriteNumber, setFavoriteNumber] = useState(0);
  const [Favorited, setFavorited] = useState(false);

  useEffect(() => {
    Axios.post('/api/favorite/favoriteNumber', variables)
      .then(res => {
        if (res.data.success) {
          setFavoriteNumber(res.data.favoriteNumber);
        } else {
          alert('숫자정보를 가져오는데 실패했습니다.');
        }
      })

    Axios.post('/api/favorite/favorited', variables)
      .then(res => {
        if (res.data.success) {
          setFavorited(res.data.favorited)
        } else {
          alert('정보를 가져오는데 실패했습니다.');
        }
      })
  }, [])

  const onClickFavorite = () => {
    if (Favorited) {
      Axios.post('/api/favorite/removeFromFavorite', variables)
        .then(res => {
          if (res.data.success) {
            setFavoriteNumber(FavoriteNumber - 1);
            setFavorited(!Favorited);
          } else {
            alert('Favorite 취소를 실패하였습니다.');
          }
        })
    } else {
      Axios.post('/api/favorite/addToFavorite', variables)
        .then(res => {
          if (res.data.success) {
            setFavoriteNumber(FavoriteNumber + 1);
            setFavorited(!Favorited);
          } else {
            alert('Favorite에 추가를 실패하였습니다.');
          }
        })
    }
  }

  return (
    <div>
      <Button
        onClick={onClickFavorite}
      >
        {Favorited ? "Not Favorite " : "Add to Favorite "} 
        {FavoriteNumber}
      </Button>
    </div>
  )
}

export default Favorite
