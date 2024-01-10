
// direct get data form "formData" and post action without server
const page = () => {
  
  const handleFrom = async (formData) => {
    "use server";
    const username = formData.get("username");
    console.log("Hello", username);
  };

  return (
    <div>
      <form action={handleFrom}>
        <input type="text" name="username" />  
          {/* must have to use name */}
        <button>Send</button>
      </form>
    </div>
  );
};

export default page;


//==================== root/lib/action.js========================//
import { connectDB } from "./connection";
import { User } from "./models";

export const addUser = async (formData) => {
  "use server";
  const { username, email, password, img, isAdmin, isActive, address } =
    Object.fromEntries(formData);
    // or  const data = Object.fromEntries(formData);
  try {
    connectDB;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);    
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      img,
      isAdmin,
      isActive,
      address,
    });
    // or  const newUser = new User(data)
    await newUser.save();
  } catch (err) {
    console.log(err);
    throw new Error("Failed to create user");
  }
  revalidatePath("/dashboard/users");
  redirect("/dashboard/users");
};

// export const addUser = async (formData) => {
//   const data = Object.fromEntries(formData);
//   try {
//     connectDB;
//     const newUser = await User.create(data);
//     return new NextResponse(JSON.stringify(newUser), { status: 200 });
//   } catch (err) {
//     console.log(err);
//     throw new Error("Failed to create user");
//   }
// };


//-----------------------for delete action-----------------------------//
 <form action={deleteProduct}>
    <input type="hidden" name="id" value={product.id} />
    <button className={`btn_danger`}>Delete</button>
  </form>

export const deleteProduct = async (formData) => {
  "use server";
  const { id } = Object.fromEntries(formData);

  try {
    connectDB;
    await Product.findByIdAndDelete(id);
  } catch (err) {
    console.log(err);
    throw new Error("Failed to delete product");
  }
  revalidatePath("/dashboard/products");
};





//--------------------Full CRUD serverless Action----------------------//
import { revalidatePath } from "next/cache";
import { connectDB } from "./connection";
import { Product, User } from "./models";
import { redirect } from "next/navigation";
import bcrypt from "bcrypt";

// ---------------------Add User---------------------//
export const addUser = async (formData) => {
  "use server";
  const { username, email, password, img, isAdmin, isActive, address } =
    Object.fromEntries(formData);

  try {
    connectDB;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      img,
      isAdmin,
      isActive,
      address,
    });

    await newUser.save();
  } catch (err) {
    console.log(err);
    throw new Error("Failed to create user");
  }
  revalidatePath("/dashboard/users");
  redirect("/dashboard/users");
};

// ------------------Add User---------------------//
// export const addUser = async (formData) => {
//   const data = Object.fromEntries(formData);

//   try {
//     connectDB;
//     const newUser = await User.create(data);
//     return new NextResponse(JSON.stringify(newUser), { status: 200 });
//   } catch (err) {
//     console.log(err);
//     throw new Error("Failed to create user");
//   }
// };

// ---------------------Update User---------------------//
export const updateUser = async (formData) => {
  "use server";
  const { id, username, email, password, img, isAdmin, isActive, address } =
    Object.fromEntries(formData);

  try {
    connectDB;
    const updateFields = {
      id,
      username,
      email,
      password,
      img,
      isAdmin,
      isActive,
      address,
    };
    Object.keys(updateFields).forEach(
      (key) => updateFields[key] === "" || undefined
    ) && delete updateFields[key];

    await User.findByIdAndUpdate(id, updateFields);
  } catch (err) {
    console.log(err);
    throw new Error("Failed to update user");
  }
  revalidatePath("/dashboard/users");
  redirect("/dashboard/users");
};

// ------------------Add Product---------------------//
export const addProduct = async (formData) => {
  "use server";
  const { title, desc, price, stock, color, img } =
    Object.fromEntries(formData);

  try {
    connectDB;
    const newProduct = new Product({
      title,
      desc,
      price,
      stock,
      color,
      img,
    });

    await newProduct.save();
  } catch (err) {
    console.log(err);
    throw new Error("Failed to create product");
  }
  revalidatePath("/dashboard/products");
  redirect("/dashboard/products");
};

// ----------------Delete Product-------------------//
export const deleteUser = async (formData) => {
  "use server";
  const { id } = Object.fromEntries(formData);

  try {
    connectDB;
    await User.findByIdAndDelete(id);
  } catch (err) {
    console.log(err);
    throw new Error("Failed to delete user");
  }
  revalidatePath("/dashboard/users");
};

// ----------------Delete User-------------------//
export const deleteProduct = async (formData) => {
  "use server";
  const { id } = Object.fromEntries(formData);

  try {
    connectDB;
    await Product.findByIdAndDelete(id);
  } catch (err) {
    console.log(err);
    throw new Error("Failed to delete product");
  }
  revalidatePath("/dashboard/products");
};

// ---------------------Update product---------------------//
export const updateProduct = async (formData) => {
  "use server";
  const { id, title, desc, price, stock, color, img } =
    Object.fromEntries(formData);

  try {
    connectDB;
    const updateFields = {
      id,
      title,
      desc,
      price,
      stock,
      color,
      img,
    };
    Object.keys(updateFields).forEach(
      (key) => updateFields[key] === "" || undefined
    ) && delete updateFields[key];

    await Product.findByIdAndUpdate(id, updateFields);
  } catch (err) {
    console.log(err);
    throw new Error("Failed to update product");
  }
  revalidatePath("/dashboard/products");
  redirect("/dashboard/products");
};

