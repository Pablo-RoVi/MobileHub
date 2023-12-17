// File: LoggedUser.ts

/**
 * Interface representing a logged-in user.
 */
export interface LoggedUser {
    /**
     * Authentication token associated with the logged-in user.
     */
    token: string;
  
    /**
     * Email address of the logged-in user.
     */
    email: string;
  
    /**
     * Birth year of the logged-in user.
     */
    birthYear: number;
  
    /**
     * "Rol Único Tributario" (Unique Tax Role) of the logged-in user.
     */
    rut: string;
  
    /**
     * Full name of the logged-in user.
     */
    fullName: string;
  }
  
  export default LoggedUser;
  