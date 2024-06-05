const apiKey = '4269ad4d8cmsh72ab1b1fcf364a9p13206djsnbe4b84cbd390'; // Tu API Key
const userId = '25025320'; // Reemplaza con el ID de usuario de Instagram

function fetchInstagramPosts() {
    const xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener('readystatechange', function () {
        if (this.readyState === this.DONE) {
            try {
                const response = JSON.parse(this.responseText);
                const posts = response.data; // Ajusta según la estructura de la respuesta

                posts.slice(0, 6).forEach(post => {
                    const photoElement = document.createElement('div');
                    photoElement.classList.add('instagram-photo');
                    photoElement.innerHTML = `
                        <img src="${post.images.standard_resolution.url}" alt="Instagram Photo">
                        <div class="overlay">
                            <span>❤ ${post.likes.count}</span>
                        </div>
                    `;
                    document.getElementById('instagram-widget').appendChild(photoElement);
                });
            } catch (error) {
                console.error('Error parsing JSON response:', error);
            }
        }
    });

    xhr.open('GET', `https://instagram243.p.rapidapi.com/userposts/${userId}/12/?end_cursor=%7D`);
    xhr.setRequestHeader('x-rapidapi-key', apiKey);
    xhr.setRequestHeader('x-rapidapi-host', 'instagram243.p.rapidapi.com');

    xhr.send(null);
}

// Llamar a la función para obtener las publicaciones al cargar la página
fetchInstagramPosts();
