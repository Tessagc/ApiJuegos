package euroformac.controller;

import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.*;

import euroformac.model.Estado;
import euroformac.model.Genero;
import euroformac.model.Plataforma;

@RestController
@RequestMapping("/api/videojuegos")
@CrossOrigin(origins = "*")
public class CatalogosController {

    @GetMapping("/catalogos")
    public Map<String, List<String>> catalogos() {

        List<String> plataformas = List.of(Plataforma.values()).stream().map(Enum::name).toList();
        List<String> generos = List.of(Genero.values()).stream().map(Enum::name).toList();
        List<String> estados = List.of(Estado.values()).stream().map(Enum::name).toList();

        return Map.of(
                "plataformas", plataformas,
                "generos", generos,
                "estados", estados
        );
    }
}
