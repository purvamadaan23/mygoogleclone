import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ReactPlayer from 'react-player';
import { useStateContext } from '../contexts/StateContextProvider';
import { Loading } from './Loading';

export const Results = () => {
  const { results, loading, getResults, searchTerm } = useStateContext();
  const location = useLocation();

  useEffect(() => {
    if (searchTerm !== '') {
      const query = searchTerm;
      if (location.pathname === '/videos') {
        getResults(query, 'video');
      } else if (location.pathname === '/images') {
        getResults(query, 'image');
      } else if (location.pathname === '/news') {
        getResults(query, 'news');
      } else {
        getResults(query); // Default search (all)
      }
    }
  }, [searchTerm, location.pathname]);

  if (loading) return <Loading />;

  // Handling different result types based on the route
  switch (location.pathname) {
    case '/search':
      return (
        <div className="sm:px-56 flex flex-wrap justify-between space-y-6">
          {results?.items?.map(({ link, title }, index) => (
            <div key={index} className="md:w-2/5 w-full">
              <a href={link} target="_blank" rel="noreferrer">
                <p className="text-sm">{link.length > 30 ? link.substring(0, 30) : link}</p>
                <p className="text-lg hover:underline dark:text-blue-300 text-blue-700">{title}</p>
              </a>
            </div>
          ))}
        </div>
      );
    case '/images':
      return (
        <div className="flex flex-wrap justify-center items-center">
          {results?.items?.map(({ link, title }, index) => (
            <a href={link} target="_blank" key={index} rel="noreferrer" className="sm:p-3 p-5">
              <img src={link} alt={title} loading="lazy" />
              <p className="sm:w-36 w-36 break-words text-sm mt-2">{title}</p>
            </a>
          ))}
        </div>
      );
    case '/news':
      return (
        <div className="sm:px-56 flex flex-wrap justify-between items-center space-y-6">
          {results?.items?.map(({ link, source, title }, index) => (
            <div key={index} className="md:w-2/5 w-full">
              <a href={link} target="_blank" rel="noreferrer" className="hover:underline">
                <p className="text-lg dark:text-blue-300 text-blue-700">{title}</p>
              </a>
              <p className="text-sm text-gray-500">{source}</p>
            </div>
          ))}
        </div>
      );
    case '/videos':
      return (
        <div className="flex flex-wrap">
          {results?.items?.map((video, index) => (
            <div key={index} className="p-2">
              <ReactPlayer url={video.link} controls width="355px" height="200px" />
            </div>
          ))}
        </div>
      );
    default:
      return 'Error...';
  }
};
