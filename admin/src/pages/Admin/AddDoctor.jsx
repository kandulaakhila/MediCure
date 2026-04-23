import { useContext, useState } from "react";
import { assets } from "../../assets/assets";
import { AdminContext } from "../../context/AdminContext";
import { toast } from "react-toastify";
import axios from "axios";
import MoveUpOnRender from "../../components/MoveUpOnRender";

const initialValues = {
  name: "",
  email: "",
  password: "",
  experience: "1 Year",
  fees: "",
  about: "",
  speciality: "General physician",
  degree: "",
  address1: "",
  address2: "",
};

const AddDoctor = () => {
  const [docImg, setDocImg] = useState(null);
  const [doctorData, setDoctorData] = useState(initialValues);

  const { backendUrl, aToken } = useContext(AdminContext);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDoctorData({
      ...doctorData,
      [name]: value,
    });
  };

  const handleOnSubmit = async (event) => {
    event.preventDefault();
     try {
      if (!docImg) {
        return toast.error("Image not selected");
      }

      const formData = new FormData();
      formData.append("image", docImg);
      formData.append("name", doctorData.name);
      formData.append("email", doctorData.email);
      formData.append("password", doctorData.password);
      formData.append("experience", doctorData.experience);
      formData.append("fees", Number(doctorData.fees));
      formData.append("about", doctorData.about);
      formData.append("speciality", doctorData.speciality);
      formData.append("degree", doctorData.degree);
      formData.append(
        "address",
        JSON.stringify({
          line1: doctorData.address1,
          line2: doctorData.address2,
        })
      );

      const { data } = await axios.post(
        `${backendUrl}/api/admin/add-doctor`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${aToken}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (data.success) {
        toast.success(data.message);
        setDocImg(null);
        setDoctorData(initialValues);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("error:", error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <MoveUpOnRender id="admin-adddoctor">
      <form onSubmit={handleOnSubmit} className="m-5 w-full">
        <p className="mb-3 text-lg font-medium">Add Doctor</p>

        <div className="bg-white px-8 py-8 border rounded w-full max-w-4xl max-h-[80vh] overflow-y-scroll">
          {/* Upload picture */}
          <div className="flex items-center gap-4 mb-8 text-gray-500">
            <label htmlFor="doc-img">
              <img
                className="w-16 bg-gray-100 rounded-full cursor-pointer"
                src={docImg ? URL.createObjectURL(docImg) : assets.upload_area}
                alt="Upload doctor"
              />
            </label>
            <input
              onChange={(e) => setDocImg(e.target.files[0])}
              type="file"
              id="doc-img"
              hidden
            />
            <p>
              Upload Doctor <br /> picture
            </p>
          </div>

          {/* Doctor details */}
          <div className="flex flex-col lg:flex-row items-start gap-10 text-gray-600">
            <div className="w-full lg:flex-1 flex flex-col gap-4">
              {/* Name */}
              <div className="flex flex-col gap-1">
                <p>Doctor name</p>
                <input
                  className="border rounded px-3 py-2"
                  type="text"
  name="name"
                  value={doctorData.name}
                  onChange={handleInputChange}
                  placeholder="Name"
                  required
                />
              </div>

              {/* Email */}
              <div className="flex flex-col gap-1">
                <p>Doctor Email</p>
                <input
                  className="border rounded px-3 py-2"
                  type="email"
                  name="email"
                  value={doctorData.email}
                  onChange={handleInputChange}
                  placeholder="Email"
                  required
                />
              </div>

              {/* Password */}
              <div className="flex flex-col gap-1">
                <p>Doctor Password</p>
                <input
                  className="border rounded px-3 py-2"
                  type="password"
                  name="password"
                  value={doctorData.password}
                  onChange={handleInputChange}
                  placeholder="Password"
                  required
                />
              </div>

              {/* Experience */}
              <div className="flex flex-col gap-1">
                <p>Experience</p>
                <select
                  name="experience"
                  value={doctorData.experience}
                  onChange={handleInputChange}
                  className="border rounded px-3 py-2"
                >
                  {[...Array(10)].map((_, i) => (
                    <option key={i + 1} value={`${i + 1} Year${i > 0 ? "s" : ""}`}>
                      {i + 1} Year{i > 0 ? "s" : ""}
                    </option>
                  ))}
                </select>
              </div>

              {/* Fees */}
              <div className="flex flex-col gap-1">
                <p>Fees</p>
                <input
                  className="border rounded px-3 py-2"
                  type="number"
                  name="fees"
                  value={doctorData.fees}
                  onChange={handleInputChange}
                  placeholder="Fees"
                  required
                />
              </div>
            </div>

            {/* Right column */}
            <div className="w-full lg:flex-1 flex flex-col gap-4">
              {/* Speciality */}
              <div className="flex flex-col gap-1">
                <p>Speciality</p>
 <select
                  name="speciality"
                  value={doctorData.speciality}
                  onChange={handleInputChange}
                  className="border rounded px-3 py-2"
                >
                  <option value="General physician">General physician</option>
                  <option value="Gynecologist">Gynecologist</option>
                  <option value="Dermatologist">Dermatologist</option>
                  <option value="Pediatricians">Pediatricians</option>
                  <option value="Neurologist">Neurologist</option>
                  <option value="Gastroenterologist">Gastroenterologist</option>
                </select>
              </div>

              {/* Education */}
              <div className="flex flex-col gap-1">
                <p>Education</p>
                <input
                  className="border rounded px-3 py-2"
                  type="text"
                  name="degree"
                  value={doctorData.degree}
                  onChange={handleInputChange}
                  placeholder="Education"
                  required
                />
              </div>

              {/* Address */}
              <div className="flex flex-col gap-1">
                <p>Address</p>
                <input
                  className="border rounded px-3 py-2 mb-2"
                  type="text"
                  name="address1"
                  value={doctorData.address1}
                  onChange={handleInputChange}
                  placeholder="Address 1"
                  required
                />
                <input
                  className="border rounded px-3 py-2"
                  type="text"
  name="address2"
                  value={doctorData.address2}
                  onChange={handleInputChange}
                  placeholder="Address 2"
                  required
                />
              </div>
            </div>
          </div>

          {/* About Doctor */}
          <div>
            <p className="mt-4 mb-2">About Doctor</p>
            <textarea
              className="w-full px-4 pt-2 border rounded"
              name="about"
              value={doctorData.about}
              onChange={handleInputChange}
              placeholder="Write about doctor"
              rows={5}
              required
            />
          </div>

          {/* Submit button */}
          <button
            type="submit"
            className="bg-primary px-10 py-3 mt-4 text-white rounded-full"
          >
            Add Doctor
          </button>
        </div>
      </form>
    </MoveUpOnRender>
  );
};

export default AddDoctor;
