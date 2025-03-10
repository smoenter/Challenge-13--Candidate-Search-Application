// import Links
import { useState, useEffect } from 'react';
import { Candidate } from '../interfaces/Candidate.interface';
import { searchGithubUser } from '../api/API';


const SavedCandidates = () => {
  // State to store the list of saved candidates along with their details
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>([]);
  

    // Function to fetch the full user data (email, company, bio, location)
    const fetchUserDetails = async (login: string) => {
      try {
        // Fetch detailed infor for the given login
        const response = await searchGithubUser(login); 
        return response;
      } catch (error) {
        console.error(`Error fetching details for ${login}:`, error);
        return null;
      }
    };

  useEffect(() => {
    const storedCandidates = JSON.parse(localStorage.getItem('savedCandidates') || '[]');

    const fetchAllDetails = async () => {
      // Use Promis.all to fetch details for all saved candidates 
      const candidatesWithDetails = await Promise.all(
        storedCandidates.map(async (candidate: Candidate) => {
          const detailedCandidate = await fetchUserDetails(candidate.login); // Fetch detailed info
          return detailedCandidate ? { ...candidate, ...detailedCandidate } : candidate;
        })
      );
      setSavedCandidates(candidatesWithDetails); // Update the state with the detailed data
    };

    // Trigger the fetch operation on component 
    fetchAllDetails();
  }, []);

  // If no saved candidates, display message 
  if (savedCandidates.length === 0) {
    return <div>No candidates saved yet.</div>;
  }

// Function to handle rejecting a candidate from the saved list 
const handleReject = (login: string) => {
  // Filter out the candidate with the given login
  const updatedCandidates = savedCandidates.filter(candidate => candidate.login !== login);
  setSavedCandidates(updatedCandidates);
  localStorage.setItem('savedCandidates', JSON.stringify(updatedCandidates));
};

  return (
    <div>
      <h1>Saved Candidates</h1>

      {/* Table structure */}
      <table>
        <thead>
          <tr>
            <th>Image</th>
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
              <td>{candidate.location || "Not available"}</td>
              <td>{candidate.email || "Not available" }</td>
              <td>{candidate.company || "Not available"}</td>
              <td>{candidate.bio || "Not available"}</td>
              <td>
                <button className="reject" onClick={() => handleReject(candidate.login)}>-</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};




export default SavedCandidates;
