import React from 'react'


// blogData.ts
 export const temperatureBlogContent = [
    {
      type: "paragraph",
      text: "Hot rolling is a metalworking process that occurs above the recrystallization temperature of the material, typically over 1700°F."
    },
    {
      type: "paragraph",
      text:  "Hot rolling is a metalworking process that occurs above the recrystallization temperature of the material. This process helps in shaping large pieces of metal into thinner and longer forms, such as sheets, coils, and plates.Due to the high temperature, the metal becomes more malleable and easier to shape under roll pressure.It enhances production speed and efficiency, making it ideal for mass production of structural steel products."
     },
    {
      type: "heading",
      text: "Key Advantages of Hot Rolling"
    },
    {
      type: "list",
      items: [
        "Enables faster shaping of large metal slabs into desired forms.",
        "Improves ductility making further processing easier.",
        "Suitable for mass production due to high processing speed.",
        "Cost-effective for structural applications.",
        "Reduces internal material stress after cooling."
      ]
    },
    {
      type: "heading",
      text: "Common Applications"
    },
    {
      type: "list",
      items: [
        "Structural beams (I-beams, H-beams)",
        "Railway tracks",
        "Automotive chassis and frames",
        "Pipes and tubes",
        "Heavy machinery parts"
      ]
    },
    {
      type: "paragraph",
      text: "Despite the rougher surface finish, hot rolled steel is ideal for use where exact dimensions and aesthetics are not the primary concern."
    }
  ];
  
  


const Blog1 = () => {

    return (
        <div>
            <div className="  w-full mb-20  pt-20 sm:pt-0">
            <div className="w-full relative">
            <img className='w-full h-[500px] object-cover' src="/skyline.jpg" />
    <div className='flex items-center justify-center'>
    <div className='flex w-full '>
    <p className='absolute text-white top-[60%] sm:left-20 left-0 px-5  text-3xl  font-extrabold flex  md:text-5xl  m-auto font-poppins'>Temperature</p>
     <p className='absolute sm:w-[60%] w-full px-5 text-white top-[70%] sm:left-20 left-0  text-xl font-semibold flex  md:text-3xl  m-auto font-poppins'>Hot rolling primarily involves deforming the slab/bloom at high temperature & roll pressure.</p>
    </div>  
    </div>
               </div>
    
    
               <div className="w-full sm:px-20 px-5 mx-auto  py-10 font-poppins text-[#262626]">
               {temperatureBlogContent.map((block, idx) => {
  if (block.type === "heading") {
    return <h3 key={idx} className="sm:text-3xl text-lg font-poppins font-semibold mb-1 ">{block.text}</h3>;
  } else if (block.type === "paragraph") {
    return <p key={idx} className=" text-lg leading-relaxed">{block.text}</p>;
  } else if (block.type === "list") {
    return (
      <ul key={idx} className="list-disc ml-6 mb-2 text-sm text-gray-700 space-y-1">
        {block.items.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    );
  }
  return null;
})}
    </div>
    
     
    
     
    
    {/* section 3 */}
    
    
    
    
    </div>
        </div>
      )
 
}

export default Blog1