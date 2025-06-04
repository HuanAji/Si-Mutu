"use client"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Dropdown, Avatar, Button, TextInput, Label, Select, FileInput, DropdownItem } from "flowbite-react"
import { HiArrowSmRight, HiChartPie, HiUser } from "react-icons/hi"
import logo from "../assets/logo.png"
import fotoProfile from "../assets/foto-profile.jpeg"

export default function EditProfileUser() {
  const navigate = useNavigate()
  const [selectedYear, setSelectedYear] = useState(2024)

  // Daftar tahun yang tersedia
  const availableYears = [2022, 2023, 2024]

  const [formData, setFormData] = useState({
    name: "Huan Ajie Kusno",
    Nidn: "0987654321",
    prodi: "Teknik Informatika",
    jabatan: "Staff Akademik",
    pendidikanTerakhir: "S2 (Doktor)",
    email: "Huanajie88@gmail.com",
    noHp: "08123456789",
    statusAuditor: "Auditor Internal",
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission
    console.log("Form submitted:", formData)
    // Navigate back to profile
    navigate("/profile")
  }

  const handleCancel = () => {
    navigate("/profile")
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
              className="flex items-center px-4 py-3 text-white hover:bg-green-600 rounded-lg cursor-pointer"
            >
              <HiChartPie className="w-5 h-5 mr-3" />
              <span>Dashboard</span>
            </Link>
            <Link
              to="/profile"
              className="flex items-center px-4 py-3 text-white bg-green-600 rounded-lg cursor-pointer"
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

        {/* Edit Profile Content */}
        <div className="max-w-4xl mx-auto">
          {/* Profile Header */}
          <div className="bg-white rounded-lg border border-gray-300 p-6 mb-6">
            <div className="flex items-center space-x-4">
              <Avatar img={fotoProfile} rounded size="lg" />
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{formData.name}</h2>
                <p className="text-gray-600">{formData.email}</p>
              </div>
            </div>
          </div>

          {/* Edit Form */}
          <div className="bg-white rounded-lg border border-gray-300 p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Row 1: Nama, Nidn, Prodi */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="name" value="Nama" className="text-white mb-2 block" />
                  <TextInput
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Masukkan Nama Anda"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="Nidn" value="Nidn" className="text-white mb-2 block" />
                  <TextInput
                    id="Nidn"
                    name="Nidn"
                    type="text"
                    placeholder="Masukkan Nidn Anda"
                    value={formData.Nidn}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="prodi" value="Prodi" className="text-white mb-2 block" />
                  <TextInput
                    id="prodi"
                    name="prodi"
                    type="text"
                    placeholder="Pilih Prodi Anda"
                    value={formData.prodi}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              {/* Row 2: Jabatan, Pendidikan Terakhir */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="jabatan" value="Jabatan" className="text-white mb-2 block" />
                  <Select id="jabatan" name="jabatan" value={formData.jabatan} onChange={handleInputChange} required>
                    <option value="">Pilih Jabatan Anda</option>
                    <option value="Staff Akademik">Staff Akademik</option>
                    <option value="Dosen">Dosen</option>
                    <option value="Kepala Prodi">Kepala Prodi</option>
                    <option value="Dekan">Dekan</option>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="pendidikanTerakhir" value="Pendidikan Terakhir" className="text-white mb-2 block" />
                  <TextInput
                    id="pendidikanTerakhir"
                    name="pendidikanTerakhir"
                    type="text"
                    placeholder="Masukkan Pendidikan Terakhir Anda"
                    value={formData.pendidikanTerakhir}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              {/* Row 3: Email, No. HP */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="email" value="Email" className="text-white mb-2 block" />
                  <TextInput
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Masukkan Email Anda"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="noHp" value="No. HP" className="text-white mb-2 block" />
                  <TextInput
                    id="noHp"
                    name="noHp"
                    type="tel"
                    placeholder="Masukkan Pendidikan Terakhir Anda"
                    value={formData.noHp}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              {/* Row 4: Status Auditor, Sertifikat */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="statusAuditor" value="Status Auditor" className="text-white mb-2 block" />
                  <Select
                    id="statusAuditor"
                    name="statusAuditor"
                    value={formData.statusAuditor}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Pilih Status Auditor Anda</option>
                    <option value="Auditor Internal">Auditor Internal</option>
                    <option value="Auditor Eksternal">Auditor Eksternal</option>
                    <option value="Ketua Auditor">Ketua Auditor</option>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="sertifikat" value="Sertifikat" className="text-white mb-2 block" />
                  <div className="flex space-x-2">
                    <FileInput
                      id="sertifikat"
                      name="sertifikat"
                      className="flex-1"
                      helperText="Upload Sertifikat AMI Anda"
                    />
                    <Button
                      type="button"
                      style={{ backgroundColor: "#3B82F6" }}
                      className="text-white font-medium py-2 px-4 rounded-lg"
                    >
                      Browse
                    </Button>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end space-x-4 pt-6">
                <Button
                  type="button"
                  onClick={handleCancel}
                  style={{ backgroundColor: "#5E7D6D" }}
                  className="text-white font-medium py-2 px-6 rounded-lg"
                >
                  Simpan
                </Button>
                <Button
                  type="submit"
                  style={{ backgroundColor: "#10B981" }}
                  className="text-white font-medium py-2 px-6 rounded-lg"
                >
                  Batalkan
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
