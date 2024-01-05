import { useEffect, useState } from "react";
import Loading from "../../components/Loading";
import { base_url } from "../../utils/baseUrl";

const Education = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {    
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Check if education information already exist or not
  const id = formData._id? formData._id : ""
  const method = formData._id? "PUT" : "POST"

  useEffect(()=> {
    setIsLoading(true)
    fetch(`${base_url}/api/education/`)
    .then((res) => res.json())
    .then((data) => setFormData(data[0]))
    .then(() => setIsLoading(false))
  }, [])

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setIsLoading(true)
      const res = await fetch(`${base_url}/api/education/${id}`, {
        method: method,
        headers: { "content-type": "application/json" },
        body: JSON.stringify(formData),
      });
      setIsLoading(false)
      if (res.ok) {
        window.location.reload();
        alert("Update successful");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="flex flex-col gap-8 items-center w-full mt-11">
      {isLoading && <Loading />}
      <div className="flex flex-col gap-2 items-center text-gray-200">
        <h1 className="text-3xl font-bold">Education</h1>
      </div>

      <form
        onSubmit={handleSubmit}
        className=" flex flex-col gap-7 text-sm text-white"
      >
        <input
          type="text"
          name="exam"
          value={formData.exam}
          onChange={handleChange}
          placeholder="Examination"
          className="p-3 rounded-md w-[350px] md:w-[550px] bg-gray-700/30"
        />

        <input
          type="text"
          name="institution"
          value={formData.institution}
          onChange={handleChange}
          placeholder="Institution"
          className="p-3 rounded-md w-[350px] md:w-[550px] bg-gray-700/30"
        ></input>

        <input
          type="text"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          placeholder="Subject"
          className="p-3 rounded-md w-[350px] md:w-[550px] bg-gray-700/30"
        ></input>

        <input
          type="text"
          name="result"
          value={formData.result}
          onChange={handleChange}
          placeholder="Result"
          className="p-3 rounded-md w-[350px] md:w-[550px] bg-gray-700/30"
        ></input>

        <input
          type="text"
          name="years"
          value={formData.years}
          onChange={handleChange}
          placeholder="Years"
          className="p-3 rounded-md w-[350px] md:w-[550px] bg-gray-700/30"
        ></input>

        <button className="btnn primary_bg w-fit">{formData._id? "Update" : "Submit"}</button>
      </form>
    </div>
  );
};

export default Education;


// import { useEffect, useState } from "react";

// const Education = () => {
//   const [formData, setFormData] = useState({});

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   useEffect(()=> {
//     fetch('http://localhost:5010/api/education')
//     .then((res) => res.json())
//     .then((data) => setFormData(data[0]))
//   }, [])

//   async function handleSubmit(e) {
//     e.preventDefault();

//     try {
//       const res = await fetch("http://localhost:5010/api/education/" + formData._id, {
//         method: "PUT",
//         headers: { "content-type": "application/json" },
//         body: JSON.stringify(formData),
//       });
//       if (res.ok) {
//         window.location.reload();
//         alert("Update successful");
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   }

//   console.log(formData);

//   return (
//     <div className="flex flex-col gap-8 items-center w-full mt-11">
//       <div className="flex flex-col gap-2 items-center text-gray-200">
//         <h1 className="text-3xl font-bold">Education</h1>
//       </div>

//       <form
//         onSubmit={handleSubmit}
//         className=" flex flex-col gap-7 text-sm text-white"
//       >
//         <input
//           type="text"
//           name="exam"
//           value={formData.exam}
//           onChange={handleChange}
//           placeholder="Examination"
//           className="p-3 rounded-md w-[350px] md:w-[550px] bg-gray-700/30"
//         />

//         <input
//           type="text"
//           name="institution"
//           value={formData.institution}
//           onChange={handleChange}
//           placeholder="Institution"
//           className="p-3 rounded-md w-[350px] md:w-[550px] bg-gray-700/30"
//         ></input>

//         <input
//           type="text"
//           name="subject"
//           value={formData.subject}
//           onChange={handleChange}
//           placeholder="Subject"
//           className="p-3 rounded-md w-[350px] md:w-[550px] bg-gray-700/30"
//         ></input>

//         <input
//           type="text"
//           name="result"
//           value={formData.result}
//           onChange={handleChange}
//           placeholder="Result"
//           className="p-3 rounded-md w-[350px] md:w-[550px] bg-gray-700/30"
//         ></input>

//         <input
//           type="text"
//           name="years"
//           value={formData.years}
//           onChange={handleChange}
//           placeholder="Years"
//           className="p-3 rounded-md w-[350px] md:w-[550px] bg-gray-700/30"
//         ></input>

//         <button className="btnn primary_bg w-fit">update</button>
//       </form>
//     </div>
//   );
// };

// export default Education;
