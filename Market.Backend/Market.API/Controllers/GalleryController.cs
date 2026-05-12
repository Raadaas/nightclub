using Market.Application.Modules.Nightclub.Gallery.Commands.Create;
using Market.Application.Modules.Nightclub.Gallery.Commands.Update;
using Market.Application.Modules.Nightclub.Gallery.Commands.Delete;
using Market.Application.Modules.Nightclub.Gallery.Queries.List;

namespace Market.API.Controllers;

[ApiController]
[Route("[controller]")]
public class GalleryController(ISender sender) : ControllerBase
{
    [HttpPost]
    public async Task<ActionResult<int>> Create(CreateGalleryImageCommand command, CancellationToken ct)
    {
        int id = await sender.Send(command, ct);
        return Ok(new { id });
    }

    [HttpPut("{id:int}")]
    public async Task Update(int id, UpdateGalleryImageCommand command, CancellationToken ct)
    {
        command.Id = id;
        await sender.Send(command, ct);
    }

    [HttpDelete("{id:int}")]
    public async Task Delete(int id, CancellationToken ct)
    {
        await sender.Send(new DeleteGalleryImageCommand { Id = id }, ct);
    }

    [HttpGet]
    public async Task<PageResult<ListGalleryImagesQueryDto>> List([FromQuery] ListGalleryImagesQuery query, CancellationToken ct)
    {
        return await sender.Send(query, ct);
    }
}
