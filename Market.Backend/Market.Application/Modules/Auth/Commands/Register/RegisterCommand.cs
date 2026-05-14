namespace Market.Application.Modules.Auth.Commands.Register;

public sealed class RegisterCommand : IRequest<Unit>
{
    public string Firstname { get; set; } = string.Empty;
    public string Lastname  { get; set; } = string.Empty;
    public string Email     { get; set; } = string.Empty;
    public string Password  { get; set; } = string.Empty;
}
