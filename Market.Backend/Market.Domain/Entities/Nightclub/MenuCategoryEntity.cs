using Market.Domain.Common;

namespace Market.Domain.Entities.Nightclub;

public class MenuCategoryEntity : BaseEntity
{
    public string Name { get; set; }
    public int DisplayOrder { get; set; }
    public bool IsEnabled { get; set; }

    public ICollection<MenuItemEntity> Items { get; private set; } = new List<MenuItemEntity>();

    public static class Constraints
    {
        public const int NameMaxLength = 100;
    }
}
