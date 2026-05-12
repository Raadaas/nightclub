namespace Market.Infrastructure.Database.Configurations.Nightclub;

public class MenuCategoryConfiguration : IEntityTypeConfiguration<MenuCategoryEntity>
{
    public void Configure(EntityTypeBuilder<MenuCategoryEntity> builder)
    {
        builder.ToTable("MenuCategories");

        builder.Property(x => x.Name)
            .IsRequired()
            .HasMaxLength(MenuCategoryEntity.Constraints.NameMaxLength);
    }
}
