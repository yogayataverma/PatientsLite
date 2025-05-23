import { useState, useEffect } from "react";
import { CiFileOn } from "react-icons/ci";
import db from "../dbconfig/db";
import bus from "../utils/tabBus";
import { useCallback } from "react";

function Dashboard() {
  const [patients, setPatients] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchPatients = useCallback(async () => {
    try {
      setIsLoading(true);
      const { rows } = await db.query(`
        SELECT
          id,
          firstname      AS "firstName",
          lastname       AS "lastName",
          dateofbirth    AS "dateOfBirth",
          gender,
          email,
          phone,
          address,
          medicalhistory AS "medicalHistory",
          allergies
        FROM patients;
      `);
      setPatients(rows);
    } catch (error) {
      console.error("Error fetching patients:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);
  
  useEffect(() => {
    fetchPatients();
    const onMessage = (evt) => {
      if (evt.data?.type === 'PATIENT_ADDED') {
        fetchPatients();
      }
    };
    bus.addEventListener('message', onMessage);
    return () => bus.removeEventListener('message', onMessage);
  }, [fetchPatients]);

  useEffect(() => {
    const onMessage = (evt) => {
      if (evt.data?.type === 'PATIENT_ADDED') {
        console.log('Another tab just added a patient 🎉');
      }
    };
    bus.addEventListener('message', onMessage);
    return () => bus.removeEventListener('message', onMessage);
  }, []);

  const truncateText = (text) => {
    if (!text) return "";
    return text;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#F8F9FA] to-[#E9ECEF] py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-[#212529]">
              Patient Dashboard
            </h1>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-16 text-center">
            <div className="max-w-md mx-auto flex flex-col items-center">
              <div className="relative">
                <div className="w-16 h-16 border-4 border-blue-200 rounded-full"></div>
                <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin absolute top-0 left-0"></div>
              </div>
              <h3 className="text-xl font-semibold text-[#212529] mt-4">
                Loading...
              </h3>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F8F9FA] to-[#E9ECEF] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-[#212529]">
            Patient Dashboard
          </h1>
        </div>

        {patients.length > 0 ? (
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-[#CED4DA] table-fixed">
                <thead className="bg-[#F8F9FA]">
                  <tr>
                    <th scope="col" className="w-16 px-6 py-3 text-left text-xs font-medium text-[#212529] uppercase tracking-wider">
                      #ID
                    </th>
                    <th scope="col" className="w-40 px-6 py-3 text-left text-xs font-medium text-[#6C757D] uppercase tracking-wider">
                      Patient Name
                    </th>
                    <th scope="col" className="w-48 px-6 py-3 text-left text-xs font-medium text-[#6C757D] uppercase tracking-wider">
                      Date of Birth
                    </th>
                    <th scope="col" className="w-24 px-6 py-3 text-left text-xs font-medium text-[#6C757D] uppercase tracking-wider">
                      Gender
                    </th>
                    <th scope="col" className="w-48 px-6 py-3 text-left text-xs font-medium text-[#6C757D] uppercase tracking-wider">
                      Contact
                    </th>
                    <th scope="col" className="w-48 px-6 py-3 text-left text-xs font-medium text-[#6C757D] uppercase tracking-wider">
                      Address
                    </th>
                    <th scope="col" className="w-48 px-6 py-3 text-left text-xs font-medium text-[#6C757D] uppercase tracking-wider">
                      Medical History
                    </th>
                    <th scope="col" className="w-48 px-6 py-3 text-left text-xs font-medium text-[#6C757D] uppercase tracking-wider">
                      Allergies
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-[#CED4DA]">
                  {patients.map((patient, index) => (
                    <tr key={patient.id} className="hover:bg-[#F8F9FA]">
                      <td className="px-6 py-4 h-24 align-middle">
                        <div className="text-sm font-medium text-[#212529] ml-2">
                          {index + 1}
                        </div>
                      </td>
                      <td className="px-6 py-4 h-24 align-middle">
                        <div className="text-sm text-[#6C757D]">
                          {patient.firstName} {patient.lastName}
                        </div>
                      </td>
                      <td className="px-6 py-4 h-24 align-middle">
                        <div className="text-sm text-[#6C757D]">
                          {patient.dateOfBirth}
                        </div>
                      </td>
                      <td className="px-6 py-4 h-24 align-middle">
                        <div className="text-sm text-[#6C757D]">
                          {patient.gender}
                        </div>
                      </td>
                      <td className="px-6 py-4 h-24 align-middle">
                        <div className="text-sm text-[#6C757D]">
                          <div className="truncate" title={patient.email}>
                            {truncateText(patient.email)}
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-[#CED4DA]">|</span>
                            <div className="truncate" title={patient.phone}>
                              {truncateText(patient.phone)}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 h-24 align-middle">
                        <div className="text-sm text-[#6C757D]">
                          <div className="whitespace-normal break-words max-w-[200px]" title={patient.address}>
                            {truncateText(patient.address)}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 h-24 align-middle">
                        <div className="text-sm text-[#6C757D]">
                          <div className="truncate" title={patient.medicalHistory}>
                            {truncateText(patient.medicalHistory)}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 h-24 align-middle">
                        <div className="text-sm text-[#6C757D]">
                          <div className="truncate" title={patient.allergies}>
                            {truncateText(patient.allergies)}
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-lg p-16 text-center">
            <div className="max-w-md mx-auto flex flex-col items-center">
              <CiFileOn className="text-8xl text-[#64696d] mb-6" />
              <h3 className="text-2xl font-semibold text-[#212529] mb-2">
                No Patients Found
              </h3>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
