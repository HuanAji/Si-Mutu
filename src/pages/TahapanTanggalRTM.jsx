"use client"

import { useState, useEffect } from "react"
import { useNavigate, Link } from "react-router-dom"
import { Dropdown, Avatar, Button, DropdownItem } from "flowbite-react"
import { HiArrowSmRight, HiChartPie, HiUser, HiChevronDown } from "react-icons/hi"
import logo from "../assets/logo.png"
import fotoProfile from "../assets/foto-profile.jpeg"

export default function TahapanTanggalRTM() {
  const [selectedYear, setSelectedYear] = useState(2024)
  const [selectedMonth, setSelectedMonth] = useState("June")
  const [selectedDate, setSelectedDate] = useState(7)
  const [calendarYear, setCalendarYear] = useState(2024)

  const navigate = useNavigate()
  // Daftar tahun yang tersedia
  const availableYears = [2022, 2023, 2024]

  useEffect(() => {
    const daysInCurrentMonth = getDaysInMonth(selectedMonth, calendarYear)
    const maxDay = Math.max(...daysInCurrentMonth.filter((day) => day !== null))
    if (selectedDate > maxDay) {
      setSelectedDate(maxDay)
    }
  }, [selectedMonth, calendarYear])

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  const years = [2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030]

  // Generate calendar days for the selected month
  const getDaysInMonth = (month, year) => {
    const monthIndex = months.indexOf(month)
    const firstDay = new Date(year, monthIndex, 1)
    const lastDay = new Date(year, monthIndex + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()

    const days = []

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null)
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day)
    }

    return days
  }

  const days = getDaysInMonth(selectedMonth, calendarYear)
  const dayNames = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]

  const handleDateClick = (day) => {
    if (day) {
      setSelectedDate(day)
    }
  }

  const formatSelectedDate = () => {
    const monthIndex = months.indexOf(selectedMonth) + 1
    const formattedMonth = monthIndex.toString().padStart(2, "0")
    const formattedDay = selectedDate.toString().padStart(2, "0")
    return `${formattedDay}-${formattedMonth}-${calendarYear}`
  }

  const handleSave = () => {
    console.log("Tanggal RTM saved:", formatSelectedDate())
    alert("Tanggal RTM berhasil disimpan!")
  }

  const handleBack = () => {
    // Navigasi kembali ke dashboard
    window.history.back()
  }

  const handleCalendarYearChange = (year) => {
    setCalendarYear(year)
    // Reset selected date jika tanggal yang dipilih tidak ada di bulan/tahun baru
    const daysInNewMonth = getDaysInMonth(selectedMonth, year)
    const maxDay = Math.max(...daysInNewMonth.filter((day) => day !== null))
    if (selectedDate > maxDay) {
      setSelectedDate(1)
    }
  }

  const handleMonthChange = (month) => {
    setSelectedMonth(month)
    // Reset selected date jika tanggal yang dipilih tidak ada di bulan baru
    const daysInNewMonth = getDaysInMonth(month, calendarYear)
    const maxDay = Math.max(...daysInNewMonth.filter((day) => day !== null))
    if (selectedDate > maxDay) {
      setSelectedDate(1)
    }
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

        {/* Title */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Input Tanggal RTM</h1>
        </div>

        {/* Calendar Container */}
        <div className="flex justify-center">
          <div className="bg-white rounded-lg border border-gray-300 p-6 shadow-sm" style={{ width: "400px" }}>
            {/* Month and Year Dropdowns */}
            <div className="flex space-x-4 mb-6">
              <div className="flex-1">
                <Dropdown
                  label={selectedMonth}
                  dismissOnClick={true}
                  renderTrigger={() => (
                    <button className="w-full flex items-center justify-between px-3 py-2 text-gray-700 bg-green-100 border border-gray-300 rounded-lg hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-green-500">
                      <span>{selectedMonth}</span>
                      <HiChevronDown className="w-4 h-4" />
                    </button>
                  )}
                >
                  {months.map((month) => (
                    <Dropdown.Item key={month} onClick={() => handleMonthChange(month)}>
                      {month}
                    </Dropdown.Item>
                  ))}
                </Dropdown>
              </div>
              <div className="flex-1">
                <Dropdown
                  label={calendarYear.toString()}
                  dismissOnClick={true}
                  renderTrigger={() => (
                    <button className="w-full flex items-center justify-between px-3 py-2 text-gray-700 bg-green-100 border border-gray-300 rounded-lg hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-green-500">
                      <span>{calendarYear}</span>
                      <HiChevronDown className="w-4 h-4" />
                    </button>
                  )}
                >
                  {years.map((year) => (
                    <Dropdown.Item key={year} onClick={() => handleCalendarYearChange(year)}>
                      {year}
                    </Dropdown.Item>
                  ))}
                </Dropdown>
              </div>
            </div>

            {/* Calendar Grid */}
            <div className="mb-6">
              {/* Day Headers */}
              <div className="grid grid-cols-7 gap-1 mb-2">
                {dayNames.map((dayName) => (
                  <div key={dayName} className="text-center text-sm font-medium text-gray-600 py-2">
                    {dayName}
                  </div>
                ))}
              </div>

              {/* Calendar Days */}
              <div className="grid grid-cols-7 gap-1">
                {days.map((day, index) => (
                  <button
                    key={index}
                    onClick={() => handleDateClick(day)}
                    disabled={!day}
                    className={`
                      h-10 w-10 text-sm rounded-lg flex items-center justify-center
                      ${
                        !day
                          ? "cursor-default"
                          : day === selectedDate
                            ? "bg-green-600 text-white font-semibold"
                            : "hover:bg-gray-100 text-gray-700"
                      }
                    `}
                  >
                    {day}
                  </button>
                ))}
              </div>
            </div>

            {/* Date Input and Save Button */}
            <div className="flex space-x-3">
              <input
                type="text"
                value={formatSelectedDate()}
                readOnly
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-700 text-center"
              />
              <Button
                onClick={handleSave}
                style={{ backgroundColor: "#5E7D6D" }}
                className="px-6 py-2 text-white font-medium rounded-lg"
              >
                Simpan
              </Button>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center space-x-4 mt-6">
          <Button
            onClick={handleBack}
            style={{ backgroundColor: "#54C289" }}
            className="text-white font-bold py-2 px-6 rounded-lg"
          >
            Kembali
          </Button>
        </div>
      </div>
    </div>
  )
}
