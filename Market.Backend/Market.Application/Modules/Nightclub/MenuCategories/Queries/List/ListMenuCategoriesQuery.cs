namespace Market.Application.Modules.Nightclub.MenuCategories.Queries.List;

public sealed class ListMenuCategoriesQuery : BasePagedQuery<ListMenuCategoriesQueryDto>
{
    public bool? OnlyEnabled { get; init; }
}
