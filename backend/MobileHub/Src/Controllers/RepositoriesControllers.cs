using DotNetEnv;
using Microsoft.AspNetCore.Mvc;
using MobileHub.DTOs;
using Octokit;

namespace MobileHub.Controllers
{
    /// <summary>
    /// Controller for retrieving information about GitHub repositories.
    /// </summary>
    [ApiController]
    [Route("[controller]")]
    public class RepositoriesController : ControllerBase
    {
        /// <summary>
        /// Retrieves a list of repositories for the authenticated GitHub user,
        /// including information such as repository name, creation date, last update date,
        /// and the number of commits for each repository.
        /// </summary>
        /// <returns>Returns a list of mapped repository information.</returns>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<RepositoryDTO>>> GetAll()
        {
            // Initialize GitHub client with a specified user agent.
            var client = new GitHubClient(new ProductHeaderValue("MobileHub"));

            // Retrieve GitHub access token from environment variables.
            var myToken = Env.GetString("GITHUB_ACCESS_TOKEN");

            // Set credentials for the GitHub client.
            client.Credentials = new Credentials(myToken);
            
            // Retrieve all repositories for the authenticated GitHub user.
            var repositories = await client.Repository.GetAllForUser(Env.GetString("GITHUB_ACCESS_USER"));

            // Order repositories by the last update date in descending order.
            repositories = repositories.OrderByDescending(x => x.UpdatedAt).ToList();

            // Asynchronously retrieve the number of commits for each repository.
            var getCommitsTasks = repositories.Select(r => GetCommitsAmountByRepository(client, r.Name));

            // Wait for all tasks to complete.
            var commitsResult = await Task.WhenAll(getCommitsTasks);

            // Map GitHub repositories and commits to DTO for response.
            var mappedRepositories = repositories.Select((r, index) =>
            {
                var entity = new RepositoryDTO
                {
                    Name = r.Name,
                    CreatedAt = r.CreatedAt,
                    UpdatedAt = r.UpdatedAt,
                    CommitsAmount = commitsResult[index]
                };
                return entity;
            });

            // Return mapped repositories as a response.
            return Ok(mappedRepositories);
        }

        /// <summary>
        /// Retrieves the number of commits for a specific GitHub repository.
        /// </summary>
        /// <param name="client">The GitHub client.</param>
        /// <param name="repoName">The name of the GitHub repository.</param>
        /// <returns>Returns the number of commits for the repository.</returns>
        private async Task<int> GetCommitsAmountByRepository(GitHubClient client, string repoName)
        {
            // Retrieve all commits for the specified GitHub repository.
            var commits = await client.Repository.Commit.GetAll(Env.GetString("GITHUB_ACCESS_USER"), repoName);

            // If no commits are found, return 0.
            if (commits is null)
            {
                return 0;
            }

            // Return the count of commits for the repository.
            return commits.Count;
        }
    }
}
