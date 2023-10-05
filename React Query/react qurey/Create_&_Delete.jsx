
import { UserContextProvider } from "./context/UserContext.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 1000 * 60 * 60 * 5 } },  // cash time
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserContextProvider>
      <QueryClientProvider client={queryClient}>
        <App />
        <ReactQueryDevtools initialIsOpen/>
      </QueryClientProvider>
    </UserContextProvider>
  </React.StrictMode>
);



// ------------------api/experienceApi-------------------//
import axios from "axios";
import { base_url } from "./baseUrl";

const experienceApi = axios.create({
  baseURL: base_url,
});

export const getExperience = async () => {
  const res = await experienceApi.get("/api/experience");
  return res.data;
};

export const addExperience = async (experience) => {
  return await experienceApi.post("/api/experience", experience);
};

export const updateExperience = async (experience) => {
  return await experienceApi.put(
    `/api/experience/${experience._id}`,
    experience
  );
};

export const deleteExperience = async (id) => {
  return await experienceApi.delete(`/api/experience/${id}`, id);
};

export default experienceApi;




// ------------------create experience-------------------//
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addExperience } from "../../api/experienceApi";

const [formData, setFormData] = useState();

const handleChange = (e) => {
  setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
};

const queryClient = useQueryClient();



// add experience data
const addDataMutation = useMutation(addExperience, {
  onSuccess: () => {
    // Invalidates cashe and refetch
    queryClient.invalidateQueries("experience");
  },
});

const handleSubmit = async (e) => {
  e.preventDefault();
  addDataMutation.mutate(formData);
};



// Delete Experience data
const deleteDataMutation = useMutation(deleteExperience, {
  onSuccess: () => {
    // Invalidates cashe and refetch
    queryClient.invalidateQueries("experience")  
  }
})

const handleDelete = (id) => {
  deleteDataMutation.mutate(id)
};
