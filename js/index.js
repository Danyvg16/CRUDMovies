const URL = "http://localhost:3000/movies";

const movieForm = document.querySelector('#movieForm');
const submitButton = document.querySelector('#movieForm .submit');
const editButton = document.querySelector('#movieForm .edit');
let movies = [];

submitButton.addEventListener('click', async (event) => {
  event.preventDefault(); 

const pelicula = document.getElementById('pelicula').value;
const genero = document.getElementById('genero').value;
const estrellas = document.getElementById('estrellas').value;
const cine = document.getElementById('cine').value;
const ciudad = document.getElementById('ciudad').value;

//Crear una Pelicula
const body = {
    id: movies.length + 1,
    name: pelicula,
    movieGenres: genero,
    estrellas:estrellas,
    cine:cine,
    ciudad:ciudad
};

//Editar Pelicula

addMovie(body);

});

editButton.addEventListener('click', async (event) => {
    // const movieToEdit = movies.find(movie => movie.id); no se necesita
    //documento.queryselector(modal).id - variable 
    event.preventDefault();

    const updatedMovie = {
        id: movieToEdit.id,
        name: document.getElementById('pelicula').value,
        movieGenres: document.getElementById('genero').value,
        estrellas: document.getElementById('estrellas').value,
        cine: document.getElementById('cine').value,
        ciudad: document.getElementById('ciudad').value
    };

    editMovie(updatedMovie);

});
//Agregar Pelicula

const addMovie = async (body) => {
try {
    const response = await fetch(URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });

    if (response.status === 201) {
    alert('Pelicula Agregada');
    const movies = await getMovies(); 
    
    renderMovies(movies);
    } else {
      alert('Hay un error');
    }
    } catch (error) {
    console.error(error.message);
    }
};

// Obtener datos

const getMovies = async () => {
    
    try {
        const response = await fetch(URL);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        movies = await response.json();
        return movies;
    } catch (error) {
        console.error(error.message);
    }

};

//Eliminar fila

const deleteMovie = async () => {
    // const movieToDelete = movies.find(movie => movie.id);
    try {
        const response = await fetch(`${URL}/${movies.id}`, {
            method: 'DELETE',
          });
          if (response.status === 200) {
            alert('Película eliminada');
            movies = await response.json();
            return movies;
            } else {
              alert('Hay un error');
            }
            } catch (error) {
            console.error(error.message);
            }
    };

    //Editar Pelicula

    const editMovie = async (updatedMovie) => {
        //console.log
        const movieToEdit = updatedMovie.id;
        try {
            const response = await fetch(`${URL}/${movieToEdit}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedMovie)
        });
        if (response.status === 200) {
            alert('Película editada');
            getMovies(); 
        } else {
            alert('Hay un error');
        }
    } catch (error) {
        console.error(error.message);
    }
    };


    //Abrir Modal

    function openModal(movieId) {
        //console log
        // const movieToEdit = movies.find(movie => movie.id === movieId); no necesaria
        //sacar id y mandarlo
        //seleccionar un modal modal.setattribute 
        document.getElementById('pelicula').value = movieToEdit.name;
        document.getElementById('genero').value = movieToEdit.movieGenres;
        document.getElementById('estrellas').value = movieToEdit.estrellas;
        document.getElementById('cine').value = movieToEdit.cine;
        document.getElementById('ciudad').value = movieToEdit.ciudad;

        const modal = new bootstrap.Modal(document.getElementById('movieForm'));
        modal.show();
    }

//Para renderizar la tabla

const renderMovies = (movies) => {
    const tableBody = document.getElementById('data');
    tableBody.innerHTML = '';

    movies.forEach(movie => {
      const row = document.createElement('tr');
  
      const peliculaCell = document.createElement('td');
      peliculaCell.textContent = movie.name;
      row.appendChild(peliculaCell);
  
      const generoCell = document.createElement('td');
      generoCell.textContent = movie.movieGenres;
      row.appendChild(generoCell);
  
      const estrellasCell = document.createElement('td');
      estrellasCell.textContent = movie.estrellas;
      row.appendChild(estrellasCell);

      const cineCell = document.createElement('td');
      cineCell.textContent = movie.cine;
      row.appendChild(cineCell);

      const ciudadCell = document.createElement('td');
      ciudadCell.textContent = movie.ciudad;
      row.appendChild(ciudadCell);

      

      //Eliminar
      tableBody.appendChild(row);
      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Eliminar';
      deleteButton.classList.add('btn', 'btn-danger');
      deleteButton.addEventListener('click', () => {
      deleteMovie(movies.id);
      });

      //Editar
      const editButton = document.createElement('button');
      editButton.textContent = 'Editar';
      editButton.classList.add('btn', 'btn-primary');
      editButton.addEventListener('click', () => {
      openModal(movie.id);
      });
      
      row.appendChild(deleteButton);
      row.appendChild(editButton);
  
      });
  };



const main = async () => {
    movies = await getMovies();
    if (movies) {
      renderMovies(movies);
    } else {
        console.error(error.message);
    }
}

main();