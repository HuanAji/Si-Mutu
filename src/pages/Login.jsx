"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { TextInput, Button } from "flowbite-react"

import logo from "../assets/logo.png"
import Logo from "../assets/logo.png"
import bgLogin from "../assets/bg-login.jpg"

export default function Login() {
  const [nidnUsername, setNidnUsername] = useState("")
  const [password, setPassword] = useState("")
  const [rememberMe, setRememberMe] = useState(false)
  const navigate = useNavigate()

  const handleLogin = (e) => {
    e.preventDefault()
    if (nidnUsername === "admin" && password === "0987654321") {
      navigate("/dashboard")
    } else {
      alert("NIDN atau password salah!")
    }
  }

    // Mapping tahap ke route - DIPERBAIKI: sesuai dengan nama component Anda
  const tahapRoutes = {
    Mekanisme: "/ResetPassword",
  }

  return (
    <div className="flex h-screen">
      {/* Kiri: Logo dan Deskripsi */}
      <div
        className="w-3/3 flex flex-col justify-center items-center px-12 relative text-white"
        style={{
          backgroundImage: `url(${bgLogin})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 opacity-70"></div>

        {/* Konten */}
        <div className="z-10 flex flex-col items-center max-w-md">
          {/* Logo */}
          <div className="flex justify-center items-center mb-6">
            <img src={Logo || "/placeholder.svg"} alt="UNUGIRI Logo" className="h-88" />
          </div>


          {/* Tagline */}
          <h1 className="text-3xl font-bold text-center mb-4">Meningkatkan Efektivitas Audit</h1>

          {/* Deskripsi */}
          <p className="text-3-1 text-center text-sm leading-relaxed">
            Membantu auditor dan auditi dalam mengelola audit mutu secara sistematis dan efektif, melalui pendekatan digital yang meningkatkan akurasi, mempercepat proses, serta memperkuat keandalan data dalam mendukung pengambilan keputusan.
          </p>
        </div>
      </div>

      {/* Kanan: Form Login */}
      <div className="w-3/5 flex items-center justify-center px-12 bg-white">
        

        {/* Login Form */}
        <div className="w-full max-w-md">
          {/* SIMUTU Header */}
        <div className="absolute top-8 flex items-center">
          <img src={logo || "/placeholder.svg"} alt="SIMUTU Logo" className="h-8 mr-2" />
          <span className="text-xl font-bold text-gray-800">SIMUTU</span>
        </div>
          <h2 className="text-4xl font-bold text-gray-800 mb-2">Login</h2>
          <p className="text-gray-500 mb-6">Please enter your NIDN and Password</p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <TextInput
                id="nidn"
                type="text"
                placeholder="Enter Your NIDN"
                value={nidnUsername}
                onChange={(e) => setNidnUsername(e.target.value)}
                required
                className="w-full"
                sizing="lg"
                color="red"
              />
            </div>

            <div>
              <TextInput
                id="password"
                type="password"
                placeholder="Enter Your Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full"
                sizing="lg"
                color="white"
              />
            </div>

            {/* Remember me and Forgot password */}
            <div className="flex items-center justify-between mt-2">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="remember"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                />
                <label htmlFor="remember" className="ml-2 text-sm text-gray-600">
                  Keep me logged in
                </label>
              </div>
              <a href="/ResetPassword" className="text-sm text-green-600 hover:text-green-700">
                Forgot password?
              </a>
            </div>

            <Button
              type="submit"
              style={{ backgroundColor: "#5E7D6D" }}
              className="w-full text-white font-medium py-7 mt-4"
            >
              Login
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
