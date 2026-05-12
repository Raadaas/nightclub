namespace Market.Application.Modules.Nightclub.Reservations.Queries.GetById;

public class GetReservationByIdQuery : IRequest<GetReservationByIdQueryDto>
{
    public int Id { get; set; }
}
