// cargamos el documento
document.addEventListener("DOMContentLoaded", async () => {

    // elementos del formulario
    const actualizarId = document.getElementById("idJuego");
    const actualizarNombre = document.getElementById("actualizarNombre");
    const actualizarAño = document.getElementById("actualizarAño");
    const actualizarNota = document.getElementById("actualizarNota");
    const actualizarPrecio = document.getElementById("actualizarPrecio");
    const actualizarCompañia = document.getElementById("actualizarCompañia");
    const actualizarPortada = document.getElementById("actualizarPortada");
    const actualizarDescripcion = document.getElementById("actualizarDescripcion");
    const actualizarGenero = document.getElementById("actualizarGenero");
    const actualizarPlataforma = document.getElementById("actualizarPlataforma");
    const actualizarEstado = document.getElementById("actualizarEstado");

    try {

        // recogemos el id de la url
        const urlParams = new URLSearchParams(window.location.search);
        const idEnviada = urlParams.get("id");

        // urls para acceso
        const urlCatalogos =  "http://localhost:9000/api/videojuegos/catalogos";
        const urlJuego = "http://localhost:9000/api/videojuegos/" + idEnviada;

        // cargar catalogo
        const [juegoResp, catalogosResp] = await Promise.all([
            fetch(urlJuego),
            fetch(urlCatalogos)
        ])

        if (!catalogosResp.ok) {
            throw new Error("Error cargando catalogos");
        }
        if (!juegoResp.ok) {
            throw new Error("Error cargando el juego");
        }

        // guardar datos de catalogos y juego
        const catalogos = await catalogosResp.json();
        const juego = await juegoResp.json();

        // meter info a los select para el formulario
        // estados
        catalogos.estados.forEach((estado) => {
            const opcionEstado = document.createElement("option");
            opcionEstado.value = estado;
            opcionEstado.innerText = estado;

            actualizarEstado.append(opcionEstado);
        })

        // plataformas
        catalogos.plataformas.forEach((plataforma) => {
            const opcionPlataforma = document.createElement("option");
            opcionPlataforma.value = plataforma;
            opcionPlataforma.innerText = plataforma;

            actualizarPlataforma.append(opcionPlataforma);
        })

        // generos
        catalogos.generos.forEach((genero) => {
            const opcionGenero = document.createElement("option");
            opcionGenero.value = genero;
            opcionGenero.innerText = genero;

            actualizarGenero.append(opcionGenero);
        })


        // asignar los valores
        actualizarId.value = idEnviada;
        actualizarNombre.value = juego.titulo;
        actualizarPlataforma.value = juego.plataforma;
        actualizarGenero.value = juego.genero;
        actualizarAño.value = juego.anyo;
        actualizarNota.value = juego.nota;
        actualizarPrecio.value = juego.precio;
        actualizarCompañia.value = juego.compania;
        actualizarEstado.value = juego.estado;
        actualizarDescripcion.value = juego.descripcion;

        // titulo ventana
        
        document.getElementById("tituloActualizar").innerText += " " + juego.titulo;

    } catch (error) {
        console.error('Error al cargar los catalogos:', error);
        alert('Se ha producido un error al cargar los catalogos.');
    }

    // actualizar el juego con la nueva Info
    document.getElementById("actualizarJuego").addEventListener("click", async (ev) => {
        ev.preventDefault();

        // datos del juego actualizados
        const juegoActualizar = {
            titulo: actualizarNombre.value,
            plataforma: actualizarPlataforma.value,
            genero: actualizarGenero.value,
            anyo: actualizarAño.value,
            compania: actualizarCompañia.value,
            precio: actualizarPrecio.value,
            nota: actualizarNota.value,
            portadaUrl: actualizarPortada.files[0].name,
            descripcion: actualizarDescripcion.value,
            estado: actualizarEstado.value
        }

        // Creamos juegoData
        const juegoData = new FormData();

        // Parte JSON →  @RequestPart("data")
        juegoData.append(
            "data",
            new Blob([JSON.stringify(juegoActualizar)], { type: "application/json" })
        );

        // Parte archivo →@RequestPart("portada")
        const fileInput = actualizarPortada;
        if (fileInput.files.length > 0) {
            juegoData.append("portada", fileInput.files[0]);
        }
        
        const urlActualizar = "http://localhost:9000/api/videojuegos/actualizar/" + actualizarId.value;
        const response = await fetch(urlActualizar, {
            method: "PUT",
            body: juegoData
        });

        if (response.ok) {
            const result = await response.json();
            alert("Videojuego con ID " + result.id +" actualizado" );
            window.location.href = "index.html";

        } else {
            alert("Error al actualizar el videojuego");
        }
    })
})