namespace Market.Application.Modules.Nightclub.MenuItems.Commands.Create;

public class CreateMenuItemCommand : IRequest<int>
{
    public string Name { get; set; }
    public string? Description { get; set; }
    public decimal Price { get; set; }
    public string? ImageUrl { get; set; }
    public int DisplayOrder { get; set; }
    public int MenuCategoryId { get; set; }
}
