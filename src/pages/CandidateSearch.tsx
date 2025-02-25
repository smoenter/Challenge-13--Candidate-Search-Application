import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';
import { Candidate } from '../interfaces/Candidate.interface';


const CandidateSearch = () => {
  const [candidates, setCandidates] = useState([]);
  const [currentCandidateIndex, setCurrentCandidateIndex] = useState(0);
  const [currentCandidate, setCurrentCandidate] = useState<Candidate | null>(null);
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>(() => {

   const storedCandidates = localStorage.getItem("savedCandidates");
   return storedCandidates ? JSON.parse(storedCandidates) : []; 
  });

 
  // Fetch candidate data when the component loads
  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const data = await searchGithub();
        setCandidates(data);
        if (data.length > 0) {
        const user = await searchGithubUser(data[0].login);
        setCurrentCandidate(user);
        }
      } catch (error) {
        console.error('Error fetching candidates:', error);
      }
    };

    fetchCandidates();
  }, []);

  useEffect(() => {
   localStorage.setItem("savedCandidates", JSON.stringify(savedCandidates));
  }, [savedCandidates]);

  useEffect(()=> {
    const fetchNewCandidate = async () => {
      if (candidates [currentCandidateIndex]) {
        const user = await searchGithubUser(candidates[currentCandidateIndex].login);
        setCurrentCandidate(user);
      } else {
        setCurrentCandidate(null);
      }
    };
    fetchNewCandidate();
  }, [currentCandidateIndex, candidates]);

  // Handle saving the candidate to localstorage 
  const handleSaveCandidate = () => {
    if (currentCandidate) {
      setSavedCandidates((prev) => [...prev, currentCandidate]);
      setCurrentCandidateIndex((prevIndex) => prevIndex + 1); 
    }
  };

  const handleNextCandidate = () => {
   setCurrentCandidateIndex((prevIndex) => prevIndex + 1);
  };

  if (!candidates.length) {
    return <p>No candidates available to review.</p>;
  }

  console.log('Current candidate:', currentCandidate);


  return (
    <div>
      {currentCandidate ? (
        <div>
          <h1>Candidate Search</h1>
          <div>
            <img src={currentCandidate.avatar_url} alt={currentCandidate.login} width="50%" />
            <h2>{currentCandidate.name}</h2>
            <p>{currentCandidate.login} <em>({currentCandidate.login})</em></p>
            <p>Location: {currentCandidate.location || "Not available"}</p>
            <p>Email: {currentCandidate.email || "Not available"}</p>
            <p>Company: {currentCandidate.company || "Not available"}</p>
            <p>Bio: {currentCandidate.bio || "Not available"}</p>
            <a className="viewProfile" href={currentCandidate.html_url} target="_blank" rel="noopener noreferrer">
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