
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
        <button>Send</button>
      </form>
    </div>
  );
};

export default page;


//----------------action.js-----------------------------//
import { connectDB } from "./connection";
import { User } from "./models";

export const addUser = async (formData) => {
  "use server";
  const { username, email, password, img, isAdmin, isActive, address } =
    Object.fromEntries(formData);

  try {
    connectDB;
    const newUser = new User({
      username,
      email,
      password,
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
};

