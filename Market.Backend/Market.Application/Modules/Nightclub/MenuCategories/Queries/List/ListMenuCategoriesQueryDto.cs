namespace Market.Application.Modules.Nightclub.MenuCategories.Queries.List;

public sealed class ListMenuCategoriesQueryDto
{
    public required int Id { get; init; }
    public required string Name { get; init; }
    public required int DisplayOrder { get; init; }
    public required bool IsEnabled { get; init; }
}
