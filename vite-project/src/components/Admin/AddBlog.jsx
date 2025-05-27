import React, { useState } from 'react';
import axios from 'axios';
 import TipTapEditor from './TipTapEditor';
 const  BASE_URL=import.meta.env.VITE_BACKEND_LIVE

 import toast from 'react-hot-toast';

const AddBlog = () => {
  const [formData, setFormData] = useState({
    // banerImage: '',
    // sideImage: '',
    content: [
      { type: '', text: '', items: [''] },
    ],
  });

  const [message,setMessage]=useState('');
const [imageFile,setImageFile]=useState({
    banerImage:null,
    sideImage:null,
});

  const handleContentChange = (index, field, value) => {
    const updated = [...formData.content];
    updated[index][field] = value;
    setFormData({ ...formData, content: updated });
  };



  const handleFileChange=(e)=>{

    const {name,files}=e.target;

    setImageFile((prev)=>({
        ...prev,
        [name]:files[0]||null,
    }));
  }

  const handleItemChange = (cIndex, iIndex, value) => {
    const updated = [...formData.content];
    updated[cIndex].items[iIndex] = value;
    setFormData({ ...formData, content: updated });
  };

  const addContentBlock = () => {
    setFormData({
      ...formData,
      content: [...formData.content, { type: '', text: '', items: [''] }],
    });
  };

  const addItem = (index) => {
    const updated = [...formData.content];
    updated[index].items.push('');
    setFormData({ ...formData, content: updated });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {


const data=new FormData();

if(imageFile.banerImage) data.append('banerImage',imageFile.banerImage);
if(imageFile.sideImage) data.append('sideImage',imageFile.sideImage);

data.append('content',JSON.stringify(formData.content));

  const res=    await axios.post(`${BASE_URL}/api/admin/createBlog`, data,

    {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }

     

  ); // adjust API route if needed
      // alert('Content uploaded successfully');

      toast.success('Blog added successfully!');
    } catch (error) {
      console.error(error);
      toast.error('Upload failed. Please try again.');
 
    }
  };

  return (
    <div className="max-w-4xl mt-20 mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Upload Blog Content</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <input
          type="file"
            name="banerImage"
          placeholder="Banner Image URL"
          className="w-full border p-2 rounded"
          value={formData.banerImage}
        //   onChange={(e) => setFormData({ ...formData, banerImage: e.target.value })}
       onChange={handleFileChange}
       required
        />
        <input
          type="file"
            name="sideImage"
          placeholder="Side Image URL"
          className="w-full border p-2 rounded"
          value={formData.sideImage}
        //   onChange={(e) => setFormData({ ...formData, sideImage: e.target.value })}
        onChange={handleFileChange}
        />

        {formData.content.map((block, cIndex) => (
          <div key={cIndex} className="border p-4 rounded bg-gray-50 space-y-4">
           
           <h1>Title</h1>
            <input
              type="text"
              placeholder="Type (required)"
              className="w-full p-2 border rounded"
              value={block.type}
              onChange={(e) => handleContentChange(cIndex, 'type', e.target.value)}
              required
            />

            <div>
              <label className="block font-semibold mb-1">Text (Rich Editor)</label>
              <TipTapEditor
                value={block.text}
                onChange={(val) => handleContentChange(cIndex, 'text', val)}
              />
            </div>

            <div className="space-y-2">
              <label className="block font-semibold">Items</label>
              {block.items.map((item, iIndex) => (
                <input
                  key={iIndex}
                  type="text"
                  placeholder={`Item ${iIndex + 1}`}
                  className="w-full border p-2 rounded"
                  value={item}
                  onChange={(e) => handleItemChange(cIndex, iIndex, e.target.value)}
               required
                />
              ))}
              <button
                type="button"
                onClick={() => addItem(cIndex)}
                className="text-blue-500 text-sm"
              >
                + Add Item
              </button>
            </div>
          </div>
        ))}

        {/* <button
          type="button"
          onClick={addContentBlock}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          + Add Content Block
        </button> */}

        <button
          type="submit"
          className="bg-green-600 text-white px-6 py-2 rounded"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default  AddBlog;
