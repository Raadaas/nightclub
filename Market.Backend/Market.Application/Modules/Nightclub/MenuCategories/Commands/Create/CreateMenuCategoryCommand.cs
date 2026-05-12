namespace Market.Application.Modules.Nightclub.MenuCategories.Commands.Create;

public class CreateMenuCategoryCommand : IRequest<int>
{
    public string Name { get; set; }
    public int DisplayOrder { get; set; }
}
