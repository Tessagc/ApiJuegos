async function cargarJuego() {
    const urlParams = new URLSearchParams(window.location.search);

    const idEnviada = urlParams.get("id");
    // console.log(idEnviada);

    try {

        // urls para acceso
        const urlVideojuego = "http://localhost:9000/api/videojuegos/" + idEnviada;

        // obtener juegos
        const respuesta = await fetch(urlVideojuego);

        if (!respuesta.ok) {
            throw new Error("Error cargando videojuegos");
        }

        // listaJuegos
        const juego = await respuesta.json();

        // titulo del juego en el titulo de la pagina
        document.getElementById("tituloVentana").innerText = juego.titulo;
        // mostrar datos del juego en la pagina
        const tituloJuego = document.getElementById("tituloJuego");
        const plataformaJuego = document.getElementById("plataformaJuego");
        const generoJuego = document.getElementById("generoJuego");
        const añoJuego = document.getElementById("añoJuego");
        const compañiaJuego = document.getElementById("compañiaJuego");
        const precioJuego = document.getElementById("precioJuego");
        const notaJuego = document.getElementById("notaJuego");
        const estadoJuego = document.getElementById("estadoJuego");
        const descripcionJuego = document.getElementById("descripcionJuego");


        tituloJuego.innerText = juego.titulo;
        plataformaJuego.innerHTML = "<span>Plataforma: </span> " + juego.plataforma;
        generoJuego.innerHTML = "<span>Genero: </span> " + juego.genero;
        añoJuego.innerHTML = "<span>Año Lanzamiento: </span> " + juego.anyo;
        precioJuego.innerHTML = "<span>Precio: </span> " + juego.precio + " €";
        compañiaJuego.innerHTML = "<span>Compañia: </span> " + juego.compania;
        notaJuego.innerHTML = "<span>Nota: </span> " + juego.nota;
        estadoJuego.innerHTML = "<span>Estado: </span> " + juego.estado;
        descripcionJuego.innerHTML = "<span>Estado: </span> " + juego.descripcion;

        // imagen del jueguito
        const imagenJuego = document.getElementById("urlImagenJuego");

        imagenJuego.setAttribute("src", "../../../../uploads/portadas/" + juego.portadaUrl);

        // titulo ventana
    } catch (error) { // juego no carga
        console.error('Error al cargar el juego:', error);
        alert('Se ha producido un error al cargar el juego.');
    }
}

document.addEventListener("DOMContentLoaded", cargarJuego);