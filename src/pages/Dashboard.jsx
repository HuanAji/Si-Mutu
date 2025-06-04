"use client"

import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import {
  Dropdown,
  Avatar,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
  Button,
  TextInput,
  DropdownItem,
} from "flowbite-react"
import { HiArrowSmRight, HiChartPie, HiUser, HiSearch } from "react-icons/hi"
import logo from "../assets/logo.png"
import fotoProfile from "../assets/foto-profile.jpeg"

export default function Dashboard() {
  const navigate = useNavigate()
  const [selectedYear, setSelectedYear] = useState(2024)
  const [searchQuery, setSearchQuery] = useState("")

  // Daftar tahun yang tersedia
  const availableYears = [2022, 2023, 2024]

  // Mapping tahap ke route
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

  // Handler untuk logout - FUNGSIONAL
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

  // Handler untuk print
  const handlePrint = () => {
    window.print()
  }

  return (
    <div>
      {/* Sidebar */}
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
        {/* Header */}
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

        {/* Dashboard Title and Search */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Dashboard</h1>
            <p className="text-gray-500">Welcome to Dashboard Auditor SIMUTU</p>
          </div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <HiSearch className="w-5 h-5 text-gray-400" />
            </div>
            <TextInput
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-80"
              color="white"
            />
          </div>
        </div>

        {/* Tables */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Proses Audit */}
          <div className="bg-white rounded-lg border border-gray-300 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
              <h3 className="text-lg font-semibold text-gray-900 text-center">Proses Audit</h3>
            </div>
            <div className="overflow-x-auto">
              <Table>
                <TableHead>
                  <TableRow>
                    <TableHeadCell className="bg-gray-50 text-center">Tahapan</TableHeadCell>
                    <TableHeadCell className="bg-gray-50 text-center">Action</TableHeadCell>
                    <TableHeadCell className="bg-gray-50 text-center">Keterangan</TableHeadCell>
                  </TableRow>
                </TableHead>
                <TableBody className="divide-y">
                  {Object.entries(tahapRoutes).map(([tahap, route], idx) => (
                    <TableRow key={idx} className="bg-white">
                      <TableCell className="font-medium text-gray-900 text-center">{tahap}</TableCell>
                      <TableCell className="text-center">
                        <Link
                          to={route}
                          className="inline-block px-3 py-1 text-white bg-blue-500 rounded-md text-sm hover:bg-blue-600 transition-colors duration-200 no-underline"
                        >
                          Edit
                        </Link>
                      </TableCell>
                      <TableCell className="text-center">
                        <span
                          className={`px-3 py-1 text-white rounded-md text-sm ${tahap === "Mekanisme" ? "bg-[#5E7D6D]" : "bg-red-500"}`}
                        >
                          {tahap === "Mekanisme" ? "Selesai" : "Proses"}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>

          {/* Informasi Audit */}
          <div className="bg-white rounded-lg border border-gray-300 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
              <h3 className="text-lg font-semibold text-gray-900 text-center">Informasi Audit</h3>
            </div>
            <div className="overflow-x-auto">
              <Table>
                <TableBody className="divide-y">
                  <TableRow className="bg-white">
                    <TableCell className="font-medium text-gray-900 bg-gray-50">Prodi</TableCell>
                    <TableCell className="text-gray-900">Teknik Informatika</TableCell>
                  </TableRow>
                  <TableRow className="bg-white">
                    <TableCell className="font-medium text-gray-900 bg-gray-50">Fakultas</TableCell>
                    <TableCell className="text-gray-900">Sains dan Teknologi</TableCell>
                  </TableRow>
                  <TableRow className="bg-white">
                    <TableCell className="font-medium text-gray-900 bg-gray-50">Ketua Auditor</TableCell>
                    <TableCell className="text-gray-900">Sains dan Teknologi</TableCell>
                  </TableRow>
                  <TableRow className="bg-white">
                    <TableCell className="font-medium text-gray-900 bg-gray-50">Anggota</TableCell>
                    <TableCell className="text-gray-900">Sains dan Teknologi</TableCell>
                  </TableRow>
                  <TableRow className="bg-white">
                    <TableCell className="font-medium text-gray-900 bg-gray-50">Siklus</TableCell>
                    <TableCell>
                      <span className="px-3 py-1 text-blue-700 bg-blue-100 rounded-md text-sm">{selectedYear}</span>
                    </TableCell>
                  </TableRow>
                  <TableRow className="bg-white">
                    <TableCell className="font-medium text-gray-900 bg-gray-50">Status Akhir</TableCell>
                    <TableCell>
                      <span className="px-3 py-1 text-red-700 bg-red-100 rounded-md text-sm">Proses</span>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>
        </div>

        {/* Print Button */}
        <div className="flex justify-start">
          <Button
            style={{ backgroundColor: "#5E7D6D" }}
            className="text-white font-medium py-2 px-6 rounded-lg flex items-center hover:opacity-90 transition-opacity duration-200"
            onClick={handlePrint}
          >
            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M5 4v3H4a2 2 0 00-2 2v3a2 2 0 002 2h1v2a2 2 0 002 2h6a2 2 0 002-2v-2h1a2 2 0 002-2V9a2 2 0 00-2-2h-1V4a2 2 0 00-2-2H7a2 2 0 00-2 2zm8 0H7v3h6V4zM5 14H4v-2h1v2zm1 0v2h6v-2H6zm9 0h1v-2h-1v2z"
                clipRule="evenodd"
              />
            </svg>
            Print laporan AMI
          </Button>
        </div>
      </div>
    </div>
  )
}
