using DotNetEnv;
using Microsoft.AspNetCore.Mvc;
using Octokit;

namespace MobileHub.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class Repositories : ControllerBase
    {

        [HttpGet]
        public async Task<ActionResult<List<Repository>>> Get()
        {
            var client = new GitHubClient(new ProductHeaderValue("MobileHub"));
            var myToken = Env.GetString("GITHUB_ACCESS_TOKEN");
            client.Credentials = new Credentials(myToken);
            
            var repositories = (await client.Repository.GetAllForUser("Dizkm8")).ToList();
            return repositories;

        }
    }

    [ApiController]
    [Route("[controller]")]
    public class Commits : ControllerBase
    {

        [HttpGet]
        public async Task<ActionResult<List<GitHubCommit>>> Get()
        {
            var client = new GitHubClient(new ProductHeaderValue("MobileHub"));
            var myToken = Env.GetString("GITHUB_ACCESS_TOKEN");
            client.Credentials = new Credentials(myToken);
            
            var commits = (await client.Repository.Commit.GetAll("Dizkm8", "Hackathon")).ToList();
            return commits;
            
        }
    }
}