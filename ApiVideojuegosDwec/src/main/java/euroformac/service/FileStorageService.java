package euroformac.service;

import java.io.IOException;
import java.nio.file.*;
import java.util.Set;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class FileStorageService {

    @Value("${app.upload.dir}")
    private String uploadDir;

    private static final Set<String> ALLOWED = Set.of("image/jpeg", "image/png", "image/webp");

    public String savePortada(MultipartFile file) throws IOException {
        if (file == null || file.isEmpty()) return null;

        // limitar tipos
        String contentType = file.getContentType();
        if (contentType == null || !ALLOWED.contains(contentType)) {
            throw new IllegalArgumentException("Formato no permitido. Usa JPG/PNG/WEBP.");
        }

        Path dir = Paths.get(uploadDir).toAbsolutePath().normalize();
        Files.createDirectories(dir);


        String original = file.getOriginalFilename() == null ? "" : file.getOriginalFilename();
        String ext = getExtension(original);
        if (ext.isBlank()) ext = guessExtension(contentType);

        String filename = original;
        Path target = dir.resolve(filename);

        Files.copy(file.getInputStream(), target, StandardCopyOption.REPLACE_EXISTING);

        // URL pública que guardaremos en BD
        return filename;
    }

    // extension del archivo
    private String getExtension(String name) {
        int dot = name.lastIndexOf('.');
        return (dot >= 0) ? name.substring(dot).toLowerCase() : "";
    }

    // preguntar extension
    private String guessExtension(String contentType) {
        return switch (contentType) {
            case "image/jpeg" -> ".jpg";
            case "image/png"  -> ".png";
            case "image/webp" -> ".webp";
            default -> "";
        };
    }
}
