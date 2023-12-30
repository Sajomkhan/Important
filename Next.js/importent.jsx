

// ----------------- Suspension ------------//
          {post && (
            <Suspense fallback={<div>Loading...</div>}>
              <PostUser userId={post.userId} />
            </Suspense>
          )}



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

// ----------------- Suspension ------------//
          {post && (
            <Suspense fallback={<div>Loading...</div>}>
              <PostUser userId={post.userId} />
            </Suspense>
          )}
