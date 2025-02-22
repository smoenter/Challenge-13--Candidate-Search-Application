import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';
import { Candidate } from '../interfaces/Candidate.interface';

const CandidateSearch = () => {
  const [candidates, setCandidates] = useState<any[]>([]);
  const [currentCandidateIndex, setCurrentCandidateIndex] = useState(0);
 

    // Fetch candidate data when the component loads
    useEffect(() => {
      const fetchCandidates = async () => {
        const data = await searchGithub();
        setCandidates(data);
      };
  
      fetchCandidates();
    }, []);
  
    // Handle saving the candidate to localstorage 
    const handleSaveCandidate = () => {
      const candidate = candidates[currentCandidateIndex];
      console.log('Saved candidate:', candidate);
      setCurrentCandidateIndex((prevIndex) => prevIndex + 1);
    };
  
    const handleNextCandidate = () => {
      setCurrentCandidateIndex((prevIndex) => prevIndex + 1);
    };

    if (!candidates.length) {
      return <p>No candidates available to review.</p>;
    }
  
    const currentCandidate = candidates[currentCandidateIndex];
  
   
  return (
    <div>
    {currentCandidate ? (
      <div>
        <h2>{currentCandidate.login}</h2>
        <p>{currentCandidate.location}</p>
        <img src={currentCandidate.avatar_url} alt={currentCandidate.login} />
        <p>{currentCandidate.email}</p>
        <a href={currentCandidate.html_url} target="_blank" rel="noopener noreferrer">
          View Profile
        </a>
        <p>{currentCandidate.company}</p>
        <button onClick={handleSaveCandidate}>+</button>
        <button onClick={handleNextCandidate}>-</button>
      </div>
    ) : (
      <p>No more candidates to review.</p>
    )}
  </div>
);
};
  
export default CandidateSearch;
