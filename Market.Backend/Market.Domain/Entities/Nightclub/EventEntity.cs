using Market.Domain.Common;

namespace Market.Domain.Entities.Nightclub;

public class EventEntity : BaseEntity
{
    public string Title { get; set; }
    public string? Description { get; set; }
    public DateTime Date { get; set; }
    public TimeSpan DoorsOpenAt { get; set; }
    public string? MainArtist { get; set; }
    public string? ImageUrl { get; set; }
    public bool IsPublished { get; set; }
    public bool IsEnabled { get; set; }

    public ICollection<ReservationEntity> Reservations { get; private set; } = new List<ReservationEntity>();
    public ICollection<GalleryImageEntity> GalleryImages { get; private set; } = new List<GalleryImageEntity>();

    public static class Constraints
    {
        public const int TitleMaxLength = 150;
        public const int DescriptionMaxLength = 2000;
        public const int MainArtistMaxLength = 150;
        public const int ImageUrlMaxLength = 500;
    }
}
