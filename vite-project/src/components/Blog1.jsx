import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import DOMPurify from 'dompurify';
import useSingleBlog from '../hooks/useSingleBlog';

const BASE_URL = import.meta.env.VITE_BACKEND_LIVE;

const Blog1 = () => {
  const { id } = useParams();
  const { blog, loading, error } = useSingleBlog(id);

  const getTextFromHTML = (html) => {
    const div = document.createElement('div');
    div.innerHTML = html;
    return div.textContent || div.innerText || '';
  };
  const navigate=useNavigate();
  const isAdmin = localStorage.getItem('isAdmin') === 'true';
     

  useEffect(() => {
    console.log('Fetched single Blog Data:', blog);
  }, [blog]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading blog.</p>;

  return (
    <div className=" w-full mx-auto">
     <div className='w-full bg-red-500'>
     <img
        src={`${BASE_URL}/uploads/${blog.banerImage}`}
        alt=""
        className="w-full h-[500px] object-cover rounded-md mb-6"
      />
     </div>
    

    
{isAdmin&&(
        <div className='flex gap-2 '>
         <button  onClick={()=> navigate(`/editblog/${id}`)} className='cursor-pointer bg-[#12396d] text-white p-2 rounded-full'>
         <svg  
          
          xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M3 21v-4.25L16.2 3.575q.3-.275.663-.425t.762-.15t.775.15t.65.45L20.425 5q.3.275.438.65T21 6.4q0 .4-.137.763t-.438.662L7.25 21zM17.6 7.8L19 6.4L17.6 5l-1.4 1.4z"/></svg>
         
         </button>
         </div>
)}
{blog.content?.map((block, index) => {
              const cleanHTML = DOMPurify.sanitize(block.text || '');
        // ✅ Fallback for unknown types — render rich HTML
        return (
          <div
             key={index}
             className="mb-4 text-base text-gray-800  leading-relaxed
        [&_h1]:font-bold [&_h1]:text-base [&_h2]:text-base [&_h3]:text-base [&_h4]:text-base [&_h5]:text-base [&_h6]:text-base
         [&_h2]:font-normal [&_h3]:font-normal [&_h4]:font-normal [&_h5]:font-normal [&_h6]:font-normal
        [&_p]:text-base [&_p]:mb-2
        [&_ul]:list-disc [&_ul]:ml-5 [&_li]:my-1
        [&_ol]:list-decimal [&_ol]:ml-5
        [&_strong]:font-bold [&_b]:font-bold
        [&_em]:italic [&_i]:italic
        [&_u]:underline
        [&_*]:text-gray-800 [&_*]:font-normal"
            dangerouslySetInnerHTML={{ __html: cleanHTML }}
          />
        );
      })}

      {/* Side Image */}
      {blog.sideImage && (
        <img
          src={
            blog.sideImage.startsWith('http')
              ? blog.sideImage
              : `${BASE_URL}/uploads/${blog.sideImage}`
          }
          alt="Side"
          className="w-full h-60 object-cover rounded mt-10"
        />
      )}
    </div>
  );
};


export default Blog1;
