namespace Market.Application.Modules.Nightclub.Gallery.Commands.Delete;

public class DeleteGalleryImageCommand : IRequest<Unit>
{
    public required int Id { get; set; }
}
