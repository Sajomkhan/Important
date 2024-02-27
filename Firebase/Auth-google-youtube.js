
// ================= src/firebase.js =================//
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCoW4EUHvFRT4Cg6h0uurmXB4aiaAA6Iz4",
  authDomain: "clone-152c2.firebaseapp.com",
  projectId: "clone-152c2",
  storageBucket: "clone-152c2.appspot.com",
  messagingSenderId: "43288179197",
  appId: "1:43288179197:web:bfdec56b08aa614cefa994"
};

const app = initializeApp(firebaseConfig);
export const auth =getAuth();
export const provider = new GoogleAuthProvider()

export default app;

// ================= Signin.js =================//

import { auth, provider } from "../firebase";
import { signInWithPopup } from "firebase/auth";

const SignIn = () => {
    
const signInWithGoogle = async () => {
  dispatch(logingStart);
  signInWithPopup(auth, provider)
    .then((result) => {
      axios
        .post("/auth/google", {
          name: result.user.displayName,
          email: result.user.email,
          img: result.user.photoURL,
        })
        .then((res) => {
          dispatch(logingSuccess(res.data));
        });
    })
    .catch((error) => {
      dispatch(logingFailure())
    });

  return (
    <div>
        <Button onClick={signInWithGoogle}>Signin with Google</Button>
    </div>
  );
};
export default SignIn;


// ================= server/controller/auth.js =================//
export const googleAuth = async (req, res, next) => {
  try {
    const user = User.findOne({ email: req.body.email });
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT);
      res
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .status(200)
        .json(user._doc);
    } else {
      const newUser = new User({
        ...req.body,
        fromGoogle: true,
      });
      const savedUser = await newUser.save();
      const token = jwt.sign({ id: user._id }, process.env.JWT);
      res
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .status(200)
        .json(savedUser._doc);
    }
  } catch (err) {
    next(err);
  }
};

// ================= server/models/User.js =================//
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  // Just Add These for preserve google data
  {
    fromGoogle: {
      type: Boolean,
      default: false,
    }
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema)



  
