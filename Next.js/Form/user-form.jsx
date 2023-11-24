import Image from "next/image";
import styles from "../../../components/dashboard/dashboard.module.css";
import { addUser } from "@/app/lib/actions";

const AddUser = () => {
  return (
    <div
      className={`${styles.input} flex flex-wrap gap-10 justify-center items-center mt-10`}
    >
      {/* --------------Image div---------------- */}
      <div className="bg-[var(--bgSoft)] bg-cover bg-center rounded-lg p-11">
        <Image
          src="/noavatar.png"
          alt=""
          width={220}
          height={220}
          className="rounded-lg"
        />
      </div>
      {/* --------------Form div---------------- */}
      <form
        action={addUser}
        className={`w-[600px] bg-[var(--bgSoft)] flex flex-wrap gap-7 p-10 rounded-lg`}
      >
        <div className="flex flex-col gap-1">
          <label htmlFor="username">User Name:</label>
          <input type="text" placeholder="User Name" name="username" required />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="email">Email:</label>
          <input type="text" placeholder="Email" name="email" required />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            placeholder="Password"
            name="password"
            required
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="isAdmin">Is Admin:</label>
          <select name="isAdmin" id="isAdmin">
            <option>Select role</option>
            <option value={true}>Yes</option>
            <option value={false} selected>
              No
            </option>
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="isActive">Is Active:</label>
          <select name="isActive" id="isActive">
            <option selected>select active</option>
            <option value={true} selected>
              Yes
            </option>
            <option value={false}>No</option>
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="address">Address:</label>
          <textarea
            name="address"
            id="desc"
            cols="30"
            rows="3"
            placeholder="Address"
          />
        </div>
        <button className="btn_primary px-5 py-3 font-semibold">Submit</button>
      </form>
    </div>
  );
};

export default AddUser;
