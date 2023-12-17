using DotNetEnv;
using Microsoft.AspNetCore.Mvc;
using MobileHub.DTOs;
using Octokit;

namespace MobileHub.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class RepositoriesController : ControllerBase
    {

        [HttpGet]
        public async Task<ActionResult<IEnumerable<RepositoryDTO>>> GetAll()
        {
            var client = new GitHubClient(new ProductHeaderValue("MobileHub"));
            var myToken = Env.GetString("GITHUB_ACCESS_TOKEN");
            client.Credentials = new Credentials(myToken);
            
            var repositories = await client.Repository.GetAllForUser(Env.GetString("GITHUB_ACCESS_USER"));

            repositories = repositories.OrderByDescending(x => x.UpdatedAt).ToList();

            var getCommitsTasks = repositories.Select(r => GetCommitsAmountByRepository(client, r.Name));

            var commitsResult = await Task.WhenAll(getCommitsTasks);

            var mappedRepositories = repositories.Select((r, index) =>
            {
                var entity = new RepositoryDTO {
                    Name = r.Name,
                    CreatedAt = r.CreatedAt,
                    UpdatedAt = r.UpdatedAt,
                    CommitsAmount = commitsResult[index]
                };
                return entity;
            });

            return Ok(mappedRepositories);

        }

        private async Task<int> GetCommitsAmountByRepository(GitHubClient client, string repoName)
        {
            var commits = await client.Repository.Commit.GetAll(Env.GetString("GITHUB_ACCESS_USER"), repoName);

            if (commits is null) return 0;
        
            return commits.Count;
            
        }

    }
}