"use client"

import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { Dropdown, Avatar, FileInput, Button, DropdownItem } from "flowbite-react"
import { HiArrowSmRight, HiChartPie, HiUser, HiOutlineTrash, HiCheck } from "react-icons/hi"
import logo from "../assets/logo.png"
import fotoProfile from "../assets/foto-profile.jpeg"

export default function TahapanFotoKegiatan() {
  const navigate = useNavigate()
  const [selectedYear, setSelectedYear] = useState(2024)
  const [files, setFiles] = useState([
    { name: "Laporan_Audit.pdf", progress: 80, size: "5.55 MB", status: "uploading" },
    { name: "Pertemuan_dengan_mahasiswa.jpg", progress: 40, size: "8.77 MB", status: "uploading" },
    { name: "Pertemuan_dengan_kaprodi.jpg", progress: 100, size: "", status: "complete" },
    { name: "rapat_bersamat.jpg", progress: 100, size: "", status: "complete" },
  ])

  // Daftar tahun yang tersedia
  const availableYears = [2022, 2023, 2024]

  const handleFileChange = (e) => {
    const newFile = e.target.files[0]
    if (newFile) {
      const newFileObj = {
        name: newFile.name,
        progress: 0,
        size: `${(newFile.size / (1024 * 1024)).toFixed(2)} MB`,
        status: "uploading",
      }
      setFiles((prev) => [...prev, newFileObj])

      // Simulasi progress upload
      let progress = 0
      const interval = setInterval(() => {
        progress += 10
        if (progress <= 100) {
          setFiles((prev) =>
            prev.map((file) =>
              file.name === newFileObj.name
                ? { ...file, progress, status: progress === 100 ? "complete" : "uploading" }
                : file,
            ),
          )
        }
        if (progress >= 100) {
          clearInterval(interval)
        }
      }, 200)
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

  const handleDeleteFile = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSave = () => {
    // Logic untuk menyimpan data
    console.log("Data saved:", files)
    alert("Data berhasil disimpan!")
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

        {/* Upload Area - Konten asli TahapanFotoKegiatan tetap dipertahankan */}
        <div className="max-w-2xl mx-auto mt-10 bg-white shadow rounded-lg overflow-hidden">
          <div className="text-center py-2 font-bold text-lg border-b">Upload Foto Kegiatan</div>

          <div className="p-6">
            <h3 className="text-lg font-semibold mb-2">Upload files</h3>

            <label
              htmlFor="dropzone-file"
              className="block border-2 border-dashed border-gray-300 rounded-lg p-12 mb-4 text-center cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors"
            >
              <div className="text-gray-500 flex flex-col items-center">
                <svg className="w-12 h-12 mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                  />
                </svg>
                <p className="text-lg font-medium mb-2">Click to upload</p>
                <p className="text-sm text-gray-400">atau drag and drop file di sini</p>
              </div>
              <FileInput id="dropzone-file" className="hidden" onChange={handleFileChange} multiple />
            </label>

            <div className="flex space-x-4 text-sm text-gray-500 mb-6">
              <span className="bg-gray-100 px-2 py-1 rounded">PDF</span>
              <span className="bg-gray-100 px-2 py-1 rounded">PNG</span>
              <span className="bg-gray-100 px-2 py-1 rounded">JPG</span>
              <span className="bg-gray-100 px-2 py-1 rounded">JPEG</span>
              <span className="text-gray-400">• Max 100 MB per file</span>
            </div>

            {/* File List */}
            {files.length > 0 && (
              <div className="border border-gray-200 rounded-lg mb-6">
                <div className="bg-gray-50 px-4 py-2 border-b border-gray-200">
                  <h4 className="font-medium text-gray-900">Files Uploaded ({files.length})</h4>
                </div>
                {files.map((file, index) => (
                  <div
                    key={index}
                    className="border-b border-gray-200 last:border-b-0 p-4 flex items-center justify-between"
                  >
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{file.name}</p>
                      {file.status === "uploading" ? (
                        <div className="flex items-center space-x-2 text-xs text-gray-500 mt-1">
                          <span>{file.progress}% Uploading</span>
                          <span>{file.size}</span>
                        </div>
                      ) : (
                        <p className="text-xs text-green-600 mt-1">Upload complete</p>
                      )}
                    </div>

                    {file.status === "uploading" ? (
                      <div className="flex items-center space-x-3">
                        <div className="w-32 bg-gray-200 h-2 rounded-full">
                          <div
                            className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${file.progress}%` }}
                          ></div>
                        </div>
                        <button
                          onClick={() => handleDeleteFile(index)}
                          className="text-gray-400 hover:text-red-500 transition-colors"
                        >
                          <span className="text-xl">×</span>
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => handleDeleteFile(index)}
                          className="text-red-500 hover:text-red-700 transition-colors"
                        >
                          <HiOutlineTrash className="w-5 h-5" />
                        </button>
                        <div className="flex items-center justify-center w-6 h-6 rounded-full bg-green-100">
                          <HiCheck className="w-4 h-4 text-green-500" />
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons - Konten asli TahapanFotoKegiatan tetap dipertahankan */}
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
