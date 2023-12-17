using DotNetEnv;
using Microsoft.AspNetCore.Mvc;
using MobileHub.DTOs;
using Octokit;

namespace MobileHub.Controllers
{
    /// <summary>
    /// Controller for retrieving commit information from a GitHub repository.
    /// </summary>
    [ApiController]
    [Route("[controller]")]
    public class CommitsController : ControllerBase
    {
        /// <summary>
        /// Retrieves a list of commits for the specified GitHub repository.
        /// </summary>
        /// <param name="repositoryName">The name of the GitHub repository.</param>
        /// <returns>Returns a list of mapped commit information.</returns>
        [HttpGet("{repositoryName}")]
        public async Task<ActionResult<RepositoryDTO>> GetCommitsByRepository(string repositoryName)
        {
            // Initialize GitHub client with specified user agent.
            var client = new GitHubClient(new ProductHeaderValue("MobileHub"));

            // Retrieve GitHub access token from environment variables.
            var myToken = Env.GetString("GITHUB_ACCESS_TOKEN");

            // Set credentials for the GitHub client.
            client.Credentials = new Credentials(myToken);
            
            // Retrieve commits from the specified GitHub repository.
            var commits = await client.Repository.Commit.GetAll(Env.GetString("GITHUB_ACCESS_USER"), repositoryName);

            // Map GitHub commits to DTO for response.
            var mappedCommits = commits.Select(c => new CommitDTO
            {
                Author = c.Author.Login,
                Commit = c.Commit.Message,
                CreatedAt = c.Commit.Author.Date,
            });

            // Return mapped commits as a response.
            return Ok(mappedCommits);
        }
    }
}