/**
 * File: Repository.ts
 * Description: Defines the structure of the Repository interface.
 */

/**
 * Interface representing a software repository.
 */
export interface Repository {
    /**
     * The name of the repository.
     */
    name: string;
  
    /**
     * The timestamp indicating when the repository was created.
     */
    createdAt: string;
  
    /**
     * The timestamp indicating when the repository was last updated.
     */
    updatedAt: string;
  
    /**
     * The number of commits in the repository.
     */
    commitsAmount: number;
  }
  
  // Export the Repository interface for use in other parts of the application
  export default Repository;
  