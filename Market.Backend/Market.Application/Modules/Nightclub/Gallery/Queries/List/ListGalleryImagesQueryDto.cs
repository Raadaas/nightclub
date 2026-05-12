namespace Market.Application.Modules.Nightclub.Gallery.Queries.List;

public sealed class ListGalleryImagesQueryDto
{
    public required int Id { get; init; }
    public required string ImageUrl { get; init; }
    public required string? Caption { get; init; }
    public required int DisplayOrder { get; init; }
    public required bool IsEnabled { get; init; }
    public required int? EventId { get; init; }
    public required string? EventTitle { get; init; }
}
