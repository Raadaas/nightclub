using Market.Application.Abstractions;
using Market.Domain.Entities.Nightclub;
using Market.Domain.Entities.Sales;

namespace Market.Infrastructure.Database;

public partial class DatabaseContext : DbContext, IAppDbContext
{
    public DbSet<ProductCategoryEntity> ProductCategories => Set<ProductCategoryEntity>();
    public DbSet<ProductEntity> Products => Set<ProductEntity>();
    public DbSet<MarketUserEntity> Users => Set<MarketUserEntity>();
    public DbSet<RefreshTokenEntity> RefreshTokens => Set<RefreshTokenEntity>();

    public DbSet<OrderEntity> Orders => Set<OrderEntity>();
    public DbSet<OrderItemEntity> OrderItems => Set<OrderItemEntity>();

    // Nightclub
    public DbSet<EventEntity> Events => Set<EventEntity>();
    public DbSet<ClubTableEntity> ClubTables => Set<ClubTableEntity>();
    public DbSet<ReservationEntity> Reservations => Set<ReservationEntity>();
    public DbSet<GalleryImageEntity> GalleryImages => Set<GalleryImageEntity>();
    public DbSet<MenuCategoryEntity> MenuCategories => Set<MenuCategoryEntity>();
    public DbSet<MenuItemEntity> MenuItems => Set<MenuItemEntity>();

    private readonly TimeProvider _clock;
    public DatabaseContext(DbContextOptions<DatabaseContext> options, TimeProvider clock) : base(options)
    {
        _clock = clock;
    }
}