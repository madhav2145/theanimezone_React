import React, { useState, useCallback, useEffect } from 'react';
import {Link} from 'react-router-dom';

const Home = () => {
    const [mediaData, setMediaData] = useState(null);
    const [mediaData2, setMediaData2] = useState(null);
    const [mediaData3, setMediaData3] = useState(null);

    const fetchData = useCallback(() => {
        var query = `
        query ($page: Int, $perPage: Int) {
            Page (page: $page, perPage: $perPage) {
                pageInfo {
                    total
                    currentPage
                    lastPage
                    hasNextPage
                    perPage
                }
                media(sort: POPULARITY_DESC) {
                    id
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
            page: 1,
            perPage: 5
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
            // console.log(data.data.Page.media);
        }

        function handleError(error) {
            alert('Error, check console');
            console.error(error);
        }

        fetch(url, options).then(handleResponse)
                           .then(handleData)
                           .catch(handleError);
    }, []); 

    useEffect(() => {
        fetchData();
    }, [fetchData]);


    const fetchData2 = useCallback(() => {
        var query = `
        query ($page: Int, $perPage: Int, $season: MediaSeason, $seasonYear: Int) {
            Page (page: $page, perPage: $perPage) {
              pageInfo {
                total
                currentPage
                lastPage
                hasNextPage
                perPage
              }
              media(sort: POPULARITY_DESC, season: $season, seasonYear: $seasonYear) {
                id
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
            page: 1,
            perPage: 5,
            season: "FALL",
            seasonYear: 2023
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
            setMediaData2(data.data.Page.media);
           // console.log(data.data.Page.media);
        }

        function handleError(error) {
            alert('Error, check console');
            console.error(error);
        }

        fetch(url, options).then(handleResponse)
                           .then(handleData)
                           .catch(handleError);
    }, []); 

    useEffect(() => {
        fetchData2();
    }, [fetchData2]);

    const fetchData3 = useCallback(() => {
        var query = `
        query ($page: Int, $perPage: Int) {
            Page (page: $page, perPage: $perPage) {
              pageInfo {
                total
                currentPage
                lastPage
                hasNextPage
                perPage
              }
              media(sort: TRENDING_DESC) {
                id
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
            page: 1,
            perPage: 5
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
            setMediaData3(data.data.Page.media);
           // console.log(data.data.Page.media);
        }

        function handleError(error) {
            alert('Error, check console');
            console.error(error);
        }

        fetch(url, options).then(handleResponse)
                           .then(handleData)
                           .catch(handleError);
    }, []); 

    useEffect(() => {
        fetchData3();
    }, [fetchData3]);

    return (
        <div className='p-[5rem] bg-slate-800 text-red-600 flex flex-col min-h-screen'> 
        <div className='py-3'>
         <a  href="/search/anime/popular" >
         <h3 className='text-left text-2xl font-bold'>All time popular</h3> 
         <div className='text-right mr-5'>View All
         </div>
         </a>
        <div className='grid grid-cols-5 grid-rows-1 grid-flow-row gap-5'>
            {mediaData && mediaData.map((media) => (
                <div key={media.id}>
                <Link to={`/${media.title.romaji}/content`}>
                <img src={media.coverImage.large} alt={media.title.romaji} className='h-[20rem] w-[15rem] rounded-md' />
                    <h1 className='font-semibold text-xl'>{media.title.romaji}</h1>   
                    </Link>    
                </div> 
            ))}
            </div>
            </div>
         <div className='py-3'>   
        <a  href="/search/anime/popular" >
         <h3 className='text-left text-2xl font-bold'>Popular this season</h3> 
         <div className='text-right mr-5'>View All
         </div>
         </a>
        <div className='grid grid-cols-5 grid-rows-1 grid-flow-row gap-5'>
            {mediaData2 && mediaData2.map((media) => (
                <div key={media.id}>
                <Link to={`/${media.title.romaji}/content`}>
                <img src={media.coverImage.large} alt={media.title.romaji} className='h-[20rem] w-[15rem] rounded-md' />
                    <h1 className='font-semibold text-xl'>{media.title.romaji}</h1>   
                    </Link>
                </div>
            ))}
            </div>
            </div>
            <div className='py-3'>   
         <a  href="/search/anime/popular" >
         <h3 className='text-left text-2xl font-bold'>Trending anime</h3> 
         <div className='text-right mr-5'>View All
         </div>
         </a>
        <div className='grid grid-cols-5 grid-rows-1 grid-flow-row gap-5'>
            {mediaData3 && mediaData3.map((media) => (
                <div key={media.id}>
                <Link to={`/${media.title.romaji}/content`}>
                <img src={media.coverImage.large} alt={media.title.romaji} className='h-[20rem] w-[15rem] rounded-md' />
                    <h1 className='font-semibold text-xl'>{media.title.romaji}</h1>   
                    </Link>
                </div>
            ))}
            </div>
            </div>
        </div>
        
    );
}


export default Home;
