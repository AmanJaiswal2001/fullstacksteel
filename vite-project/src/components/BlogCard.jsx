import { useState } from 'react';
import { Link } from 'react-router-dom';

export  const BlogCard=()=> {
    const [activeIndex, setActiveIndex] = useState(0);
  
  const cards = [
    {
      id: 0,
      title: "TEMPERATURE",
      description: "Hot rolling primarily involves deforming the slab/bloom at high temperature & roll pressure.",
      image: "/blog1.jpg",
      href:"/temp"
    },
    {
      id: 1,
      title: "SMOOTH SURFACE",
      description: "Cold rolling in performed to produce sheets & strips with smooth surfaces, having a better surface finish with accurate dimensions.",
      image: "/blog2.jpg.png",
        href:"/smooth"
    },
    {
      id: 2,
      title: "BASICALLY STEEL",
      description: "Steel is an alloy primarily composed of iron and a small percentage of carbon, which enhances its strength and fracture resistance.",
      image: "/blog3.jpg",
        href:"/basic"
    }
  ];

  const handleMouseEnter = (index) => {
    setActiveIndex(index);
    // setTimeout(() => {
    //     setActiveIndex(-1); // -1 means no active card
    //   }, 3000); 
  };
 
    return (
        <div className="w-full  mx-auto px-10 py-0 pb-20">
          <h1 className="text-4xl font-bold text-gray-800 mb-10">
            Touching lives of over 44 million people in India
          </h1>
          
          <div className="hidden sm:flex gap-4 h-96">
            {cards.map((card, index) => (
              <Link 
               to={card.href}
                key={card.id}
                className={`relative overflow-hidden rounded-lg transition-all duration-700 cursor-pointer
                          ${activeIndex === index ? 'sm:w-2/3 w-full' : 'sm:w-1/2'}`}
                onMouseEnter={() => handleMouseEnter(index)}
              >
                {/* Image */}
                <img
                  src={card.image}
                  alt={card.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                
                {/* Overlay */}
                <div 
              className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"
            ></div>
            
            {/* Blue gradient overlay that appears on hover - darker at bottom, transparent at top */}
            <div 
              className={`absolute inset-0 bg-gradient-to-t from-blue-900 via-blue-700/40 to-transparent transition-opacity duration-500
                        ${activeIndex === index ? 'opacity-70' : 'opacity-0'}`}
            ></div> 
                {/* Content */}
                <div className={`absolute inset-x-0 text-white p-6 transition-all duration-500
                              ${activeIndex === index ? 'bottom-0' : 'bottom-14'}`}>
                  <h2 className={`text-3xl font-bold mb-2 transition-all duration-300
                                ${activeIndex === index ? 'translate-y-0' : 'translate-y-16'}`}>
                    {card.title}
                  </h2>
                  
                  {/* Description - only visible when active */}
                  <div className={`transition-all duration-700 overflow-hidden
                                 ${activeIndex === index ? 'max-h-40 opacity-100 mt-3' : 'max-h-0 opacity-20'}`}>
                    <p className="text-white text-opacity-90">{card.description}</p>
                    <a 
                     
                      className="inline-block mt-4 font-poppins  font-bold  text-orange-600   transition-colors"
                    >
                      Read More →
                    </a>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="sm:hidden space-y-4">
  {cards.map((card, index) => (
    <Link
      key={card.id}
      to={card.href}
      className="block" // Wrap the full card
      onClick={() => selectCard(index)}
    >
      <div className="relative h-64 overflow-hidden rounded-lg transition-all duration-700 cursor-pointer">
        {/* Image */}
        <img
          src={card.image}
          alt={card.title}
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>

        {/* Blue gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-blue-900 via-blue-700/40 to-transparent transition-opacity duration-500"></div>

        {/* Content */}
        <div className="absolute inset-x-0 bottom-0 text-white p-4">
          <h2 className="text-xl font-bold mb-2">{card.title}</h2>
          <div className="transition-all duration-700 overflow-hidden">
            <p className="text-sm text-white text-opacity-90">{card.description}</p>
            <span className="inline-block mt-2 text-sm font-bold text-orange-600 transition-colors">
              Read More →
            </span>
          </div>
        </div>
      </div>
    </Link>
  ))}
</div>
        </div>
      );
    }
  ;
