namespace Market.Infrastructure.Database.Configurations.Nightclub;

public class GalleryImageConfiguration : IEntityTypeConfiguration<GalleryImageEntity>
{
    public void Configure(EntityTypeBuilder<GalleryImageEntity> builder)
    {
        builder.ToTable("GalleryImages");

        builder.Property(x => x.ImageUrl)
            .IsRequired()
            .HasMaxLength(GalleryImageEntity.Constraints.ImageUrlMaxLength);

        builder.Property(x => x.Caption)
            .HasMaxLength(GalleryImageEntity.Constraints.CaptionMaxLength);

        builder.HasOne(x => x.Event)
            .WithMany(x => x.GalleryImages)
            .HasForeignKey(x => x.EventId)
            .OnDelete(DeleteBehavior.SetNull);
    }
}
