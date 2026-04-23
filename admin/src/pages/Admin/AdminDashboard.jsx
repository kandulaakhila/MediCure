import { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets";
import MoveUpOnRender from "../../components/MoveUpOnRender";

const Dashboard = () => {
  const { aToken, getDashData, cancelAppointment, dashData } =
    useContext(AdminContext);
  const { slotDateFormat } = useContext(AppContext);

  useEffect(() => {
    if (aToken) {
      getDashData();
    }
  }, [aToken]);

  if (!dashData) {
    return (
      <div className="m-5 text-center text-gray-500">
        Loading dashboard data...
      </div>
    );
  }

  return (
    <MoveUpOnRender id="admin-dash">
      <div className="m-5">
        {/* Top Stats */}
        <div className="flex flex-wrap gap-3">
          {/* Doctors */}
          <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border border-gray-100 cursor-pointer hover:scale-105 transition-all">
            <img className="w-14" src={assets.doctor_icon} alt="Doctors" />
            <div>
              <p className="text-xl font-semibold text-gray-600">
                {dashData?.doctors}
              </p>
              <p className="text-gray-400">Doctors</p>
            </div>
 </div>

          {/* Appointments */}
          <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border border-gray-100 cursor-pointer hover:scale-105 transition-all">
            <img
              className="w-14"
              src={assets.appointments_icon}
              alt="Appointments"
            />
            <div>
              <p className="text-xl font-semibold text-gray-600">
                {dashData?.appointments}
              </p>
              <p className="text-gray-400">Appointments</p>
            </div>
          </div>

          {/* Patients */}
          <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border border-gray-100 cursor-pointer hover:scale-105 transition-all">
            <img className="w-14" src={assets.patients_icon} alt="Patients" />
            <div>
              <p className="text-xl font-semibold text-gray-600">
                {dashData?.users}
              </p>
              <p className="text-gray-400">Patients</p>
            </div>
          </div>
        </div>

        {/* Latest Bookings */}
        <div className="bg-white mt-10 rounded border">
          <div className="flex items-center gap-2.5 px-4 py-4 border-b">
            <img src={assets.list_icon} alt="Latest Bookings" />
            <p className="font-semibold">Latest Bookings</p>
          </div>

          <div className="pt-4">
            {dashData?.latestAppointments?.length > 0 ? (
              dashData.latestAppointments.map((item, index) => (
                <div
                  className="flex items-center px-6 py-3 gap-3 hover:bg-gray-100 border-b"
                  key={item._id || index}
                >
                  {/* Doctor Image */}
                  <img
                    className="rounded-full w-10 h-10 object-cover bg-gray-200"
                    src={item?.docData?.image}
                    alt="Doctor"
                  />

                  {/* Doctor Info */}
                  <div className="flex-1 text-sm">
                    <p className="text-gray-800 font-medium">
                      {item?.docData?.name}
                    </p>
                    <p className="text-gray-600">
                      {slotDateFormat(item?.slotDate)}
                    </p>
                  </div>

                  {/* Status / Action */}
                  {item.cancelled ? (
                    <p className="text-red-500 text-xs font-medium">Cancelled</p>
                  ) : item.isCompleted ? (
                    <p className="text-green-500 text-xs font-medium">
                      Completed
                    </p>
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
              <p className="text-center text-gray-500 py-6">
                No latest bookings found
              </p>
            )}
          </div>
        </div>
      </div>
    </MoveUpOnRender>
  );
};

export default Dashboard;
