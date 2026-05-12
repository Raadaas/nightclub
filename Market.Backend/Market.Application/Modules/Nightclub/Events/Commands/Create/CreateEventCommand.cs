namespace Market.Application.Modules.Nightclub.Events.Commands.Create;

public class CreateEventCommand : IRequest<int>
{
    public string Title { get; set; }
    public string? Description { get; set; }
    public DateTime Date { get; set; }
    public TimeSpan DoorsOpenAt { get; set; }
    public string? MainArtist { get; set; }
    public string? ImageUrl { get; set; }
    public bool IsPublished { get; set; }
}
