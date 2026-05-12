namespace Market.Application.Modules.Nightclub.Events.Commands.Update;

public sealed class UpdateEventCommand : IRequest<Unit>
{
    [JsonIgnore]
    public int Id { get; set; }
    public string Title { get; set; }
    public string? Description { get; set; }
    public DateTime Date { get; set; }
    public TimeSpan DoorsOpenAt { get; set; }
    public string? MainArtist { get; set; }
    public string? ImageUrl { get; set; }
    public bool IsPublished { get; set; }
    public bool IsEnabled { get; set; }
}
