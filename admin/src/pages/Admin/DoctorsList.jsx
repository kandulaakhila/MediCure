import { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";

const DoctorList = () => {
  const { doctors, aToken, getAllDoctors, changeAvailability } =
    useContext(AdminContext);

  useEffect(() => {
    if (aToken) {
      getAllDoctors();
    }
  }, [aToken]);

  return (
    <div className="m-5 max-h-[90vh] overflow-y-auto">
      <h1 className="text-lg font-medium">All Doctors</h1>

      <div className="w-full flex flex-wrap gap-4 pt-5 gap-y-6">
        {doctors.length === 0 ? (
          <p className="text-gray-500">No doctors found</p>
        ) : (
          doctors.map((item) => (
            <div
              key={item._id}
              className="border border-indigo-200 rounded-xl max-w-56 overflow-hidden cursor-pointer group"
            >
              {/* Doctor Image */}
              <img
                src={item.image}
                alt={item.name}
                className="bg-indigo-50 group-hover:bg-primary transition-all duration-500 w-full h-40 object-cover"
              />

              {/* Doctor Info */}
              <div className="p-4">
                <p className="text-neutral-800 text-lg font-medium">
                  {item.name}
                </p>
                <p className="text-zinc-600 text-sm">{item.speciality}</p>

                {/* Availability Toggle */}
                <div className="mt-2 flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={item.available}
                    onChange={() => changeAvailability(item._id)}
                    className="w-5 h-5 accent-blue-600 cursor-pointer"
                  />
                  <p
                    className={
                      item.available ? "text-green-600" : "text-red-600"
                    }
                  >
                    {item.available ? "Available" : "Unavailable"}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default DoctorList;


