import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';
import { Candidate } from '../interfaces/Candidate.interface';


const CandidateSearch = () => {
  // State to store the list of candidates fetched from GitHub
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  // State to store the current index of the candidate being viewed
  const [currentCandidateIndex, setCurrentCandidateIndex] = useState(0);
  // State to store the details of the current candidate
  const [currentCandidate, setCurrentCandidate] = useState<Candidate | null>(null);
  // State to store saved candidates in localStorage,
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>(() => {
    try{
   const storedCandidates = localStorage.getItem("savedCandidates");
   return storedCandidates ? JSON.parse(storedCandidates) : []; 
  } catch (error) {
    console.error("Error parsing saved candidates:", error);
    return [];
  }
  });

 
  // Fetch candidate data when the component loads
  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        // Fetching the list of candidates from GitHub
        const data = await searchGithub();
        // Updates the state with the fetch candidates
        setCandidates(data);
        if (data.length > 0) {
        const user = await searchGithubUser(data[0].login);
        // Set the first candidate as the current one 
        setCurrentCandidate(user);
        }
      } catch (error) {
        console.error('Error fetching candidates:', error);
      }
    };
// Excutes the fetch on component load 
    fetchCandidates();
  }, []);

  // update localStorage whenever the savedCandidates state changes
  useEffect(() => {
   localStorage.setItem("savedCandidates", JSON.stringify(savedCandidates));
  }, [savedCandidates]);

  // Fetch the details of a new candidate when the index changes 
  useEffect(()=> {
    const fetchNewCandidate = async () => {
      if (candidates [currentCandidateIndex]) {
        const user = await searchGithubUser(candidates[currentCandidateIndex].login);
        setCurrentCandidate(user);
      } else {
        setCurrentCandidate(null);
      }
    };
    // Calls the function to update the current candidate
    fetchNewCandidate();
  }, [currentCandidateIndex, candidates]);

  // Handle saving the candidate  
  const handleSaveCandidate = () => {
    if (currentCandidate) {
      setSavedCandidates((prev) => [...prev, currentCandidate]);
      setCurrentCandidateIndex((prevIndex) => prevIndex + 1); 
    }
  };

  // Handle moving to the next candidate
  const handleNextCandidate = () => {
   setCurrentCandidateIndex((prevIndex) => prevIndex + 1);
  };
// In no candidate are available, show a message indicating so
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