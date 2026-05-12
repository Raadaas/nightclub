namespace Market.Application.Modules.Nightclub.MenuItems.Queries.List;

public sealed class ListMenuItemsQueryDto
{
    public required int Id { get; init; }
    public required string Name { get; init; }
    public required string? Description { get; init; }
    public required decimal Price { get; init; }
    public required string? ImageUrl { get; init; }
    public required int DisplayOrder { get; init; }
    public required bool IsEnabled { get; init; }
    public required int MenuCategoryId { get; init; }
    public required string MenuCategoryName { get; init; }
}
