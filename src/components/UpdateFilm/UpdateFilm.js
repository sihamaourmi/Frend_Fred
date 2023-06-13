import React, {useEffect, useState} from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom'
//pour les dates 
import moment from 'moment/moment';
import 'moment/locale/fr'

moment().local('fr')



function UpdateFilm() {
    const params = useParams();

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [film, setFilm] = useState({})
    const [nom, setNom] = useState('')
    const [date, setDate] = useState('')
    const [realisateur, setRealisateur] = useState('')
    const [genre, setGenre] = useState('')
    const [date_sortie, setDate_sortie] = useState('')

    useEffect(() =>{
        axios.get(`http://localhost:5000/film/${params.id}`)
        .then((response) =>{
            // console.log(response.data);
            setLoading(false)
            setError('')
            setFilm(response.data)
            setNom(response.data.nom)
            setDate(response.data.date)
            setRealisateur(response.data.realisateur)
            setGenre(response.data.genre)
            setDate_sortie(response.data.date_sortie)
        })
        .catch(error =>{
            setLoading(false)
            setError("Something went wrong")
            setFilm({})
        })
    }, [])

    const handleNomChange = (event) =>{
        setNom(event.target.value)
    }
    const handleDateChange = (event) =>{
        setDate(event.target.value)
    }
    const handleRealisateurChange = (event) =>{
        setRealisateur(event.target.value)
    }
    const handleGenreChange = (event) =>{
        setGenre(event.target.value)
    }
    const handleDate_sortieChange = (event) =>{
        setDate_sortie(event.target.value)
    }


  return (
    <React.Fragment>

    <h1>{loading ? 'loading..' : film.nom }</h1>
    <h2>{loading ? 'loading..' : film.date }</h2>
    <h3>{loading ? 'loading..' : film.realisateur }</h3>
    <h4>{loading ? 'loading..' : film.genre }</h4>
    <h4>{loading ? 'loading..' : film.date_sortie }</h4>

    <form action={`http://localhost:5000/film/edit/${params.id}?_method=PUT`} method="post">
        <input type="hidden" name="_method" value="PUT" />

        <label for="">Nom</label>
        <input type="text" name="nom" value={nom} onChange={handleNomChange}/>
        <label for="">Date</label>
        <input type="text" name="date" value={date} onChange={handleDateChange} />
        <label for="">Realisateur</label>
        <input type="text" name="realisateur" value={realisateur} onChange={handleRealisateurChange} />
        <label for="">Genre</label>
        <input type="text" name="genre" value={genre} onChange={handleGenreChange} />
        <label for="">Date de sortie </label>
        <input type="date" name="date_sortie" value={date_sortie} onChange={handleDate_sortieChange} />


        <input type="submit" value="envoyer" />
    </form>

    <form action={`http://localhost:5000/film/delete/${params.id}?_method=DELETE`} method="post">
        <input type="hidden" name="_method" value="DELETE" />

        <input type="submit" value="Supprimer" />
    </form>

    </React.Fragment>
  )
}

export default UpdateFilm