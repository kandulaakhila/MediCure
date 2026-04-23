import { useState, useEffect, createContext } from "react";
import axios from "axios";

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const currency = "$";
  const [isLoading, setIsLoading] = useState(false);

  // ✅ Calculate age with birthday check
  const calculateAge = (dob) => {
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();

    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  };

  // ✅ Month names for slot formatting
  const months = [
    "",
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
 ];

  // ✅ Axios interceptors for global loading state
  useEffect(() => {
    const requestInterceptor = axios.interceptors.request.use(
      (config) => {
        setIsLoading(true);
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseInterceptor = axios.interceptors.response.use(
      (response) => {
        setIsLoading(false);
        return response;
      },
      (error) => {
        setIsLoading(false);
        return Promise.reject(error);
      }
    );

    // Cleanup interceptors on unmount
    return () => {
      axios.interceptors.request.eject(requestInterceptor);
      axios.interceptors.response.eject(responseInterceptor);
    };
  }, []);

  // ✅ Format slot date (e.g., "25_3_2026" → "25 Mar 2026")
  const slotDateFormat = (slotDate) => {
    const dataArray = slotDate.split("_");
    return (
      dataArray[0] +
      " " +
      months[Number(dataArray[1])] +
      " " +
      dataArray[2]
    );
  };

  const value = {
    calculateAge,
 slotDateFormat,
    currency,
    isLoading,
    setIsLoading,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
