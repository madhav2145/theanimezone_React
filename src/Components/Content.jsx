import React, { useState,useEffect  } from 'react';
import { useParams } from 'react-router-dom';
import DOMpurify from 'dompurify';



const Search = () => {
    const { romaji } = useParams();
    const [mediaData, setMediaData] = useState(null);
    const [error, setError] = useState(null); 
    const [search, setsearch] = useState(romaji || "");

    
    useEffect(() => {
   
        const fetchData = async () => {
            var query = `
            query ($search: String) {
                Media(search: $search) {
                  id
                  title {
                    romaji
                    english
                    native
                  }
                  description
                  startDate {
                    year
                    month
                    day
                  }
                  endDate {
                    year
                    month
                    day
                  }
                  episodes
                  season
                  type
                  format
                  status
                  duration
                  genres
                  isAdult
                  averageScore
                  popularity
                  coverImage {
                    large
                  }
                  bannerImage
                }
              }
        `;

            var variables = {
                search: search,
            };

            var url = 'https://graphql.anilist.co',
                options = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                    },
                    body: JSON.stringify({
                        query: query,
                        variables: variables
                    })
                };

            function handleResponse(response) {
                return response.json().then(function (json) {
                    return response.ok ? json : Promise.reject(json);
                });
            }

            function handleData(data) {

                setMediaData(data.data.Media);
                setError(null); // Clear error when data is received
               // console.log(data.data.Media);

            }

            function handleError(error) {
                setError(error.errors[0].message); // Set error to the error message from the server
                setMediaData(null); // Clear mediaData when there's an error
                console.error(error);
            }

            fetch(url, options).then(handleResponse)
                .then(handleData)
                .catch(handleError);
        }

        fetchData();
    }, []);


    return (
        
        <div className='flex flex-col min-h-screen  bg-slate-800 text-red-600'>
        {error && <p>{error}</p>}
            <div>
                <div className=''>   
                    {mediaData && (            
                        <div className=''>
                            <img src={mediaData.coverImage.large} alt={mediaData.title.romaji} className='h-[20rem] w-[15rem] rounded-md' />
                            <h1 className='font-semibold text-xl'>{mediaData.title.romaji}</h1>
                            <p dangerouslySetInnerHTML={{ __html: DOMpurify.sanitize(mediaData.description) }}></p>
                            <p>Start Date: {mediaData.startDate.year}/{mediaData.startDate.month}/{mediaData.startDate.day}</p>
                            <p>End Date: {mediaData.endDate.year}/{mediaData.endDate.month}/{mediaData.endDate.day}</p>
                            <p>Episodes: {mediaData.episodes}</p>
                            <p>Season: {mediaData.season}</p>
                            <p>Type: {mediaData.type}</p>
                            <p>Format: {mediaData.format}</p>
                            <p>Status: {mediaData.status}</p>
                            <p>Duration: {mediaData.duration}</p>
                            <p>Genres: {mediaData.genres.join(', ')}</p>
                            <p>Is Adult: {mediaData.isAdult ? 'Yes' : 'No'}</p>
                            <p>Average Score: {mediaData.averageScore}</p>
                            <p>Popularity: {mediaData.popularity}</p>
                        </div>  
                    )}
                </div>
            </div>
        </div>
    );
}   

export default Search;