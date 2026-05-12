namespace Market.Infrastructure.Database.Configurations.Nightclub;

public class ReservationConfiguration : IEntityTypeConfiguration<ReservationEntity>
{
    public void Configure(EntityTypeBuilder<ReservationEntity> builder)
    {
        builder.ToTable("Reservations");

        builder.Property(x => x.GuestName)
            .IsRequired()
            .HasMaxLength(ReservationEntity.Constraints.GuestNameMaxLength);

        builder.Property(x => x.GuestEmail)
            .IsRequired()
            .HasMaxLength(ReservationEntity.Constraints.GuestEmailMaxLength);

        builder.Property(x => x.GuestPhone)
            .IsRequired()
            .HasMaxLength(ReservationEntity.Constraints.GuestPhoneMaxLength);

        builder.Property(x => x.Note)
            .HasMaxLength(ReservationEntity.Constraints.NoteMaxLength);

        builder.Property(x => x.AdminNote)
            .HasMaxLength(ReservationEntity.Constraints.AdminNoteMaxLength);

        builder.Property(x => x.Status)
            .IsRequired();

        builder.HasOne(x => x.Event)
            .WithMany(x => x.Reservations)
            .HasForeignKey(x => x.EventId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.HasOne(x => x.ClubTable)
            .WithMany(x => x.Reservations)
            .HasForeignKey(x => x.ClubTableId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.HasOne(x => x.User)
            .WithMany()
            .HasForeignKey(x => x.UserId)
            .OnDelete(DeleteBehavior.SetNull);
    }
}
