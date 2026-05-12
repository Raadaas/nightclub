using Market.Application.Modules.Profile.Queries.Get;
using Market.Application.Modules.Profile.Commands.UpdateProfile;
using Market.Application.Modules.Profile.Commands.ChangePassword;

namespace Market.API.Controllers;

[ApiController]
[Route("[controller]")]
public class ProfileController(ISender sender) : ControllerBase
{
    [HttpGet]
    public async Task<GetProfileQueryDto> Get(CancellationToken ct)
        => await sender.Send(new GetProfileQuery(), ct);

    [HttpPut]
    public async Task Update([FromBody] UpdateProfileCommand command, CancellationToken ct)
        => await sender.Send(command, ct);

    [HttpPut("change-password")]
    public async Task ChangePassword([FromBody] ChangePasswordCommand command, CancellationToken ct)
        => await sender.Send(command, ct);
}
