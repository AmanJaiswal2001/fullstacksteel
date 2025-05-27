import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import TipTapEditor from './TipTapEditor';
import toast from 'react-hot-toast';
const BASE_URL = import.meta.env.VITE_BACKEND_LIVE;

const EditBlog = () => {
  const { id } = useParams();

  const [formData, setFormData] = useState({
    content: [{ type: '', text: '', items: [''] }],
  });

  const [imageFile, setImageFile] = useState({
    banerImage: null,
    sideImage: null,
  });

  const [message,setMessage]=useState('');


 

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/admin/getBlogById/${id}`);
        const blog = res.data;

        setFormData({
          content: blog.content || [{ type: '', text: '', items: [''] }],
        });

        setImageFile({
          banerImage: blog.banerImage || null,
          sideImage: blog.sideImage || null,
        });
      } catch (error) {
        console.error('Error loading blog:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  const handleContentChange = (index, field, value) => {
    const updated = [...formData.content];
    updated[index][field] = value;
    setFormData({ ...formData, content: updated });
  };

 
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

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setImageFile((prev) => ({
      ...prev,
      [name]: files[0] || null,
    }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();

      if (imageFile.banerImage && typeof imageFile.banerImage !== 'string') {
        data.append('banerImage', imageFile.banerImage);
      }


      if (imageFile.sideImage && typeof imageFile.sideImage !== 'string') {
        data.append('sideImage', imageFile.sideImage);
      }

      data.append('content', JSON.stringify(formData.content));

      const res= await axios.put(`${BASE_URL}/api/admin/updateBlog/${id}`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setMessage(res.data.message || "Product edit successfully");
      toast.success('Blog edit successfully!');
    //   alert('Blog updated successfully');
    } catch (error) {
      console.error(error);
    //   alert('Failed to update blog');
    toast.error('Upload failed. Please try again.');
 
    setMessage(err.response?.data?.message || "Error updating product")
    }
  };

  if (loading) {
    return <div className="text-center mt-10">Loading blog data...</div>;
  }

  return (
    <div className="max-w-4xl mt-20 mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Edit Blog</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Banner Image Input */}
        <div className="space-y-2">
  <label className="block font-semibold">Banner Image</label>
  <input
    type="file"
    name="banerImage"
    className="w-full border p-2 rounded"
    accept="image/*"
    onChange={handleFileChange}
    
  />

  {imageFile.banerImage && (
    <img
      src={
        typeof imageFile.banerImage === 'string'
          ? imageFile.banerImage.startsWith('http')
            ? imageFile.banerImage
            : `${BASE_URL}/uploads/${imageFile.banerImage}`
            : imageFile.banerImage instanceof Blob || imageFile.banerImage instanceof File
          ? URL.createObjectURL(imageFile.banerImage)
          : ''      }
      alt="Banner Preview"
      className="h-32 object-cover rounded border mt-1"
    />
  )}
</div>

{/* Side Image Input */}
<div className="space-y-2 mt-4">
  <label className="block font-semibold">Side Image</label>
  <input
    type="file"
    name="sideImage"
    className="w-full border p-2 rounded"
    accept="image/*"
    onChange={handleFileChange}
  />

  {imageFile.sideImage && (
    <img
      src={
      typeof imageFile.sideImage === 'string'
          ? imageFile.sideImage.startsWith('http')
            ? imageFile.sideImage
            : `${BASE_URL}/uploads/${imageFile.sideImage}`
          : URL.createObjectURL(imageFile.sideImage)
      }
      alt="Side Preview"
      className="h-32 object-cover rounded border mt-1"
    />
  )}
</div>
        {/* Content Blocks */}
        {formData.content.map((block, cIndex) => (
          <div key={cIndex} className="border p-4 rounded bg-gray-50 space-y-4">
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
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditBlog;
