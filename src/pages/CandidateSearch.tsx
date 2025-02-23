import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';
import { Candidate } from '../interfaces/Candidate.interface';


const CandidateSearch = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [currentCandidateIndex, setCurrentCandidateIndex] = useState(0);


  // Fetch candidate data when the component loads
  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const data = await searchGithub();
        console.log('Fetched candidates:', data); // Log the fetched candidates
        setCandidates(data);
      } catch (error) {
        console.error('Error fetching candidates:', error);
      }
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
  console.log('Current candidate:', currentCandidate);


  return (
    <div>
      {currentCandidate ? (
        <div>
          <h1>Candidate Search</h1>
          <div>
            <img src={currentCandidate.avatar_url} alt={currentCandidate.login} width="50%" />
            <p>{currentCandidate.login} <em>({currentCandidate.login})</em></p>
            <p>Location: {currentCandidate.location || "Not available"}</p>
            <p>Email: {currentCandidate.email || "Not available"}</p>
            <p>Company: {currentCandidate.company || "Not available"}</p>
            <p>Bio: {currentCandidate.bio || "Not available"}</p>
            <a className="viewProfile" href={currentCandidate.html_url} target="_blank" rel="noopener noreferrer">
              View Profile
            </a>
          </div>
          <button className="saveCandidate" onClick={handleSaveCandidate}>+</button>
          <button className="nextCandidate" onClick={handleNextCandidate}>-</button>

        </div>
      ) : (
        <p>No more candidates to review.</p>
      )}
    </div>
  );
};


export default CandidateSearch;