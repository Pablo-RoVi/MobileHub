using DotNetEnv;
using Microsoft.AspNetCore.Mvc;
using MobileHub.DTOs;
using Octokit;

namespace MobileHub.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CommitsController : ControllerBase
    {
        [HttpGet("{repositoryName}")]
        public async Task<ActionResult<RepositoryDTO>> GetCommitsByRepository(string repositoryName)
        {
            var client = new GitHubClient(new ProductHeaderValue("MobileHub"));
            var myToken = Env.GetString("GITHUB_ACCESS_TOKEN");
            client.Credentials = new Credentials(myToken);
            
            var commits = await client.Repository.Commit.GetAll(Env.GetString("GITHUB_ACCESS_USER"), repositoryName);

            var mappedCommits = commits.Select(c => new CommitDTO
            {
                Author = c.Author.Login,
                Commit = c.Commit.Message,
                CreatedAt = c.Commit.Author.Date,
            });

            return Ok(mappedCommits);
        }
    }
}