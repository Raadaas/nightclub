using Market.Application.Modules.Nightclub.MenuCategories.Commands.Create;
using Market.Application.Modules.Nightclub.MenuCategories.Commands.Update;
using Market.Application.Modules.Nightclub.MenuCategories.Commands.Delete;
using Market.Application.Modules.Nightclub.MenuCategories.Queries.List;

namespace Market.API.Controllers;

[ApiController]
[Route("[controller]")]
public class MenuCategoriesController(ISender sender) : ControllerBase
{
    [HttpPost]
    public async Task<ActionResult<int>> Create(CreateMenuCategoryCommand command, CancellationToken ct)
    {
        int id = await sender.Send(command, ct);
        return Ok(new { id });
    }

    [HttpPut("{id:int}")]
    public async Task Update(int id, UpdateMenuCategoryCommand command, CancellationToken ct)
    {
        command.Id = id;
        await sender.Send(command, ct);
    }

    [HttpDelete("{id:int}")]
    public async Task Delete(int id, CancellationToken ct)
    {
        await sender.Send(new DeleteMenuCategoryCommand { Id = id }, ct);
    }

    [AllowAnonymous]
    [HttpGet]
    public async Task<PageResult<ListMenuCategoriesQueryDto>> List([FromQuery] ListMenuCategoriesQuery query, CancellationToken ct)
    {
        return await sender.Send(query, ct);
    }
}
