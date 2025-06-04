"use client"

import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { Dropdown, Avatar, Table, TableBody, TableCell, TableRow, Button, DropdownItem } from "flowbite-react"
import { HiArrowSmRight, HiChartPie, HiUser } from "react-icons/hi"
import logo from "../assets/logo.png"
import fotoProfile from "../assets/foto-profile.jpeg"

export default function ProfileUser() {
  const [selectedYear, setSelectedYear] = useState(2024)
  const navigate = useNavigate()

  // Daftar tahun yang tersedia
  const availableYears = [2022, 2023, 2024]

  const [user] = useState({
    name: "Huan Ajie Kusno",
    email: "Huanajie88@gmail.com",
    Nidn: "0987654321",
    prodi: "Teknik Informatika",
    jabatan: "Staff Akademik",
    pendidikan: "S2 (Doktor)",
    noHp: "08123456789",
    statusAuditor: "Auditor Internal",
    sertifikat: "Aktif Verified",
  })

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

        {/* Profile Content */}
        <div className="max-w-3xl mx-auto">
          {/* Profile Header */}
          <div className="bg-white rounded-lg border border-gray-300 p-6 mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Avatar img={fotoProfile} rounded size="lg" />
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{user.name}</h2>
                  <p className="text-gray-600">{user.email}</p>
                </div>
              </div>
              <div className="flex space-x-3">
                <Link to="/ResetPassword">
                  <Button
                    style={{ backgroundColor: "#DC2626" }}
                    className="text-white font-medium py-2 px-4 rounded-lg"
                  >
                    Change Password
                  </Button>
                </Link>

                <Link to="/EditProfileUser">
                  <Button
                    style={{ backgroundColor: "#3B82F6" }}
                    className="text-white font-medium py-2 px-4 rounded-lg"
                  >
                    Edit
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* User Information Table */}
          <div className="bg-white rounded-lg border border-gray-300 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
              <h3 className="text-lg font-semibold text-gray-900">Users Information</h3>
            </div>
            <div className="overflow-x-auto">
              <Table>
                <TableBody className="divide-y">
                  <TableRow className="bg-white">
                    <TableCell className="font-medium text-gray-900 bg-gray-50 w-1/3">Nama</TableCell>
                    <TableCell className="text-gray-900">{user.name}</TableCell>
                  </TableRow>
                  <TableRow className="bg-white">
                    <TableCell className="font-medium text-gray-900 bg-gray-50">Nidn</TableCell>
                    <TableCell className="text-gray-900">{user.Nidn}</TableCell>
                  </TableRow>
                  <TableRow className="bg-white">
                    <TableCell className="font-medium text-gray-900 bg-gray-50">Prodi</TableCell>
                    <TableCell className="text-gray-900">{user.prodi}</TableCell>
                  </TableRow>
                  <TableRow className="bg-white">
                    <TableCell className="font-medium text-gray-900 bg-gray-50">Jabatan Akademik</TableCell>
                    <TableCell className="text-gray-900">{user.jabatan}</TableCell>
                  </TableRow>
                  <TableRow className="bg-white">
                    <TableCell className="font-medium text-gray-900 bg-gray-50">Pendidikan Terakhir</TableCell>
                    <TableCell className="text-gray-900">{user.pendidikan}</TableCell>
                  </TableRow>
                  <TableRow className="bg-white">
                    <TableCell className="font-medium text-gray-900 bg-gray-50">Email</TableCell>
                    <TableCell className="text-gray-900">{user.email}</TableCell>
                  </TableRow>
                  <TableRow className="bg-white">
                    <TableCell className="font-medium text-gray-900 bg-gray-50">No. HP</TableCell>
                    <TableCell className="text-gray-900">{user.noHp}</TableCell>
                  </TableRow>
                  <TableRow className="bg-white">
                    <TableCell className="font-medium text-gray-900 bg-gray-50">Status Auditor</TableCell>
                    <TableCell className="text-gray-900">{user.statusAuditor}</TableCell>
                  </TableRow>
                  <TableRow className="bg-white">
                    <TableCell className="font-medium text-gray-900 bg-gray-50">Sertifikat</TableCell>
                    <TableCell>
                      <span className="px-3 py-1 text-blue-700 bg-blue-100 rounded-md text-sm">{user.sertifikat}</span>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
