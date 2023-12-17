/**
 * File: Commit.ts
 * Description: Defines the structure of the Commit interface.
 */

/**
 * Interface representing a commit in a version control system.
 */
export interface Commit {
    /**
     * The author of the commit.
     */
    author: string;
  
    /**
     * The commit details or message.
     */
    commit: string;
  
    /**
     * The timestamp indicating when the commit was created.
     */
    createdAt: string;
  }
  
  // Export the Commit interface for use in other parts of the application
  export default Commit;
  