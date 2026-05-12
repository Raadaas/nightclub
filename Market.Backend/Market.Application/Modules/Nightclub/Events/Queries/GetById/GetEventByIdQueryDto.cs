namespace Market.Application.Modules.Nightclub.Events.Queries.GetById;

public class GetEventByIdQueryDto
{
    public required int Id { get; init; }
    public required string Title { get; init; }
    public required string? Description { get; init; }
    public required DateTime Date { get; init; }
    public required TimeSpan DoorsOpenAt { get; init; }
    public required string? MainArtist { get; init; }
    public required string? ImageUrl { get; init; }
    public required bool IsPublished { get; init; }
    public required bool IsEnabled { get; init; }
    public required int ReservationCount { get; init; }
}
