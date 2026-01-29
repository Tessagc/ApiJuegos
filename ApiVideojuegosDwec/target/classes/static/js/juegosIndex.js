// boton para ir a añadir juegos
function irAñadirJuego() {
    window.location = "añadirJuego.html";
}


// cargar los juegos y catalogos de la aplicacion
async function cargarJuegos() {
    try {
        // cargar catalogos y juegos de sus URLs
        const [juegosResp, catalogosResp] = await Promise.all([
            fetch(urlVideojuegos),
            fetch(urlCatalogos)
        ])

        if (!juegosResp.ok) {
            throw new Error("Error cargando videojuegos");
        }

        if (!catalogosResp.ok) {
            throw new Error("Error cargando catalogos");
        }

        // listas de juegos y catalogos
        const juegos = await juegosResp.json();
        const catalogos = await catalogosResp.json();

        // ordenacion
        const ordenes = document.querySelectorAll(".orden");
        ordenes.forEach((orden) => {
            orden.addEventListener("click", () => {
                ordenacion = orden.value;
                cargarJuegos();
            })
        })
        

        if (ordenacion != "") {
            if (ordenacion == "asc") {
                juegos.sort((juego_a, juego_b) => juego_a.titulo.localeCompare(juego_b.titulo));
            } else if (ordenacion == "desc") {
                juegos.sort((juego_a, juego_b) => juego_b.titulo.localeCompare(juego_a.titulo));
            }
        }
        



        // selects de los filtros
        const filtroEstado = document.getElementById("filtroEstado");
        const filtroPlataforma = document.getElementById("filtroPlataforma");
        const filtroGenero = document.getElementById("filtroGenero");

        // meter info a los select para los filtros
        // estados
        if (filtroEstado.options.length == 2) {
            catalogos.estados.forEach((estado) => {
                const opcionEstado = document.createElement("option");
                opcionEstado.value = estado;
                opcionEstado.innerText = estado;

                filtroEstado.append(opcionEstado);
            })
        }
        
        // plataformas
        if (filtroPlataforma.options.length == 2) {
            catalogos.plataformas.forEach((plataforma) => {
                const opcionPlataforma = document.createElement("option");
                opcionPlataforma.value = plataforma;
                opcionPlataforma.innerText = plataforma;

                filtroPlataforma.append(opcionPlataforma);
            })
        }

        // generos
        if (filtroGenero.options.length == 2) {
            catalogos.generos.forEach((genero) => {
                const opcionGenero = document.createElement("option");
                opcionGenero.value = genero;
                opcionGenero.innerText = genero;

                filtroGenero.append(opcionGenero);
            })
        }


        // tabla de juegos
        const cuerpoTabla = document.getElementById("cuerpoTabla");
        cuerpoTabla.innerHTML = "";
        
        // rellenar tabla
        juegos.forEach((juego) => {
            // saltar si se cumple alugna de las condiciones de los filtros
            let cumpleRequisitos = true;
            if (filtroEstado.value != "#") {
                if (filtroEstado.value != juego.estado) {
                    cumpleRequisitos = false;
                }
            } 

            if (filtroGenero.value != "#") {
                if (filtroGenero.value != juego.genero) {
                    cumpleRequisitos = false;
                }
            } 
            
            if (filtroPlataforma.value != "#") {
                if (filtroPlataforma.value != juego.plataforma) {
                    cumpleRequisitos = false;
                }
            }

            if (!cumpleRequisitos) {
                return;
            }
            

            // fila
            const juegoFila = document.createElement("tr");

            // celdas

            const celdaTitulo = document.createElement("td");
            celdaTitulo.innerText = juego.titulo;

            const celdaPlataforma = document.createElement("td");
            celdaPlataforma.innerText = juego.plataforma;

            const celdaGenero = document.createElement("td");
            celdaGenero.innerText = juego.genero;

            const celdaEstado = document.createElement("td");
            celdaEstado.innerText = juego.estado;

            const celdaPrecio = document.createElement("td");
            celdaPrecio.innerText = juego.precio + " €";

            const celdaOpciones = document.createElement("td");

            const botonInfo = document.createElement("a");
            botonInfo.href = "juego.html?id=" + juego.id;
            botonInfo.className = "masInfo";
            botonInfo.innerText = "Mas informacion";

            const botonActualizar = document.createElement("a");
            botonActualizar.href = "actualizarJuego.html?id="+juego.id;
            botonActualizar.className = "actualizarInfo";
            botonActualizar.innerText = "Actualizar Info ";

            const botonBorrar = document.createElement("a");
            botonBorrar.href = "#";
            botonBorrar.className = "borrarJuego";
            botonBorrar.innerText = "Borrar juego";
            
            celdaOpciones.append(botonInfo, botonActualizar, botonBorrar);


            // opcion de borrar juego
            const urlBorrado = "http://localhost:9000/api/videojuegos/" + juego.id;
            botonBorrar.addEventListener("click", () => {
                if (confirm("¿Estas seguro que quiere eliminar " + juego.titulo + " de la lista?") == true) {
                    alert("Borrado realizado");
                    fetch(urlBorrado, {
                        method: "DELETE"
                    })
                    .then(response => {
                        if (!response.ok) {
                            throw new Error("No se pudo borrar");
                        }
                        return response.json(); // devuelve el videojuego borrado
                    })
                    .then(() => {
                        console.log("Juego borrado:", juego.id);
                        cargarJuegos();
                    })
                    .catch(
                        error => console.log("Error", error)
                    )
                } else {
                    alert("Borrado cancelado");
                }
            })
            
            // guardar todo
            juegoFila.append(celdaTitulo);
            juegoFila.append(celdaPlataforma);
            juegoFila.append(celdaGenero);
            juegoFila.append(celdaEstado);
            juegoFila.append(celdaPrecio);
            juegoFila.append(celdaOpciones);


            cuerpoTabla.append(juegoFila);
        })

    } catch (error) { // juegos no cargan
        console.error('Error al cargar los juegos:', error);
        alert('Se ha producido un error al cargar los videojuegos.');
    }
}


// variable externa para cargar
let ordenacion = "nada";

// urls para acceso
const urlVideojuegos = "http://localhost:9000/api/videojuegos";
const urlCatalogos =  "http://localhost:9000/api/videojuegos/catalogos";


document.addEventListener("DOMContentLoaded", cargarJuegos)