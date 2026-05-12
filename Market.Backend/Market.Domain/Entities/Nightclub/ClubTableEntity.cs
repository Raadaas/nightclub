using Market.Domain.Common;

namespace Market.Domain.Entities.Nightclub;

public class ClubTableEntity : BaseEntity
{
    public string Name { get; set; }
    public string? Section { get; set; }
    public int Capacity { get; set; }
    public decimal MinSpend { get; set; }
    public bool IsVip { get; set; }
    public string? Description { get; set; }
    public bool IsEnabled { get; set; }

    public ICollection<ReservationEntity> Reservations { get; private set; } = new List<ReservationEntity>();

    public static class Constraints
    {
        public const int NameMaxLength = 50;
        public const int SectionMaxLength = 100;
        public const int DescriptionMaxLength = 500;
    }
}
