import validator from "validator";
import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import doctorModel from "../models/doctorModel.js";
import jwt from "jsonwebtoken";
// import appointmentModel from "../models/appointmentModel.js"; // uncomment when ready
import userModel from "../models/userModel.js";

import appointmentModel from "../models/appointmentModel.js";

const adminDashboard = async (req, res) => {
  try {
    const doctorCount = await doctorModel.countDocuments();
    const appointmentCount = await appointmentModel.countDocuments();
    const userCount = await userModel.countDocuments();

    // latest 5 appointments with doctor & user info
    const latestAppointments = await appointmentModel
      .find({})
      .sort({ createdAt: -1 })
      .limit(5)
      .populate("docId", "name image fees")
      .populate("userId", "name dob image");

    res.json({
      success: true,
      data: {
        doctors: doctorCount,
        appointments: appointmentCount,
        users: userCount,
        latestAppointments,
      },
    });
  } catch (error) {
    console.error("Error in admin dashboard:", error);
    res.json({ success: false, message: error.message });
  }
};
// API for adding doctor
const addDoctor = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      speciality,
      degree,
      experience,
      about,
      fees,
      address,
    } = req.body;

    // Validate required fields
    if (
      !name ||
      !email ||
      !password ||
      !speciality ||
      !degree ||
      !experience ||
      !about ||
      !fees ||
      !address
    ) {
      return res.json({ success: false, message: "Missing details" });
    }

    // Validate email format
 if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Please enter a valid email" });
    }

    // Validate strong password
    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Password must be at least 8 characters",
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Validate file upload
    if (!req.file) {
      return res.json({ success: false, message: "No file uploaded" });
    }

    // Upload image to Cloudinary
    const imageUpload = await cloudinary.uploader.upload(req.file.path, {
      resource_type: "image",
    });
    const imageUrl = imageUpload.secure_url;

    // Prepare doctor data
    const doctorData = {
      name,
      email,
      image: imageUrl,
      password: hashedPassword,
      speciality,
      degree,
      experience,
      about,
      fees,
      address,
      date: Date.now(),
    };

    const newDoctor = new doctorModel(doctorData);
    await newDoctor.save();
 return res.json({ success: true, message: "Doctor added successfully" });
  } catch (error) {
    console.error("Error adding doctor:", error);
    return res.json({ success: false, message: error.message });
  }
};

// API for admin login
const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Compare with env variables
    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign({ email }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });
      return res.json({ success: true, token });
    }

    return res.json({ success: false, message: "Invalid credentials" });
  } catch (error) {
    console.error("Error in admin login:", error);
    res.json({ success: false, message: error.message });
  }
};


// API for cancelling appointment
const appointmentCancel = async (req, res) => {
  try {
    const { appointmentId } = req.body;
    // await appointmentModel.findByIdAndUpdate(appointmentId, { status: "cancelled" });

    res.json({ success: true, message: "Appointment cancelled successfully" });
  } catch (error) {
    console.error("Error cancelling appointment:", error);
    res.json({ success: false, message: error.message });
  }
};

// API to get all doctors list
const allDoctors = async (req, res) => {
  try {
    const doctors = await doctorModel.find({}).select("-password");
    res.json({ success: true, doctors });
  } catch (error) {
    console.error("Error fetching doctors:", error);
    res.json({ success: false, message: error.message });
  }
};

// API to get all appointments (admin)
const appointmentsAdmin = async (req, res) => {
  try {
    const appointments = await appointmentModel.find()
      .populate("userId", "name dob image")
      .populate("docId", "name image fees");

    const formattedAppointments = appointments.map(appt => ({
      _id: appt._id,
      slotDate: appt.slotDate,
      slotTime: appt.slotTime,
      cancelled: appt.cancelled,
      isCompleted: appt.isCompleted,
      userData: appt.userId,   
       docData: appt.docId  
    }));

    res.json({ success: true, appointments: formattedAppointments });
  } catch (error) {
    console.error("Error fetching appointments:", error);
    res.json({ success: false, message: error.message });
  }
};

export {
  addDoctor,
  loginAdmin,
  allDoctors,
  adminDashboard,
  appointmentCancel,
  appointmentsAdmin,
};




