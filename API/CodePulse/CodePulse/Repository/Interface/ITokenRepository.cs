using Microsoft.AspNetCore.Identity;

namespace CodePulse.Repository.Interface
{
    public interface ITokenRepository
    {
        string CreateJwksToken(IdentityUser user, List<string> roles);
    }
}
