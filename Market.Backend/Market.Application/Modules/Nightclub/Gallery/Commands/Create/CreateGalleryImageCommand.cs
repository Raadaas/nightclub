namespace Market.Application.Modules.Nightclub.Gallery.Commands.Create;

public class CreateGalleryImageCommand : IRequest<int>
{
    public string ImageUrl { get; set; }
    public string? Caption { get; set; }
    public int DisplayOrder { get; set; }
    public int? EventId { get; set; }
}
