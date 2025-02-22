// import Links
import { useState, useEffect } from 'react';
import { Candidate } from '../interfaces/Candidate.interface';

const SavedCandidates = () => {
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>([]);

  useEffect(() => {
    const storedCandidates = localStorage.getItem('savedCandidates');
    if (storedCandidates) {
      try {
        const parsedCandidates = JSON.parse(storedCandidates) as Candidate[];
        setSavedCandidates(parsedCandidates);
      } catch (error) {
        console.error("Error parsing saved candidates from localStorage:", error);
      }
    }
  }, []);

  if (savedCandidates.length === 0) {
    return <div>No candidates saved yet.</div>;
  }

  return (
    <div>
      <h1>Saved Candidates</h1>
      <ul>
        {savedCandidates.map((candidate) => (
          <li key={candidate.username}> {/* Use username as a unique key */}
            <h3>{candidate.username}</h3>
            <p>{candidate.location}</p>
            <p>{candidate.company}</p>
            <a href={candidate.html_url} target="_blank" rel="noopener noreferrer">
              GitHub Profile
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};


export default SavedCandidates;
