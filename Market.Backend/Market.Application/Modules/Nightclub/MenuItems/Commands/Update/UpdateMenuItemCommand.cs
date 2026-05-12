namespace Market.Application.Modules.Nightclub.MenuItems.Commands.Update;

public sealed class UpdateMenuItemCommand : IRequest<Unit>
{
    [JsonIgnore]
    public int Id { get; set; }
    public string Name { get; set; }
    public string? Description { get; set; }
    public decimal Price { get; set; }
    public string? ImageUrl { get; set; }
    public int DisplayOrder { get; set; }
    public int MenuCategoryId { get; set; }
    public bool IsEnabled { get; set; }
}
