namespace Market.Application.Modules.Profile.Queries.Get;

public sealed class GetProfileQueryDto
{
    public required int Id { get; init; }
    public required string Firstname { get; init; }
    public required string Lastname { get; init; }
    public required string Email { get; init; }
    public required bool IsAdmin { get; init; }
    public required bool IsManager { get; init; }
    public required bool IsEmployee { get; init; }
}
