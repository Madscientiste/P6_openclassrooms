import "./styles/main.scss";
import './core/JSXParser'

import State from "./core/State"
import App from "./app";

import Movie from "./model/Movie";

const root = document.getElementById('root')
const state = new State({ movies: [], categories: [] }, (props) => {
    root.replaceChildren(<App {...props} />)
})

const app = new App({ state: state.state, setState: state.setState })
app.mount(root)

window.onload = async (e) => {
    let bestMovies = await Movie.filterBy({ sort_by: "-imdb_score" })

    let categories = await Promise.all(
        ["Action", "Adventure", "History"].map(async categorie => {
            let items = await Movie.filterBy({ genre: categorie, sort_by: "-imdb_score" })
            return { title: categorie, items }
        }))

    state.setState({ movies: bestMovies, categories })
}



if (module.hot) module.hot.accept()
