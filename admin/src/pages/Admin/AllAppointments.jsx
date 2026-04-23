import { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets";
import MoveUpOnRender from "../../components/MoveUpOnRender";

const AllAppointments = () => {
  const { aToken, appointments, getAllAppointments, cancelAppointment } =
    useContext(AdminContext);

  const { currency, calculateAge, slotDateFormat } = useContext(AppContext);

  useEffect(() => {
    if (aToken) {
      getAllAppointments();
    }
  }, [aToken]);

  return (
    <div className="w-full max-w-7xl m-5">
      <MoveUpOnRender id="admin-allappointment">
        <p className="mb-3 text-lg font-medium">All Appointments</p>

        <div className="bg-white border rounded text-sm max-h-[80vh] min-h-[60vh] overflow-y-scroll">
          {/* Table Header */}
          <div className="hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] items-center py-3 px-6 border-b font-medium text-gray-700">
            <p>#</p>
            <p>Patient</p>
            <p>Age</p>
            <p>Date & Time</p>
            <p>Doctor</p>
            <p>Fees</p>
            <p>Actions</p>
          </div>
 {/* Table Rows */}
          {appointments && appointments.length > 0 ? (
            appointments.map((item, index) => (
              <div
                key={item._id || index}
                className="flex flex-wrap justify-between max-sm:gap-2 sm:grid sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] items-center text-gray-600 py-3 px-6 border-b hover:bg-gray-50"
              >
                {/* Index */}
                <p className="max-sm:hidden">{index + 1}</p>

                {/* Patient */}
                <div className="flex items-center gap-2">
                  <img
                    className="w-8 h-8 rounded-full object-cover"
                    src={item?.userData?.image}
                    alt="Patient"
                  />
                  <p className="capitalize">{item?.userData?.name}</p>
                </div>

                {/* Age */}
                <p className="max-sm:hidden">
                  {calculateAge(item?.userData?.dob)}
                </p>

                {/* Date & Time */}
                <p>
                  {slotDateFormat(item.slotDate)} , {item.slotTime}
                </p>

                {/* Doctor */}
                <div className="flex items-center gap-2">
                  <img
                    className="w-8 h-8 rounded-full object-cover bg-gray-200"
                    src={item?.docData?.image}
                    alt="Doctor"
                  />
                  <p>{item?.docData?.name}</p>
                </div>

                {/* Fees */}
                <p>{currency}{item?.docData?.fees}</p>

                {/* Actions */}
 {item.cancelled ? (
                  <p className="text-red-500 text-xs font-medium">Cancelled</p>
                ) : item.isCompleted ? (
                  <p className="text-green-500 text-xs font-medium">Completed</p>
                ) : (
                  <img
                    onClick={() => cancelAppointment(item._id)}
                    className="w-10 cursor-pointer"
                    src={assets.cancel_icon}
                    alt="Cancel Appointment"
                  />
                )}
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 py-10">No appointments found</p>
          )}
        </div>
      </MoveUpOnRender>
    </div>
  );
};

export default AllAppointments;
