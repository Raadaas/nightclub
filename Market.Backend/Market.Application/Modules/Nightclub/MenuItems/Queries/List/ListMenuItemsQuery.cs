namespace Market.Application.Modules.Nightclub.MenuItems.Queries.List;

public sealed class ListMenuItemsQuery : BasePagedQuery<ListMenuItemsQueryDto>
{
    public int? MenuCategoryId { get; init; }
    public bool? OnlyEnabled { get; init; }
}
