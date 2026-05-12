namespace Market.Infrastructure.Database.Configurations.Nightclub;

public class ClubTableConfiguration : IEntityTypeConfiguration<ClubTableEntity>
{
    public void Configure(EntityTypeBuilder<ClubTableEntity> builder)
    {
        builder.ToTable("ClubTables");

        builder.Property(x => x.Name)
            .IsRequired()
            .HasMaxLength(ClubTableEntity.Constraints.NameMaxLength);

        builder.Property(x => x.Section)
            .HasMaxLength(ClubTableEntity.Constraints.SectionMaxLength);

        builder.Property(x => x.Description)
            .HasMaxLength(ClubTableEntity.Constraints.DescriptionMaxLength);

        builder.Property(x => x.MinSpend)
            .HasPrecision(18, 2);
    }
}
