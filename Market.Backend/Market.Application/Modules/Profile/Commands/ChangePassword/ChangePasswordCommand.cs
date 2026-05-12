namespace Market.Application.Modules.Profile.Commands.ChangePassword;

public sealed class ChangePasswordCommand : IRequest<Unit>
{
    public required string CurrentPassword { get; set; }
    public required string NewPassword { get; set; }
}
