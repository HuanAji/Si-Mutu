"use client"

import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { HiArrowSmRight, HiChartPie, HiUser, HiSearch } from "react-icons/hi"
import { Dropdown, Avatar, DropdownItem } from "flowbite-react"
import logo from "../assets/logo.png"
import fotoProfile from "../assets/foto-profile.jpeg"

export default function InputDataAudit() {
  const navigate = useNavigate()
  const [selectedYear, setSelectedYear] = useState(2024)
  const [formData, setFormData] = useState({
    butirStandar: "",
    temuanKTS: "",
    uriainKetidaksesuaian: "",
    targetWaktuPerbaikan: "",
  })

  // Daftar tahun yang tersedia
  const availableYears = [2022, 2023, 2024]

  // Handler untuk mengubah tahun yang dipilih
  const handleYearChange = (year) => {
    setSelectedYear(year)
    console.log(`AMI Siklus changed to: ${year}`)
  }

  // Handler untuk logout - FUNGSIONAL
  const handleLogout = () => {
    const confirmLogout = window.confirm("Apakah Anda yakin ingin logout?")

    if (confirmLogout) {
      console.log("Logging out...")
      localStorage.removeItem("authToken")
      localStorage.removeItem("userSession")
      document.cookie = "authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
      document.cookie = "userSession=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
      navigate("/pages/Login")
      window.location.reload()
    }
  }

  // Handler untuk mengubah form data
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  // Handler untuk menyimpan data
  const handleSimpan = () => {
    console.log("Data yang akan disimpan:", formData)
    alert("Data berhasil disimpan!")
  }

  // Handler untuk kembali
  const handleKembali = () => {
    console.log("Kembali ke halaman sebelumnya")
  }

  return (
    <div>
      {/* Sidebar - Diubah sesuai dashboard */}
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
              className="flex items-center px-4 py-3 text-white hover:bg-green-600 rounded-lg cursor-pointer"
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
        {/* Header - Diubah sesuai dashboard */}
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

        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 text-center">Input data audit</h1>
        </div>

        {/* Form - Bagian ini tidak diubah */}
        <div className="bg-white rounded-lg border border-gray-300 p-8 max-w-4xl mx-auto">
          <div className="space-y-6">
            {/* Butir Standar */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Butir standar</label>
              <select
                value={formData.butirStandar}
                onChange={(e) => handleInputChange("butirStandar", e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="">Pilih Butir Standar</option>
                <option value="standar1">Standar 1 - Visi, Misi, Tujuan dan Strategi</option>
                <option value="standar2">Standar 2 - Tata Pamong, Tata Kelola dan Kerjasama</option>
                <option value="standar3">Standar 3 - Mahasiswa</option>
                <option value="standar4">Standar 4 - Sumber Daya Manusia</option>
                <option value="standar5">Standar 5 - Keuangan, Sarana dan Prasarana</option>
                <option value="standar6">Standar 6 - Pendidikan</option>
                <option value="standar7">Standar 7 - Penelitian</option>
                <option value="standar8">Standar 8 - Pengabdian kepada Masyarakat</option>
                <option value="standar9">Standar 9 - Luaran dan Capaian Tridharma</option>
              </select>
            </div>

            {/* Temuan KTS */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Temuan KTS</label>
              <select
                value={formData.temuanKTS}
                onChange={(e) => handleInputChange("temuanKTS", e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="">Pilih KTS</option>
                <option value="observasi">Observasi</option>
                <option value="minor">KTS Minor</option>
                <option value="mayor">KTS Mayor</option>
              </select>
            </div>

            {/* Uraian Ketidaksesuaian */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Uraian ketidaksesuaian :</label>
              <textarea
                value={formData.uriainKetidaksesuaian}
                onChange={(e) => handleInputChange("uriainKetidaksesuaian", e.target.value)}
                placeholder="Masukkan uraian ketidaksesuaian..."
                rows={8}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
              />
            </div>

            {/* Target Waktu Perbaikan */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Target waktu perbaikan (boleh diisi nanti)
              </label>
              <input
                type="text"
                value={formData.targetWaktuPerbaikan}
                onChange={(e) => handleInputChange("targetWaktuPerbaikan", e.target.value)}
                placeholder="Target waktu perbaikan"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-4 mt-8">
            <button
              onClick={handleKembali}
              style={{ backgroundColor: "#5E7D6D" }}
              className="text-white font-medium py-2 px-6 rounded-lg hover:opacity-90 transition-opacity"
            >
              Kembali
            </button>
            <button
              onClick={handleSimpan}
              style={{ backgroundColor: "#4ADE80" }}
              className="text-white font-medium py-2 px-6 rounded-lg hover:opacity-90 transition-opacity"
            >
              Simpan
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}