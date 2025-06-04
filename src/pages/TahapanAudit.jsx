"use client"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
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
  DropdownItem,
} from "flowbite-react"
import { HiArrowSmRight, HiChartPie, HiUser } from "react-icons/hi"
import logo from "../assets/logo.png"
import fotoProfile from "../assets/foto-profile.jpeg"

export default function Dashboard() {
  const [selectedYear, setSelectedYear] = useState(2024)
  const [searchQuery, setSearchQuery] = useState("")
  const navigate = useNavigate()

  // Daftar tahun yang tersedia
  const availableYears = [2022, 2023, 2024]

  // Handler untuk perubahan tahun
  const handleYearChange = (year) => {
    setSelectedYear(year)
  }

  // Handler untuk button kembali
  const handleKembali = () => {
    navigate(-1) // Kembali ke halaman sebelumnya
    // Atau bisa navigate ke halaman specific: navigate('/dashboard')
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

  // Data dummy untuk tabel
  const auditData = [
    {
      no: 1,
      perbaikan: "Cell Data",
      butirStandar: "Cell Data",
      temuanKTS: "Cell Data",
      uraianKetidaksesuaian: "Cell Data",
      tindakPerbaikan: "Cell Data",
      targetWaktu: "Cell Data",
    },
    {
      no: 2,
      perbaikan: "Cell Data",
      butirStandar: "Cell Data",
      temuanKTS: "Cell Data",
      uraianKetidaksesuaian: "Cell Data",
      tindakPerbaikan: "Cell Data",
      targetWaktu: "Cell Data",
    },
    {
      no: 3,
      perbaikan: "Cell Data",
      butirStandar: "Cell Data",
      temuanKTS: "Cell Data",
      uraianKetidaksesuaian: "Cell Data",
      tindakPerbaikan: "Cell Data",
      targetWaktu: "Cell Data",
    },
    {
      no: 5,
      perbaikan: "Cell Data",
      butirStandar: "Cell Data",
      temuanKTS: "Cell Data",
      uraianKetidaksesuaian: "Cell Data",
      tindakPerbaikan: "Cell Data",
      targetWaktu: "Cell Data",
    },
    {
      no: 6,
      perbaikan: "Cell Data",
      butirStandar: "Cell Data",
      temuanKTS: "Cell Data",
      uraianKetidaksesuaian: "Cell Data",
      tindakPerbaikan: "Cell Data",
      targetWaktu: "Cell Data",
    },
  ]

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

        {/* Dashboard Title */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Proses Audit</h1>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-3 mb-6">
          <Link to="/TahapanInputAudit">
            <Button style={{ backgroundColor: "#DC2626" }} className="text-white font-medium py-2 px-4 rounded-lg">
              Tambah Data
            </Button>
          </Link>

          <Button
            onClick={handleKembali}
            style={{ backgroundColor: "#3B82F6" }}
            className="text-white font-medium py-2 px-4 rounded-lg"
          >
            Kembali
          </Button>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-900">
          <Table hoverable>
            <TableHead>
              <TableHeadCell className="bg-gray-50 text-center font-semibold text-white border-r border-gray-200">
                No
              </TableHeadCell>
              <TableHeadCell className="bg-gray-50 text-center font-semibold text-white border-r border-gray-200">
                Perbaikan
              </TableHeadCell>
              <TableHeadCell className="bg-gray-50 text-center font-semibold text-white border-r border-gray-200">
                Butir standar
              </TableHeadCell>
              <TableHeadCell className="bg-gray-50 text-center font-semibold text-white border-r border-gray-200">
                Temuan KTS
              </TableHeadCell>
              <TableHeadCell className="bg-gray-50 text-center font-semibold text-white border-r border-gray-200">
                Uraian Ketidaksesuaian
              </TableHeadCell>
              <TableHeadCell className="bg-gray-50 text-center font-semibold text-white border-r border-gray-200">
                Tindak Perbaikan
              </TableHeadCell>
              <TableHeadCell className="bg-gray-50 text-center font-semibold text-white border-r border-gray-200">
                Target waktu Perbaikan
              </TableHeadCell>
            </TableHead>

            <TableBody className="divide-y">
              {auditData.map((item, index) => (
                <TableRow key={index} className="bg-gray-100 hover:bg-gray-50">
                  <TableCell className="text-center font-medium text-gray-900 border-r ">{item.no}</TableCell>
                  <TableCell className="text-center text-gray-700 border-r">{item.perbaikan}</TableCell>
                  <TableCell className="text-center text-gray-700 border-r">{item.butirStandar}</TableCell>
                  <TableCell className="text-center text-gray-700 border-r">{item.temuanKTS}</TableCell>
                  <TableCell className="text-center text-gray-700 border-r">{item.uraianKetidaksesuaian}</TableCell>
                  <TableCell className="text-center text-gray-700 border-r ">{item.tindakPerbaikan}</TableCell>
                  <TableCell className="text-center text-gray-700 border-r ">{item.targetWaktu}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}
