using Market.Application.Modules.Nightclub.MenuItems.Commands.Create;
using Market.Application.Modules.Nightclub.MenuItems.Commands.Update;
using Market.Application.Modules.Nightclub.MenuItems.Commands.Delete;
using Market.Application.Modules.Nightclub.MenuItems.Queries.List;

namespace Market.API.Controllers;

[ApiController]
[Route("[controller]")]
public class MenuItemsController(ISender sender) : ControllerBase
{
    [HttpPost]
    public async Task<ActionResult<int>> Create(CreateMenuItemCommand command, CancellationToken ct)
    {
        int id = await sender.Send(command, ct);
        return Ok(new { id });
    }

    [HttpPut("{id:int}")]
    public async Task Update(int id, UpdateMenuItemCommand command, CancellationToken ct)
    {
        command.Id = id;
        await sender.Send(command, ct);
    }

    [HttpDelete("{id:int}")]
    public async Task Delete(int id, CancellationToken ct)
    {
        await sender.Send(new DeleteMenuItemCommand { Id = id }, ct);
    }

    [HttpGet]
    public async Task<PageResult<ListMenuItemsQueryDto>> List([FromQuery] ListMenuItemsQuery query, CancellationToken ct)
    {
        return await sender.Send(query, ct);
    }
}
