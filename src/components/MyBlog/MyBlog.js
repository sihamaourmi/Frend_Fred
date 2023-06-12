import React, {useState} from 'react'
import axios from 'axios'

function MyBlog() {
    const [file, setFile] = useState(null);
    const [username, setUsername] = useState('');
    const [titre, setTitre] = useState('');
    const [imagename, setImagename] = useState('');

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);

        setImagename(event.target.files[0].name)
    };
    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };
    const handleTitreChange = (event) => {
        setTitre(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if(file){
            const formData = new FormData();
            formData.append('file', file);
            formData.append('username', username);
            formData.append('titre', titre);
            formData.append('imagename', imagename);
        
            axios.post('http://localhost:5000/submit-blog/', formData)
            .then(response =>{
                console.log(response.data);
            })
            .catch(err =>{
                console.log(err);
            })
        }

    };


  return (
    <form onSubmit={handleSubmit}>
        <label>Titre</label>
        <input type="text" name='titre' onChange={handleTitreChange} />
        <label>Username</label>
        <input type="text" name='username' onChange={handleUsernameChange} />
        <label>Image :</label>
        <input type='file' onChange={handleFileChange} />
        <button type='submit'>Envoyer</button>
    </form>
  )
}

export default MyBlog