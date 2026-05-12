namespace Market.Infrastructure.Database.Configurations.Nightclub;

public class MenuItemConfiguration : IEntityTypeConfiguration<MenuItemEntity>
{
    public void Configure(EntityTypeBuilder<MenuItemEntity> builder)
    {
        builder.ToTable("MenuItems");

        builder.Property(x => x.Name)
            .IsRequired()
            .HasMaxLength(MenuItemEntity.Constraints.NameMaxLength);

        builder.Property(x => x.Description)
            .HasMaxLength(MenuItemEntity.Constraints.DescriptionMaxLength);

        builder.Property(x => x.ImageUrl)
            .HasMaxLength(MenuItemEntity.Constraints.ImageUrlMaxLength);

        builder.Property(x => x.Price)
            .HasPrecision(18, 2);

        builder.HasOne(x => x.MenuCategory)
            .WithMany(x => x.Items)
            .HasForeignKey(x => x.MenuCategoryId)
            .OnDelete(DeleteBehavior.Restrict);
    }
}
