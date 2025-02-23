// import Links
import { useState, useEffect } from 'react';
import { Candidate } from '../interfaces/Candidate.interface';
import { searchGithubUser } from '../api/API';


const SavedCandidates = () => {
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>([]);

    // Function to fetch the full user data (email, company, bio, location)
    const fetchUserDetails = async (login: string) => {
      try {
        const response = await searchGithubUser(login); // Make the API call to get detailed user data
        return response;
      } catch (error) {
        console.error(`Error fetching details for ${login}:`, error);
        return null;
      }
    };

  useEffect(() => {
    const storedCandidates = JSON.parse(localStorage.getItem('savedCandidates') || '[]');

    const fetchAllDetails = async () => {
      const candidatesWithDetails = await Promise.all(
        storedCandidates.map(async (candidate: Candidate) => {
          const detailedCandidate = await fetchUserDetails(candidate.login); // Fetch detailed info
          return detailedCandidate ? { ...candidate, ...detailedCandidate } : candidate;
        })
      );
      setSavedCandidates(candidatesWithDetails); // Update the state with the detailed data
    };

    fetchAllDetails();
  }, []);

  if (savedCandidates.length === 0) {
    return <div>No candidates saved yet.</div>;
  }

  return (
    <div>
      <h1>Saved Candidates</h1>

      {/* Table structure */}
      <table>
        <thead>
          <tr>
            <th>Avatar</th>
            <th>Name</th>
            <th>Location</th>
            <th>Email</th>
            <th>Company</th>
            <th>Bio</th>
            <th>Reject</th>
          </tr>
        </thead>
        <tbody>
          {savedCandidates.map((candidate) => (
            <tr key={candidate.login}>
            <td> <img src={candidate.avatar_url} alt={candidate.login} width="50"
                /> </td>
              <td>{candidate.login}</td>
              <td>{candidate.location}</td>
              <td>{candidate.email }</td>
              <td>{candidate.company}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};


export default SavedCandidates;
