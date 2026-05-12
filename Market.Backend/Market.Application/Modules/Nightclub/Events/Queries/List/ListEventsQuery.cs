namespace Market.Application.Modules.Nightclub.Events.Queries.List;

public sealed class ListEventsQuery : BasePagedQuery<ListEventsQueryDto>
{
    public string? Search { get; init; }
    public bool? OnlyPublished { get; init; }
}
