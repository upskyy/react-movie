import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styles from "./Detail.module.css";
import popcon from "./popcon.png";

function Detail() {
  const [movie, setMovie] = useState([]);
  const { id } = useParams();
  const getMovieDetail = async () => {
    const json = await (
      await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=15929ba73ea97df7f30164465b7ea21f`)
    ).json();
    setMovie(json);
  };

  useEffect(() => {
    getMovieDetail();
  });

  let movieBgImg = `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`
  let moviePoster = `https://image.tmdb.org/t/p/w500${movie.poster_path}`

  const movieReleaseDate = movie.release_date;

  return (
    <div>
      <div className={styles.top_box}>
        <Link
          to={`${process.env.PUBLIC_URL}/`}
          style={{ textDecoration: "none" }}
        >
          <h2>FunFlix</h2>
        </Link>
        <div className={styles.search_box}>
          <input type="text" placeholder="Search for movies or TV shows" />
          <button>Sign In</button>
        </div>
      </div>
      <div>
        <img className={styles.bg_img} src={movieBgImg} alt="bg cover" />
        <div className={styles.middle_box}>
          <img src={moviePoster} alt="small cover" />
          <div>
            <h1>{movie.title}</h1>
            <div className={styles.small_box}>
              <img className={styles.popcon_img} src={popcon} alt="popcon icon" />
              <h4>{movie.runtime} min</h4>
              <h4>⭐ {movie.vote_average ? movie.vote_average.toFixed(1) : null} / 10</h4>
            </div>
            <p>
              {movieReleaseDate
                ? `Release  ${movieReleaseDate}`
                : "There's no description ..."}
            </p>

            <div>
              <h3>Overview</h3>
              {movie.overview
                ? movie.overview.length > 330
                  ? `${movie.overview.slice(0, 330)}...`
                  : <p>{movie.overview}</p>
                : null}
            </div>

            <div>
              <button>▶︎ Watch now</button>
            </div>
          </div>
        </div>
        <footer>
          <span>© FunFlix 2024</span>
        </footer>
      </div>
    </div>
  );
}

export default Detail;
