import { useState } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { CiUser } from "react-icons/ci";
import { CiSquareCheck } from "react-icons/ci";
import { CiFileOn } from "react-icons/ci";
import { CiMail } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';
import db from "../dbconfig/db";
import bus from "../utils/tabBus";   

function PatientForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    gender: "",
    email: "",
    phone: "",
    address: "",
    medicalHistory: "",
    allergies: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Submitting form data:", formData);
      await db.query(
        `INSERT INTO patients
           (firstname, lastname, dateofbirth,
            gender, email, phone, address,
            medicalhistory, allergies)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9);`,
        [
          formData.firstName,
          formData.lastName,
          formData.dateOfBirth,
          formData.gender,
          formData.email,
          formData.phone,
          formData.address,
          formData.medicalHistory,
          formData.allergies,
        ]
      );
      
      bus.postMessage({ type: 'PATIENT_ADDED' });
      
      setFormData({
        firstName: "",
        lastName: "",
        dateOfBirth: "",
        gender: "",
        email: "",
        phone: "",
        address: "",
        medicalHistory: "",
        allergies: "",
      });
      toast.success('Patient data saved successfully!');
      setTimeout(() => {
        navigate('/');
      }, 1000);
    } catch (error) {
      console.error("Error inserting patient data:", error);
      toast.error('Failed to save patient data. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F8F9FA] to-[#E9ECEF] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <button
              onClick={() => window.history.back()}
              className="flex items-center space-x-2 text-[#6C757D] hover:text-[#212529] transition duration-150"
            >
              <IoIosArrowRoundBack className="h-6 w-6" />
              <span>Back</span>
            </button>
            <h1 className="text-3xl font-bold text-[#212529] absolute left-1/2 transform -translate-x-1/2">
              Patient Registration
            </h1>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 w-full">
          <div className="flex items-center justify-center mb-8">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
              <CiUser className="h-8 w-8 text-blue-600" />
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-6 bg-[#F8F9FA] p-6 rounded-lg">
              <div className="flex items-center gap-3">
                <CiFileOn className="h-5 w-5 text-blue-600 flex-shrink-0" />
                <h3 className="text-xl font-semibold text-[#212529]">
                  Personal Information
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-medium text-[#212529] mb-1"
                  >
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="Enter first name"
                    className="block w-full rounded-lg border-[#CED4DA] shadow-sm focus:border-blue-500 focus:ring-blue-500 transition duration-150 text-base py-3 px-4 placeholder-[#6C757D]"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="lastName"
                    className="block text-sm font-medium text-[#212529] mb-1"
                  >
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Enter last name"
                    className="block w-full rounded-lg border-[#CED4DA] shadow-sm focus:border-blue-500 focus:ring-blue-500 transition duration-150 text-base py-3 px-4 placeholder-[#6C757D]"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="dateOfBirth"
                    className="block text-sm font-medium text-[#212529] mb-1"
                  >
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    id="dateOfBirth"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                    placeholder="Select date of birth"
                    className="block w-full rounded-lg border-[#CED4DA] shadow-sm focus:border-blue-500 focus:ring-blue-500 transition duration-150 text-base py-3 px-4 placeholder-[#6C757D] text-[#6C757D]"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="gender"
                    className="block text-sm font-medium text-[#212529] mb-1"
                  >
                    Gender
                  </label>
                  <select
                    id="gender"
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="block w-full rounded-lg border-[#CED4DA] shadow-sm focus:border-blue-500 focus:ring-blue-500 transition duration-150 text-base py-3 px-4 text-[#6C757D]"
                    required
                  >
                    <option value="" className="text-[#6C757D]">
                      Select gender
                    </option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="space-y-6 bg-[#F8F9FA] p-6 rounded-lg">
              <div className="flex items-center gap-3">
                <CiMail className="h-5 w-5 text-blue-600 flex-shrink-0" />
                <h3 className="text-xl font-semibold text-[#212529]">
                  Contact Information
                </h3>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-[#212529] mb-1"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter email address"
                  className="block w-full rounded-lg border-[#CED4DA] shadow-sm focus:border-blue-500 focus:ring-blue-500 transition duration-150 text-base py-3 px-4 placeholder-[#6C757D]"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-[#212529] mb-1"
                >
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter phone number (10 digits)"
                  pattern="[0-9]{10}"
                  className="block w-full rounded-lg border-[#CED4DA] shadow-sm focus:border-blue-500 focus:ring-blue-500 transition duration-150 text-base py-3 px-4 placeholder-[#6C757D]"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="address"
                  className="block text-sm font-medium text-[#212529] mb-1"
                >
                  Address
                </label>
                <textarea
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  rows="3"
                  placeholder="Enter full address"
                  className="block w-full rounded-lg border-[#CED4DA] shadow-sm focus:border-blue-500 focus:ring-blue-500 transition duration-150 text-base py-3 px-4 placeholder-[#6C757D]"
                  required
                />
              </div>
            </div>

            <div className="space-y-6 bg-[#F8F9FA] p-6 rounded-lg">
              <div className="flex items-center gap-3">
                <CiSquareCheck className="h-5 w-5 text-blue-600 flex-shrink-0" />
                <h3 className="text-xl font-semibold text-[#212529]">
                  Medical Information
                </h3>
              </div>

              <div>
                <label
                  htmlFor="medicalHistory"
                  className="block text-sm font-medium text-[#212529] mb-1"
                >
                  Medical History
                </label>
                <textarea
                  id="medicalHistory"
                  name="medicalHistory"
                  value={formData.medicalHistory}
                  onChange={handleChange}
                  rows="4"
                  placeholder="Enter any relevant medical history"
                  className="block w-full rounded-lg border-[#CED4DA] shadow-sm focus:border-blue-500 focus:ring-blue-500 transition duration-150 text-base py-3 px-4 placeholder-[#6C757D]"
                />
              </div>

              <div>
                <label
                  htmlFor="allergies"
                  className="block text-sm font-medium text-[#212529] mb-1"
                >
                  Allergies
                </label>
                <textarea
                  id="allergies"
                  name="allergies"
                  value={formData.allergies}
                  onChange={handleChange}
                  rows="3"
                  placeholder="List any known allergies"
                  className="block w-full rounded-lg border-[#CED4DA] shadow-sm focus:border-blue-500 focus:ring-blue-500 transition duration-150 text-base py-3 px-4 placeholder-[#6C757D]"
                />
              </div>
            </div>

            <div className="flex justify-between w-full space-x-4">
              <button
                type="submit"
                className="flex-1 px-8 py-3 bg-white text-black border border-[#CED4DA] rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 text-base font-medium"
              >
                Register Patient
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default PatientForm;
