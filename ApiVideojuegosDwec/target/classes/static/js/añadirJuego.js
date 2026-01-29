// cargar info de los select
document.addEventListener("DOMContentLoaded", async (e) => {
    e.preventDefault();
    // urls para acceso
    const urlCatalogos =  "http://localhost:9000/api/videojuegos/catalogos";
    
    try {
        // cargar catalogo
        const catalogosResp = await fetch(urlCatalogos);

        if (!catalogosResp.ok) {
            throw new Error("Error cargando catalogos");
        }


        // guardar datos
        const catalogos = await catalogosResp.json();

        // selects del formulario
        const nuevoEstado = document.getElementById("nuevoEstado");
        const nuevoPlataforma = document.getElementById("nuevoPlataforma");
        const nuevoGenero = document.getElementById("nuevoGenero");

        // meter info a los select para el formulario
        // estados
        catalogos.estados.forEach((estado) => {
            const opcionEstado = document.createElement("option");
            opcionEstado.value = estado;
            opcionEstado.innerText = estado;

            nuevoEstado.append(opcionEstado);
        })

        // plataformas
        catalogos.plataformas.forEach((plataforma) => {
            const opcionPlataforma = document.createElement("option");
            opcionPlataforma.value = plataforma;
            opcionPlataforma.innerText = plataforma;

            nuevoPlataforma.append(opcionPlataforma);
        })

        // generos
        catalogos.generos.forEach((genero) => {
            const opcionGenero = document.createElement("option");
            opcionGenero.value = genero;
            opcionGenero.innerText = genero;

            nuevoGenero.append(opcionGenero);
        })



        // añadir el juego
        document.getElementById("guardarJuego").addEventListener("click", async (ev) => {
            ev.preventDefault();
            // 1. Construimos el objeto JSON (DTO)
            const juego = {
                titulo: document.getElementById("nuevoTitulo").value,
                plataforma: document.getElementById("nuevoPlataforma").value,
                genero: document.getElementById("nuevoGenero").value,
                anyo: Number(document.getElementById("nuevoAño").value),
                compania: document.getElementById("nuevoCompañia").value,
                precio: Number(document.getElementById("nuevoPrecio").value),
                nota: document.getElementById("nuevoNota").value,
                descripcion: document.getElementById("nuevoDescripcion").value,
                estado: document.getElementById("nuevoEstado").value
            };

            // Creamos juegoData
            const juegoData = new FormData();

            // Parte JSON →  @RequestPart("data")
            juegoData.append(
                "data",
                new Blob([JSON.stringify(juego)], { type: "application/json" })
            );

            // Parte archivo →@RequestPart("portada")
            const fileInput = document.getElementById("nuevoPortada");
            if (fileInput.files.length > 0) {
                juegoData.append("portada", fileInput.files[0]);
            }

            
            const response = await fetch("http://localhost:9000/api/videojuegos", {
                method: "POST",
                body: juegoData
            });

            if (response.ok) {
                const result = await response.json();
                alert("Videojuego creado con ID " + result.id);
                window.location.href = "index.html";
            } else {
                alert("Error al crear videojuego");
            }
        })

    } catch (error) {// juegos no cargan
        console.error('Error al cargar los catalogos:', error);
        alert('Se ha producido un error al cargar los catalogos.');
        
    }

})



