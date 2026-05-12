using Market.Domain.Common;
using Market.Domain.Entities.Identity;

namespace Market.Domain.Entities.Nightclub;

public class ReservationEntity : BaseEntity
{
    public int EventId { get; set; }
    public EventEntity Event { get; set; }

    public int ClubTableId { get; set; }
    public ClubTableEntity ClubTable { get; set; }

    // Nullable — rezervacija može biti i bez korisničkog računa
    public int? UserId { get; set; }
    public MarketUserEntity? User { get; set; }

    // Podaci gosta (obavezni kad nema UserId, inače prefillani)
    public string GuestName { get; set; }
    public string GuestEmail { get; set; }
    public string GuestPhone { get; set; }

    public int NumberOfGuests { get; set; }
    public ReservationStatus Status { get; set; } = ReservationStatus.Pending;
    public string? Note { get; set; }
    public string? AdminNote { get; set; }

    public DateTime? ConfirmedAtUtc { get; set; }
    public DateTime? CancelledAtUtc { get; set; }

    public static class Constraints
    {
        public const int GuestNameMaxLength = 100;
        public const int GuestEmailMaxLength = 200;
        public const int GuestPhoneMaxLength = 30;
        public const int NoteMaxLength = 500;
        public const int AdminNoteMaxLength = 500;
    }
}
