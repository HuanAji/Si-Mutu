"use client"

import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { Dropdown, Avatar, DropdownItem, Label, Textarea, Button } from "flowbite-react"
import { HiArrowSmRight, HiChartPie, HiUser } from "react-icons/hi"
import logo from "../assets/logo.png"
import fotoProfile from "../assets/foto-profile.jpeg"

export default function TahapanKesimpulan() {
  const [selectedYear, setSelectedYear] = useState(2024)
  const [kesimpulan, setKesimpulan] = useState("")
  const navigate = useNavigate()

  // Daftar tahun yang tersedia
  const availableYears = [2022, 2023, 2024]

  // Mapping tahap ke route - DIPERBAIKI: sesuai dengan nama component Anda
  const tahapRoutes = {
    Mekanisme: "/TahapanMekanisme",
    Audit: "/TahapanAudit",
    Kesimpulan: "/TahapanKesimpulan",
    "Tanggal RTM": "/TahapanTanggalRTM",
    "Foto Kegiatan": "/TahapanFotoKegiatan",
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

  const handleKesimpulanChange = (e) => {
    setKesimpulan(e.target.value)
  }

  const handleSave = () => {
    console.log("Kesimpulan saved:", kesimpulan)
    alert("Kesimpulan berhasil disimpan!")
  }

  const handleBack = () => {
    // Navigasi kembali ke dashboard
    window.history.back()
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

        {/* AMi Years & Search Bar */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-sm-center text-gray-900">Kesimpulan Audit</h1>
          <p className="text-gray-600 m-2">
            Sistem dokumen cukup lengkap untuk mendukung pelaksanaan audit mutu internal dan pengelolaan mutu program
            studi
          </p>
        </div>

        {/* Text Area */}
        <div className="max-w-3xl mx-auto mb-6">
          <div className="mb-2 block">
            <Label htmlFor="kesimpulan" value="Kesimpulan Audit" className="text-gray-700 font-medium" />
          </div>
          <Textarea
            id="kesimpulan"
            className="w-full"
            placeholder="Masukkan kesimpulan audit di sini..."
            required
            rows={8}
            value={kesimpulan}
            onChange={handleKesimpulanChange}
          />
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center space-x-4 mt-6">
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
