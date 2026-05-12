using Market.Application.Modules.Nightclub.ClubTables.Commands.Create;
using Market.Application.Modules.Nightclub.ClubTables.Commands.Update;
using Market.Application.Modules.Nightclub.ClubTables.Commands.Delete;
using Market.Application.Modules.Nightclub.ClubTables.Queries.List;
using Market.Application.Modules.Nightclub.ClubTables.Queries.GetById;

namespace Market.API.Controllers;

[ApiController]
[Route("[controller]")]
public class ClubTablesController(ISender sender) : ControllerBase
{
    [HttpPost]
    public async Task<ActionResult<int>> Create(CreateClubTableCommand command, CancellationToken ct)
    {
        int id = await sender.Send(command, ct);
        return CreatedAtAction(nameof(GetById), new { id }, new { id });
    }

    [HttpPut("{id:int}")]
    public async Task Update(int id, UpdateClubTableCommand command, CancellationToken ct)
    {
        command.Id = id;
        await sender.Send(command, ct);
    }

    [HttpDelete("{id:int}")]
    public async Task Delete(int id, CancellationToken ct)
    {
        await sender.Send(new DeleteClubTableCommand { Id = id }, ct);
    }

    [HttpGet("{id:int}")]
    public async Task<GetClubTableByIdQueryDto> GetById(int id, CancellationToken ct)
    {
        return await sender.Send(new GetClubTableByIdQuery { Id = id }, ct);
    }

    [HttpGet]
    public async Task<PageResult<ListClubTablesQueryDto>> List([FromQuery] ListClubTablesQuery query, CancellationToken ct)
    {
        return await sender.Send(query, ct);
    }
}
