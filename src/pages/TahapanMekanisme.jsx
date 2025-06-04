"use client"

import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { Dropdown, Avatar, Button, DropdownItem } from "flowbite-react"
import { HiArrowSmRight, HiChartPie, HiUser } from "react-icons/hi"
import logo from "../assets/logo.png"
import fotoProfile from "../assets/foto-profile.jpeg"

export default function TahapanMekanisme() {
  const [selectedYear, setSelectedYear] = useState(2024)
  const [answers, setAnswers] = useState(Array(6).fill(null))
  const navigate = useNavigate()

  // Daftar tahun yang tersedia
  const availableYears = [2022, 2023, 2024]

  const handleAnswerChange = (index, value) => {
    const updatedAnswers = [...answers]
    updatedAnswers[index] = value
    setAnswers(updatedAnswers)
  }

  // Handler untuk mengubah tahun yang dipilih
  const handleYearChange = (year) => {
    setSelectedYear(year)
    console.log(`AMI Siklus changed to: ${year}`)
  }

  // Handler untuk logout - FUNGSIONAL (dari Dashboard)
  const handleLogout = () => {
    // Konfirmasi logout
    const confirmLogout = window.confirm("Apakah Anda yakin ingin logout?")

    if (confirmLogout) {
      console.log("Logging out...")

      // Hapus token/session dari localStorage
      localStorage.removeItem("authToken")
      localStorage.removeItem("userSession")

      // Hapus cookies jika ada
      document.cookie = "authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
      document.cookie = "userSession=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"

      // Redirect ke halaman login
      navigate("/pages/Login")

      // Optional: Reload halaman untuk clear semua state
      window.location.reload()
    }
  }

  const mechanisms = [
    "Pembukaan dan pertemuan dengan Kaprodi",
    "Pertemuan dengan staff dosen",
    "Pertemuan dengan karyawan",
    "Pertemuan dengan mahasiswa",
    "Pertemuan dengan alumni",
    "Penyampaian temuan dan penutup",
  ]

  const handleBack = () => {
    // Navigasi kembali ke dashboard
    window.history.back()
  }

  const handleSave = () => {
    console.log("Mekanisme saved:", answers)
    alert("Data mekanisme berhasil disimpan!")
  }

  return (
    <div>
      {/* Sidebar - Diambil dari Dashboard */}
      <div className="h-screen w-64 fixed top-0 left-0" style={{ backgroundColor: "#5E7D6D" }}>
        <div className="flex flex-col h-full">
          <div className="p-6 border-b border-green-500">
            <div className="flex items-center text-white">
              <img src={logo || "/placeholder.svg"} alt="Logo" className="h-10 mr-3" />
              <span className="text-xl font-bold">SIMUTU</span>
            </div>
          </div>
          <div className="flex-1 mt-8 px-4 space-y-2">
            <Link
              to="/dashboard"
              className="flex items-center px-4 py-3 text-white bg-green-600 rounded-lg cursor-pointer"
            >
              <HiChartPie className="w-5 h-5 mr-3" />
              <span>Dashboard</span>
            </Link>
            <Link
              to="/profile"
              className="flex items-center px-4 py-3 text-white hover:bg-green-600 rounded-lg cursor-pointer"
            >
              <HiUser className="w-5 h-5 mr-3" />
              <span>User Profile</span>
            </Link>
          </div>
          <div className="pb-6 px-4">
            <button
              onClick={handleLogout}
              className="flex items-center px-4 py-3 text-white hover:bg-green-600 rounded-lg cursor-pointer w-full text-left transition-colors duration-200"
            >
              <HiArrowSmRight className="w-5 h-5 mr-3" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-64 bg-gray-50 min-h-screen p-6">
        {/* Header - Diambil dari Dashboard */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <span className="text-lg font-medium text-gray-700">AMI Siklus ke:</span>
            <Dropdown
              label={selectedYear.toString()}
              dismissOnClick={true}
              style={{ backgroundColor: "#DBDBDB" }}
              className="text-black"
            >
              {availableYears.map((year) => (
                <DropdownItem
                  key={year}
                  onClick={() => handleYearChange(year)}
                  className={selectedYear === year ? "bg-gray-900 font-medium" : ""}
                >
                  {year}
                </DropdownItem>
              ))}
            </Dropdown>
          </div>
          <div className="flex items-center space-x-3">
            <Avatar img={fotoProfile} rounded size="md" alt="Huan Ajie Kusno" />
            <div className="flex flex-col">
              <div className="font-medium text-gray-900">Huan Ajie Kusno</div>
              <div className="text-sm text-gray-500">Huanajie88@gmail.com</div>
            </div>
          </div>
        </div>

        {/* Mekanisme Table */}
        <div className="max-w-4xl mx-auto mt-10 bg-white shadow rounded-lg overflow-hidden">
          <div className="text-center py-4 font-bold text-lg border-b">Mekanisme Yang Dilakukan</div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-left text-gray-900 border">
              <thead className="bg-gray-100 text-center text-gray-900 font-bold">
                <tr>
                  <th className="border px-4 py-2 w-12">No</th>
                  <th className="border px-4 py-2">Mekanisme</th>
                  <th className="border px-4 py-2 w-40">Jawaban</th>
                </tr>
              </thead>
              <tbody>
                {mechanisms.map((item, index) => (
                  <tr key={index} className="text-center bg-white">
                    <td className="border px-2 py-2">{index + 1}</td>
                    <td className="border text-left px-4 py-2">{item}</td>
                    <td className="border px-4 py-2">
                      <div className="flex items-center justify-center space-x-4">
                        <label className="inline-flex items-center">
                          <input
                            type="radio"
                            name={`answer-${index}`}
                            value="yes"
                            checked={answers[index] === "yes"}
                            onChange={() => handleAnswerChange(index, "yes")}
                            className="form-radio text-blue-600"
                          />
                          <span className="ml-2 font-semibold text-blue-700">Yes</span>
                        </label>
                        <label className="inline-flex items-center">
                          <input
                            type="radio"
                            name={`answer-${index}`}
                            value="no"
                            checked={answers[index] === "no"}
                            onChange={() => handleAnswerChange(index, "no")}
                            className="form-radio text-gray-400"
                          />
                          <span className="ml-2 font-semibold text-gray-600">No</span>
                        </label>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {/* Action Buttons */}
        <div className="flex justify-left-300 space-x-4 p-20 bg-gray-50">
          <Button
            onClick={handleSave}
            style={{ backgroundColor: "#5E7D6D", width: "200px" }}
            className="text-white font-bold py-2 rounded-lg"
          >
            Simpan
          </Button>
          <Button
            onClick={handleBack}
            style={{ backgroundColor: "#54C289", width: "200px" }}
            className="text-white font-bold py-2 rounded-lg"
          >
            Kembali
          </Button>
        </div>
      </div>
    </div>
  )
}
