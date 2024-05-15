import { useEffect, useState } from "react";
import Movie from "../components/Movie";
import Loader from "./Loader";
import styles from "./Home.module.css";

function Home() {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const getMovie = async () => {
    const json = await (
      await fetch(
        "https://api.themoviedb.org/3/movie/popular?page=2&api_key=15929ba73ea97df7f30164465b7ea21f"
      )
    ).json();
    setMovies(json.results);
    setLoading(false);
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      getMovie();
    }, 300);
    console.log("timeoutId: " + timeoutId);
  }, []);

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <div>
          <div className={styles.top_box}>
            <h2>FunFlix</h2>
            <div className={styles.middle_box}>
              <nav>
                <ul className={styles.nav_box}>
                  <li>Home</li>
                  <li>New</li>
                  <li>Popular</li>
                  <li>Lists</li>
                  <li>Animation</li>
                </ul>
              </nav>
              <div className={styles.search_box}>
                <input
                  type="text"
                  placeholder="Search for movies or TV shows"
                />
                <button>Sign In</button>
              </div>
            </div>
          </div>
          <section>
            <div className={styles.nav_box}>
              <h4>All</h4>
              <h4>Movies</h4>
              <h4>TV Shows</h4>
            </div>
            <ul className={styles.nav_box}>
              <li>Release Year ⌵</li>
              <li>Genres ⌵</li>
              <li>Rating ⌵</li>
            </ul>
          </section>
          <main>
            {movies.map((movie) => {
              return (
                <Movie
                  id={movie.id}
                  title={movie.title}
                  coverImg={movie.poster_path}
                  year={movie.release_date}
                  rating={movie.vote_average}
                />
              );
            })}
          </main>
          <footer>
            <span>© FunFlix 2024</span>
          </footer>
        </div>
      )}
    </div>
  );
}

export default Home;
