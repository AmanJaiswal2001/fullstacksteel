const Product=require("../models/productModel");



const createProduct = async (req, res) => {
  try {
    const {
      name,
      type,
      thickness,
      width,
      length,
      purchaseNow,
      deliveryDays,
    } = req.body;

    if (!name || !type) {
      return res.status(400).json({ message: "Please provide required fields" });
    }

    const existing = await Product.findOne({ name, type });
    if (existing) {
      return res.status(400).json({ message: "Product with same name and type already exists" });
    }

    const imagePath = req.file ? `/uploads/${req.file.filename}` : "";

    const product = new Product({
      name,
      type,
      image: imagePath,
      thickness: JSON.parse(thickness || '[]'),
      width: JSON.parse(width || '[]'),
      length: JSON.parse(length || '[]'),
      purchaseNow,
      deliveryDays,
    });

    await product.save();

    res.status(201).json({
      message: "Product created successfully",
      product,
    });

  } catch (err) {
    console.error("Create product error", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};



const getAllProduct=async(req,res)=>{
    try{

        const products=await Product.find();
        res.status(200).json({success:true,products});


    }
    catch(err){
        console.error("Get all products error",err);
        res.status(500).json({message:"Server error",error:err.message});  
      }
}




const updateProduct = async (req, res) => {
    try {
      const { id } = req.params;
  
      // Handle image if updated
      let updateData = {
        ...req.body,
      };
  
      if (req.file) {
        updateData.image = `/uploads/${req.file.filename}`;
      }
  
      // Optional: parse arrays if passed as strings
      if (updateData.thickness) updateData.thickness = JSON.parse(updateData.thickness);
      if (updateData.width) updateData.width = JSON.parse(updateData.width);
      if (updateData.length) updateData.length = JSON.parse(updateData.length);
  
      const updated = await Product.findByIdAndUpdate(id, updateData, { new: true });
  
      if (!updated) {
        return res.status(404).json({ message: "Product not found" });
      }
  
      res.status(200).json({ success: true, product: updated });
  
    } catch (err) {
      console.error("Update product error", err);
      res.status(500).json({ message: "Server error", error: err.message });
    }
  };


const deleteProduct=async(req,res)=>{
    try{
const {id}=req.params;
const deleted= await Product.findByIdAndDelete(id);
if(!deleted){
    return res.status(404).json({message:"Product not found"});
}

res.status(200).json({success:true,message:"Product deleted"});
    }
    catch(err){
        console.log("Deleted product error",err);
        res.status(500).json({message:"Server error",error:err.message});

    }
}

module.exports={createProduct,getAllProduct,updateProduct,deleteProduct};

