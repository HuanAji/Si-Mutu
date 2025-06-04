"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
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
  DropdownItem
} from "flowbite-react"
import { HiArrowSmRight, HiChartPie, HiUser, HiChevronDown, HiSearch } from "react-icons/hi"
import logo from "../assets/logo.png"

export default function Dashboard() {
  const [selectedYear, setSelectedYear] = useState(2024)
  const [searchQuery, setSearchQuery] = useState("")

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
              onClick={() => {
                // Tambahkan logic logout di sini
                console.log("Logout clicked")
              }}
              className="flex items-center px-4 py-3 text-white hover:bg-green-600 rounded-lg cursor-pointer w-full text-left"
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
            <Avatar img="/api/placeholder/40/40" rounded size="md" />
            <div className="flex flex-col">
              <div className="font-medium text-gray-900">Rizqi Muborrok</div>
              <div className="text-sm text-gray-500">rizqimuborrok9@gmail.com</div>
            </div>
          </div>
        </div>

        {/* Dashboard Title and Search */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-sm-center  text-gray-900">Reset Password</h1>
            <p className="text-gray-600 m-2">Your new password must be different from previous used password</p>
        </div>

      </div>
    </div>
  )
}