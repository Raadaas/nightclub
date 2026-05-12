namespace Market.Application.Modules.Nightclub.MenuCategories.Commands.Update;

public sealed class UpdateMenuCategoryCommand : IRequest<Unit>
{
    [JsonIgnore]
    public int Id { get; set; }
    public string Name { get; set; }
    public int DisplayOrder { get; set; }
    public bool IsEnabled { get; set; }
}
