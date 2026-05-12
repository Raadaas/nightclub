namespace Market.Application.Modules.Nightclub.MenuCategories.Commands.Delete;

public class DeleteMenuCategoryCommand : IRequest<Unit>
{
    public required int Id { get; set; }
}
