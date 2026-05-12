using Market.Application.Modules.Nightclub.Reservations.Commands.Create;
using Market.Application.Modules.Nightclub.Reservations.Commands.Confirm;
using Market.Application.Modules.Nightclub.Reservations.Commands.Cancel;
using Market.Application.Modules.Nightclub.Reservations.Queries.List;
using Market.Application.Modules.Nightclub.Reservations.Queries.GetById;

namespace Market.API.Controllers;

[ApiController]
[Route("[controller]")]
public class ReservationsController(ISender sender) : ControllerBase
{
    [HttpPost]
    public async Task<ActionResult<int>> Create(CreateReservationCommand command, CancellationToken ct)
    {
        int id = await sender.Send(command, ct);
        return CreatedAtAction(nameof(GetById), new { id }, new { id });
    }

    [HttpPut("{id:int}/confirm")]
    public async Task Confirm(int id, ConfirmReservationCommand command, CancellationToken ct)
    {
        command.Id = id;
        await sender.Send(command, ct);
    }

    [HttpPut("{id:int}/cancel")]
    public async Task Cancel(int id, CancelReservationCommand command, CancellationToken ct)
    {
        command.Id = id;
        await sender.Send(command, ct);
    }

    [HttpGet("{id:int}")]
    public async Task<GetReservationByIdQueryDto> GetById(int id, CancellationToken ct)
    {
        return await sender.Send(new GetReservationByIdQuery { Id = id }, ct);
    }

    [HttpGet]
    public async Task<PageResult<ListReservationsQueryDto>> List([FromQuery] ListReservationsQuery query, CancellationToken ct)
    {
        return await sender.Send(query, ct);
    }
}
