package euroformac.dto;

import java.math.BigDecimal;

import euroformac.model.Estado;
import euroformac.model.Genero;
import euroformac.model.Plataforma;

public class VideojuegoResponse {

    private Long id;
    private String titulo;
    private Plataforma plataforma;
    private Genero genero;
    private Integer anyo;
    private String compania;
    private BigDecimal precio;
    private BigDecimal nota;
    private String portadaUrl;
    private String descripcion;
    private Estado estado;

    public VideojuegoResponse() {}

    // Constructor cómodo para mapear desde Entity
    public VideojuegoResponse(Long id, String titulo, Plataforma plataforma, Genero genero,
                              Integer anyo, String compania, BigDecimal precio,
                              BigDecimal nota, String portadaUrl,
                              String descripcion, Estado estado) {

        this.id = id;
        this.titulo = titulo;
        this.plataforma = plataforma;
        this.genero = genero;
        this.anyo = anyo;
        this.compania = compania;
        this.precio = precio;
        this.nota = nota;
        this.portadaUrl = portadaUrl;
        this.descripcion = descripcion;
        this.estado = estado;
    }

    // Getters y Setters
    public Long getId() {
        return id;
    }

    public String getTitulo() {
        return titulo;
    }

    public Plataforma getPlataforma() {
        return plataforma;
    }

    public Genero getGenero() {
        return genero;
    }

    public Integer getAnyo() {
        return anyo;
    }

    public String getCompania() {
        return compania;
    }

    public BigDecimal getPrecio() {
        return precio;
    }

    public BigDecimal getNota() {
        return nota;
    }

    public String getPortadaUrl() {
        return portadaUrl;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public Estado getEstado() {
        return estado;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public void setPlataforma(Plataforma plataforma) {
        this.plataforma = plataforma;
    }

    public void setGenero(Genero genero) {
        this.genero = genero;
    }

    public void setAnyo(Integer anyo) {
        this.anyo = anyo;
    }

    public void setCompania(String compania) {
        this.compania = compania;
    }

    public void setPrecio(BigDecimal precio) {
        this.precio = precio;
    }

    public void setNota(BigDecimal nota) {
        this.nota = nota;
    }

    public void setPortadaUrl(String portadaUrl) {
        this.portadaUrl = portadaUrl;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public void setEstado(Estado estado) {
        this.estado = estado;
    }
}
