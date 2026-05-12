using Market.Domain.Entities.Nightclub;
using Market.Domain.Entities.Sales;

namespace Market.Application.Abstractions;

public interface IAppDbContext
{
    DbSet<ProductEntity> Products { get; }
    DbSet<ProductCategoryEntity> ProductCategories { get; }
    DbSet<MarketUserEntity> Users { get; }
    DbSet<RefreshTokenEntity> RefreshTokens { get; }
    DbSet<OrderEntity> Orders { get; }
    DbSet<OrderItemEntity> OrderItems { get; }

    // Nightclub
    DbSet<EventEntity> Events { get; }
    DbSet<ClubTableEntity> ClubTables { get; }
    DbSet<ReservationEntity> Reservations { get; }
    DbSet<GalleryImageEntity> GalleryImages { get; }
    DbSet<MenuCategoryEntity> MenuCategories { get; }
    DbSet<MenuItemEntity> MenuItems { get; }

    Task<int> SaveChangesAsync(CancellationToken ct);
}