import Image from "next/image";
import styles from "../../../components/dashboard/dashboard.module.css";
import { addProduct } from "@/app/lib/actions";

const AddProduct = () => {
  return (
    <div
      className={`${styles.input} flex flex-wrap gap-10 justify-center items-center mt-10`}
    >
      {/* --------------Image div---------------- */}
      <div className="bg-[var(--bgSoft)] bg-cover bg-center rounded-lg p-11">
        <Image
          src="/noproduct.jpg"
          alt=""
          width={220}
          height={220}
          className="rounded-lg"
        />
      </div>
      {/* --------------Form div---------------- */}
      <form
        action={addProduct}
        className={`w-[600px] bg-[var(--bgSoft)] flex flex-wrap gap-7 p-10 rounded-lg`}
      >
        <div className="flex flex-col gap-1">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            placeholder="Product Title"
            name="title"
            required
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="price">Price:</label>
          <input type="text" placeholder="Price" name="price" required />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="stock">Stock:</label>
          <input type="text" placeholder="Stock" name="stock" />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="color">Color:</label>
          <input type="text" placeholder="Color" name="color" />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="cat">Category:</label>
          <select name="cat" id="cat">
            <option selected>--- Select ---</option>
            <option value="kitchen">Kitchen</option>
            <option value="computer">Computer</option>
            <option value="phone">Phone</option>
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="desc">Product Description:</label>
          <textarea
            name="desc"
            id="desc"
            cols="30"
            rows="6"
            placeholder="Product description"
          />
        </div>
        <button className="btn_primary px-5 py-3 font-semibold">Submit</button>
      </form>
    </div>
  );
};

export default AddProduct;
