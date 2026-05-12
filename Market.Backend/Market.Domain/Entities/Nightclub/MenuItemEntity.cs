using Market.Domain.Common;

namespace Market.Domain.Entities.Nightclub;

public class MenuItemEntity : BaseEntity
{
    public string Name { get; set; }
    public string? Description { get; set; }
    public decimal Price { get; set; }
    public string? ImageUrl { get; set; }
    public int DisplayOrder { get; set; }
    public bool IsEnabled { get; set; }

    public int MenuCategoryId { get; set; }
    public MenuCategoryEntity MenuCategory { get; set; }

    public static class Constraints
    {
        public const int NameMaxLength = 150;
        public const int DescriptionMaxLength = 500;
        public const int ImageUrlMaxLength = 500;
    }
}
