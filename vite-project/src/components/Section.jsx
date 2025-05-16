import React, { useState } from 'react'
import Sidebar from './Sidebar'

import CardContainer from './CardContainer';
import ColdContainer from './ColdContainer';
import SheetCard from './SheetCard';
import ColdSheetCard from './ColdSheetCard';
import { Link } from 'react-router-dom';



const Section= () => {
      const [activeType, setActiveType] = useState("hot");
   
      const [activeProduct, setActiveProduct] = useState('coil');

   
    return (
    <div className='relative  h-auto w-full   mt-24   mb-20    '>
    <h1 className='font-bold md:text-3xl sm:text-2xl text-xl text-[#262626] leading-6 font-poppins w-96 md:px-10 sm:px-10 px-5'>Mild Steel</h1>
    {/* sidebar */}

<div className='flex gap-10 md:w-[80%]  w-full md:mt-5 mt-0  rounded-lg md:mx-10    '>
    <div className=' w-2/6 hidden lg:block '>
<Sidebar activeType={activeType} setActiveType={setActiveType} 
items={[
    { type: 'hot', label: 'Hot Rolled', link: '/mildStainless' },
    { type: 'cold', label: 'Cold Rolled', link: '/mildStainless' },
  ]}

/>
    </div> 
<div className='w-full   mt-2'>
<div className='flex   mt-3    gap-10 lg:px-12 sm:px-10    '>


{/* Mobile Sidebar */}
<div className="lg:hidden px-5">
  <div className="flex  gap-4 mt-0 ">
    {/* Hot Rolled */}
    <button
      onClick={() => setActiveType("hot")}
      className={`text-left  font-poppins  text-sm  font-normal ${
        activeType === "hot" ?  'border-b-2 border-black  text-black font-bold' : "text-[#70737a]"
      }`}
    >
      Hot Rolled
    </button>

    {/* Cold Rolled */}
    <button
      onClick={() => setActiveType("cold")}
      className={`text-left font-poppins px-4 py-2   text-sm font-normal ${
        activeType === "cold" ?  'border-b-2 border-black  text-black font-bold' : "text-[#70737a]"
      }`}
    >
      Cold Rolled
    </button>
  </div>
</div>

{/* <div className='px-4'> */}

<button 
 className={`font-semibold hidden lg:block pt-1 font-poppins  text-xl ${activeProduct === 'coil' ?   'border-b-2 border-black  text-black font-bold' 
        : 'text-gray-600'}`}
              onClick={() => setActiveProduct('coil')}
            >
Coils</button>
<button  className={`font-semibold hidden lg:block font-poppins text-xl ${activeProduct === 'sheet'  ? 'border-b-2  border-black  text-black  font-bold' 
        : 'text-gray-600'}`}
              onClick={() => setActiveProduct('sheet')}
            >
Sheets</button>


</div>
<div className='w-full  border-t  border-t-gray-300 '>


<div className='flex sm:gap-10 px-5 gap-5 mt-5 lg:hidden   sm:mx-10 lg:mx-0'>
<button 
 className={`font-normal cursor-pointer  text-sm sm:w-20 w-16 p-2 font-poppins  rounded-sm ${activeProduct === 'coil' ? 'border border-[#a0ceff]  bg-[#e6f0ff] text-[#12396d] ' 
        : 'text-[rgb(38, 38, 38)]   border border-[#b1b8c9]' }`}
              onClick={() => setActiveProduct('coil')}
            >
Coils</button>
<button  className={`font-normal cursor-pointer  text-sm sm:w-20 w-16 p-2 font-poppins  rounded-sm ${activeProduct === 'sheet'  ? 'border border-[#a0ceff]  bg-[#e6f0ff] text-[#12396d]' 
        : 'text-[rgb(38, 38, 38)]   border border-[#b1b8c9]'}`}
              onClick={() => setActiveProduct('sheet')}
            >
Sheets</button>
</div>



{/* <CardContainer/> */}
{activeProduct === 'coil' ? (
              activeType === 'hot' ? <CardContainer /> : <ColdContainer />
            ) : (
              activeType === 'hot' ? <SheetCard /> : <ColdSheetCard /> // or another cold sheet component
            )}</div>

</div>

</div>
  
    </div>
  )
}

// sidebar

export default Section