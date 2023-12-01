import React, { useState,useEffect } from 'react';
import Home from './Home';
import {Link} from 'react-router-dom';


const Search = () => {
    const [mediaData, setMediaData] = useState(null);
    const [search, setsearch] = useState("");
    const [error, setError] = useState(null); 
    const [loading, setLoading] = useState(false);

    
    const handlesearchChange = (event) => {
        setsearch(event.target.value);
        
    }

    const fetchData = async() => {

        setLoading(true);
        setError(null);

        if (search.trim() !== '') { 
            var query = `
            query ($search: String, $page: Int, $perPage: Int, $isAdult: Boolean) {
                Page (page: $page, perPage: $perPage) {
                    media (search: $search, type: ANIME,isAdult: $isAdult) {
                        title {
                            romaji 
                        }
                        coverImage {
                            large   
                        }
                    }
                }
            }
        `;

        var variables = {
            search: search,
            page: 1,
            perPage: 100,
            isAdult: false
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
        
                setMediaData(data.data.Page.media);
                setError(null); // Clear error when data is received
               console.log(data.data.Page.media);
            
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
        else {
            setMediaData(null); // Clear mediaData when search field is empty
            setError(null); // Clear error when search field is empty
            
        }
        setLoading(false);
    } 

    useEffect(() => {
        fetchData();
    }, [search]);

    if (loading) {
        return <div>Loading...</div>;
    }


    return (
        <div className='flex flex-col min-h-screen  bg-slate-800 text-red-600'>       
        <div className='pt-9 '>
        <input type="text" value={search} onChange={handlesearchChange} className='border rounded-md border-red-600    pl-[0.5rem]' />
        <button className='ml-3 px-1 border rounded-md border-red-600   text-red-600' onClick={fetchData} disabled={loading}>search</button>
        </div>
        {error && <p>{error}</p>}

        {search.trim() === '' ? (
                                <Home />
                            ) : (
       mediaData && mediaData.length === 0 ? (
        <div className='mr-20'>No results found</div>
    ) : (
        <div className='grid grid-cols-5   grid-rows-20 grid-flow-row gap-[5rem] px-[7rem] py-[10rem] mb-auto'>   
        {mediaData && mediaData.map((media, index) => (            
            <div key={index} > 
             <div className=' h-[20rem] w-[15rem] py-5 '>
             <Link to={`/${media.title.romaji}/content`}>
                <img src={media.coverImage.large} alt={media.title.romaji} className='h-[20rem] w-[15rem] rounded-md' />
                    <h1 className='font-semibold text-xl'>{media.title.romaji}</h1>   
                    </Link>
                </div>  
                    </div>
            
            
        ))}
        </div>
        )
        )}
        
    </div>
    );
}   

export default Search;