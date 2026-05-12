namespace Market.Infrastructure.Database.Configurations.Nightclub;

public class EventConfiguration : IEntityTypeConfiguration<EventEntity>
{
    public void Configure(EntityTypeBuilder<EventEntity> builder)
    {
        builder.ToTable("Events");

        builder.Property(x => x.Title)
            .IsRequired()
            .HasMaxLength(EventEntity.Constraints.TitleMaxLength);

        builder.Property(x => x.Description)
            .HasMaxLength(EventEntity.Constraints.DescriptionMaxLength);

        builder.Property(x => x.MainArtist)
            .HasMaxLength(EventEntity.Constraints.MainArtistMaxLength);

        builder.Property(x => x.ImageUrl)
            .HasMaxLength(EventEntity.Constraints.ImageUrlMaxLength);

        builder.Property(x => x.IsPublished)
            .IsRequired();
    }
}
