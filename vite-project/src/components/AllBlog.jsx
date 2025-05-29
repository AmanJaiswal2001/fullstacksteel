import React, { useState } from 'react';
import useFetchBlog from '../hooks/useFetchBlog';
import { Link } from 'react-router-dom';

const BASE_URL = import.meta.env.VITE_BACKEND_LIVE;

const AllBlog = () => {
 
  const [activeIndex, setActiveIndex] = useState(0);


  const { blog, loading, error } = useFetchBlog([]);
  const handleMouseEnter = (index) => {
    setActiveIndex(index);
  };

  const getTextFromHTML = (html) => {
    const div = document.createElement('div');
    div.innerHTML = html;
    return div.textContent || div.innerText || '';
  };

  return (
    <div className="w-full mx-auto px-10 py-20 pb-20">
      <h1 className="text-4xl font-bold text-center mb-10">All Blog Posts</h1>

      {loading && <p className="text-center text-gray-500">Loading...</p>}
      {error && <p className="text-center text-red-500">Failed to load blogs</p>}

      <div className="sm:flex  gap-4 h-96">
      {blog.map((card, index) => (
          <Link
            to={`/blog/${card._id}`}
            key={card._id}
            className={`relative overflow-hidden rounded-lg transition-all duration-700 cursor-pointer ${
              activeIndex === index ? ' w-full' : 'sm:w-1/2'
            }`}
            onMouseEnter={() => handleMouseEnter(index)}
          >
            <img
              src={`${BASE_URL}/uploads/${card.banerImage}`}
              alt={card.title}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
            <div
              className={`absolute inset-0 bg-gradient-to-t from-blue-900 via-blue-700/40 to-transparent transition-opacity duration-500 ${
                activeIndex === index ? 'opacity-70' : 'opacity-0'
              }`}
            />
            <div
              className={`absolute inset-x-0 text-white p-6 transition-all duration-500 ${
                activeIndex === index ? 'bottom-0' : 'bottom-14'
              }`}
            >
              <h2
                className={`text-3xl font-bold mb-2 transition-all duration-300 ${
                  activeIndex === index ? 'translate-y-0' : 'translate-y-16'
                }`}
              >
                {card.content[0]?.type  .split(' ')
    .slice(0, 10)
    .join(' ') + '...'}
              </h2>
              <div
                className={`transition-all duration-700 overflow-hidden ${
                  activeIndex === index ? 'max-h-40 opacity-100 mt-3' : 'max-h-0 opacity-20'
                }`}
              >
                <p className="text-white text-opacity-90">
                  {getTextFromHTML(card.content[0]?.text)
                    .split(' ')
    .slice(0, 10)
    .join(' ') + '...'}
                </p>
                <span className="inline-block mt-4 font-bold text-orange-600 transition-colors">
                  Read More →
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      </div>
    
  );
};

export default AllBlog;
