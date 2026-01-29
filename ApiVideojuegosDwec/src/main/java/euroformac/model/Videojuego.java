package euroformac.model;

import java.math.BigDecimal;

import jakarta.persistence.*;

@Entity
@Table(name = "videojuegos")
public class Videojuego {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(nullable = false, length = 120)
	private String titulo;

	@Enumerated(EnumType.STRING)
	@Column(nullable = false, length = 20)
	private Plataforma plataforma;

	@Enumerated(EnumType.STRING)
	@Column(nullable = false, length = 20)
	private Genero genero;

	@Column(nullable = false)
	private Integer anyo;

	@Column(nullable = false, length = 120)
	private String compania;

	@Column(nullable = false, precision = 7, scale = 2)
	private BigDecimal precio;

	@Column(precision = 3, scale = 1)
	private BigDecimal nota;

	@Column(name = "portada_url", length = 500)
	private String portadaUrl;

	@Column(columnDefinition = "TEXT")
	private String descripcion;

	@Enumerated(EnumType.STRING)
	@Column(nullable = false, length = 20)
	private Estado estado;

	public Videojuego() {
	}

	// (Opcional) constructor útil
	public Videojuego(String titulo, Plataforma plataforma, Genero genero, Integer anyo, String compania,
			BigDecimal precio, BigDecimal nota, String portadaUrl, String descripcion, Estado estado) {
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

	// Getters / Setters
	public Long getId() {
		return id;
	}

	public String getTitulo() {
		return titulo;
	}

	public void setTitulo(String titulo) {
		this.titulo = titulo;
	}

	public Plataforma getPlataforma() {
		return plataforma;
	}

	public void setPlataforma(Plataforma plataforma) {
		this.plataforma = plataforma;
	}

	public Genero getGenero() {
		return genero;
	}

	public void setGenero(Genero genero) {
		this.genero = genero;
	}

	public Integer getAnyo() {
		return anyo;
	}

	public void setAnyo(Integer anyo) {
		this.anyo = anyo;
	}

	public String getCompania() {
		return compania;
	}

	public void setCompania(String compania) {
		this.compania = compania;
	}

	public BigDecimal getPrecio() {
		return precio;
	}

	public void setPrecio(BigDecimal precio) {
		this.precio = precio;
	}

	public BigDecimal getNota() {
		return nota;
	}

	public void setNota(BigDecimal nota) {
		this.nota = nota;
	}

	public String getPortadaUrl() {
		return portadaUrl;
	}

	public void setPortadaUrl(String portadaUrl) {
		this.portadaUrl = portadaUrl;
	}

	public String getDescripcion() {
		return descripcion;
	}

	public void setDescripcion(String descripcion) {
		this.descripcion = descripcion;
	}

	public Estado getEstado() {
		return estado;
	}

	public void setEstado(Estado estado) {
		this.estado = estado;
	}
}
