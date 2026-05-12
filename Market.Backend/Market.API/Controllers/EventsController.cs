using Market.Application.Modules.Nightclub.Events.Commands.Create;
using Market.Application.Modules.Nightclub.Events.Commands.Update;
using Market.Application.Modules.Nightclub.Events.Commands.Delete;
using Market.Application.Modules.Nightclub.Events.Queries.List;
using Market.Application.Modules.Nightclub.Events.Queries.GetById;

namespace Market.API.Controllers;

[ApiController]
[Route("[controller]")]
public class EventsController(ISender sender) : ControllerBase
{
    [HttpPost]
    public async Task<ActionResult<int>> Create(CreateEventCommand command, CancellationToken ct)
    {
        int id = await sender.Send(command, ct);
        return CreatedAtAction(nameof(GetById), new { id }, new { id });
    }

    [HttpPut("{id:int}")]
    public async Task Update(int id, UpdateEventCommand command, CancellationToken ct)
    {
        command.Id = id;
        await sender.Send(command, ct);
    }

    [HttpDelete("{id:int}")]
    public async Task Delete(int id, CancellationToken ct)
    {
        await sender.Send(new DeleteEventCommand { Id = id }, ct);
    }

    [HttpGet("{id:int}")]
    public async Task<GetEventByIdQueryDto> GetById(int id, CancellationToken ct)
    {
        return await sender.Send(new GetEventByIdQuery { Id = id }, ct);
    }

    [HttpGet]
    public async Task<PageResult<ListEventsQueryDto>> List([FromQuery] ListEventsQuery query, CancellationToken ct)
    {
        return await sender.Send(query, ct);
    }
}
