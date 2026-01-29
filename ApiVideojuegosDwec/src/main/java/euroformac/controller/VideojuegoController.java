package euroformac.controller;

import java.io.IOException;
import java.net.URI;
import java.util.List;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import euroformac.dto.VideojuegoRequest;
import euroformac.dto.VideojuegoResponse;
import euroformac.model.Videojuego;
import euroformac.repository.VideojuegoRepository;
import euroformac.service.FileStorageService;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/videojuegos")
@CrossOrigin(origins = "*") // Para DWEC
public class VideojuegoController {

    private final VideojuegoRepository repo;
    private final FileStorageService fileStorageService;

    public VideojuegoController(VideojuegoRepository repo, FileStorageService fileStorageService) {
        this.repo = repo;
        this.fileStorageService = fileStorageService;
    }

    // 3.1 Listar videojuegos
    @GetMapping
    public List<VideojuegoResponse> listar() {
        return repo.findAll()
                .stream()
                .map(this::toResponse)
                .toList();
    }

    // 3.2 Obtener uno
    @GetMapping("/{id}")
    public ResponseEntity<VideojuegoResponse> obtenerUno(@PathVariable Long id) {
        return repo.findById(id)
                .map(v -> ResponseEntity.ok(toResponse(v)))
                .orElse(ResponseEntity.notFound().build());
    }

    // 3.3 Crear
    @PostMapping()
    public ResponseEntity<VideojuegoResponse> crearConPortada(
            @RequestPart("data") VideojuegoRequest request, // juego y portada juego
            @RequestPart(value = "portada", required = false) MultipartFile portada) throws IOException{

        // Guardar fichero y guardar nombre fichero en request.portadaUrl
        String portadaUrl = fileStorageService.savePortada(portada);
        if (portadaUrl != null) {
            request.setPortadaUrl(portadaUrl);
        }

        Videojuego entity = toEntity(request);
        Videojuego guardado = repo.save(entity);

        URI location = URI.create("/api/videojuegos/" + guardado.getId());
        return ResponseEntity.created(location).body(toResponse(guardado));
    }


    // 3.4 Actualizar
    @CrossOrigin(origins = "http://192.168.56.1:5500")
    @PutMapping(value = "/actualizar/{id}",
    consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<VideojuegoResponse> actualizar(@PathVariable Long id,
                                                         @RequestPart("data") VideojuegoRequest request,
                                                         @RequestPart(value = "portada", required = false) MultipartFile portada) throws IOException {
        // guardar la portada nueva
        String portadaUrl = fileStorageService.savePortada(portada);

        return repo.findById(id)
                .map(existente -> {
                    // Reemplazo completo: copiamos TODOS los campos desde el request
                    existente.setTitulo(request.getTitulo());
                    existente.setPlataforma(request.getPlataforma());
                    existente.setGenero(request.getGenero());
                    existente.setAnyo(request.getAnyo());
                    existente.setCompania(request.getCompania());
                    existente.setPrecio(request.getPrecio());
                    existente.setNota(request.getNota());
                    existente.setPortadaUrl(request.getPortadaUrl());
                    existente.setDescripcion(request.getDescripcion());
                    existente.setEstado(request.getEstado());

                    Videojuego actualizado = repo.save(existente);
                    return ResponseEntity.ok(toResponse(actualizado));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    // 3.5 Borrar
    @DeleteMapping("/{id}")
    public ResponseEntity<VideojuegoResponse> borrar(@PathVariable Long id) {

        return repo.findById(id)
                .map(v -> {
                    repo.delete(v);
                    return ResponseEntity.ok(toResponse(v)); // 200 + objeto borrado
                })
                .orElse(ResponseEntity.notFound().build());
    }

    // mapeos (DTO <-> Entity)

    private VideojuegoResponse toResponse(Videojuego v) {
        return new VideojuegoResponse(
                v.getId(),
                v.getTitulo(),
                v.getPlataforma(),
                v.getGenero(),
                v.getAnyo(),
                v.getCompania(),
                v.getPrecio(),
                v.getNota(),
                v.getPortadaUrl(),
                v.getDescripcion(),
                v.getEstado()
        );
    }

    private Videojuego toEntity(VideojuegoRequest r) {
        Videojuego v = new Videojuego();
        v.setTitulo(r.getTitulo());
        v.setPlataforma(r.getPlataforma());
        v.setGenero(r.getGenero());
        v.setAnyo(r.getAnyo());
        v.setCompania(r.getCompania());
        v.setPrecio(r.getPrecio());
        v.setNota(r.getNota());
        v.setPortadaUrl(r.getPortadaUrl());
        v.setDescripcion(r.getDescripcion());
        v.setEstado(r.getEstado());
        return v;
    }
}
