namespace Market.Application.Modules.Nightclub.Gallery.Commands.Update;

public sealed class UpdateGalleryImageCommand : IRequest<Unit>
{
    [JsonIgnore]
    public int Id { get; set; }
    public string ImageUrl { get; set; }
    public string? Caption { get; set; }
    public int DisplayOrder { get; set; }
    public int? EventId { get; set; }
    public bool IsEnabled { get; set; }
}
