using Market.Domain.Common;

namespace Market.Domain.Entities.Nightclub;

public class GalleryImageEntity : BaseEntity
{
    public string ImageUrl { get; set; }
    public string? Caption { get; set; }
    public int DisplayOrder { get; set; }
    public bool IsEnabled { get; set; }

    // Nullable — slika može biti vezana za event ili dio opće galerije
    public int? EventId { get; set; }
    public EventEntity? Event { get; set; }

    public static class Constraints
    {
        public const int ImageUrlMaxLength = 500;
        public const int CaptionMaxLength = 200;
    }
}
