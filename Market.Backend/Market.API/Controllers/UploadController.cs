namespace Market.API.Controllers;

[ApiController]
[Route("[controller]")]
public class UploadController(IWebHostEnvironment env) : ControllerBase
{
    private const long MaxBytes = 5 * 1024 * 1024; // 5 MB
    private static readonly HashSet<string> Allowed =
        new(StringComparer.OrdinalIgnoreCase) { ".jpg", ".jpeg", ".png", ".gif", ".webp" };

    [HttpPost]
    [Consumes("multipart/form-data")]
    public async Task<IActionResult> Upload([FromForm] IFormFile file, CancellationToken ct)
    {
        if (file is null || file.Length == 0)
            return BadRequest(new { message = "No file provided." });

        if (file.Length > MaxBytes)
            return BadRequest(new { message = "File exceeds the 5 MB limit." });

        var ext = Path.GetExtension(file.FileName);
        if (!Allowed.Contains(ext))
            return BadRequest(new { message = $"Only {string.Join(", ", Allowed)} files are allowed." });

        var root = env.WebRootPath ?? Path.Combine(Directory.GetCurrentDirectory(), "wwwroot");
        var uploadsDir = Path.Combine(root, "uploads");
        Directory.CreateDirectory(uploadsDir);

        var fileName = $"{Guid.NewGuid()}{ext.ToLowerInvariant()}";
        var filePath = Path.Combine(uploadsDir, fileName);

        await using var stream = System.IO.File.Create(filePath);
        await file.CopyToAsync(stream, ct);

        var baseUrl = $"{Request.Scheme}://{Request.Host}";
        return Ok(new { url = $"{baseUrl}/uploads/{fileName}" });
    }
}
