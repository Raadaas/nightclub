namespace Market.Application.Modules.Profile.Commands.UpdateProfile;

public sealed class UpdateProfileCommand : IRequest<Unit>
{
    public required string Firstname { get; set; }
    public required string Lastname { get; set; }
    public required string Email { get; set; }
}
