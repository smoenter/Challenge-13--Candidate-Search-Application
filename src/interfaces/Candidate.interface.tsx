// TODO: Create an interface for the Candidate objects returned by the API
export interface Candidate {
    login: string;
    location: string | null;
    avatar_url: string;
    email: string;
    html_url: string;
    company: string | null;
   }
     