import React, { useState } from 'react'
import { useSignUp } from '@clerk/clerk-react'
import { useNavigate } from 'react-router-dom'

const CustomSignUp = () => {
  const { signUp, setActive, isLoaded } = useSignUp()
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [code, setCode] = useState('')
  const [pendingVerification, setPendingVerification] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      await signUp.create({
        emailAddress: email,
        password,
        firstName,
        lastName,
      })
      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' })
      setPendingVerification(true)
    } catch (err) {
      setError(err.errors?.[0]?.message || 'Signup failed')
    }
  }

  const handleVerify = async (e) => {
    e.preventDefault()
    setError('')
    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({ code })
      if (completeSignUp.status === 'complete') {
        await setActive({ session: completeSignUp.createdSessionId })
        navigate('/')
      }
    } catch (err) {
      setError(err.errors?.[0]?.message || 'Verification failed')
    }
  }

  if (!isLoaded) return null

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4 text-center">
          {pendingVerification ? 'Verify Your Email' : 'Create an Account'}
        </h2>
        {error && <p className="text-red-500 mb-3 text-sm">{error}</p>}

        {!pendingVerification ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="First Name"
              className="w-full px-4 py-2 border rounded"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Last Name"
              className="w-full px-4 py-2 border rounded"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-2 border rounded"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-2 border rounded"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            >
              Sign Up
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerify} className="space-y-4">
            <input
              type="text"
              placeholder="Enter verification code"
              className="w-full px-4 py-2 border rounded"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              required
            />
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
            >
              Verify Email
            </button>
          </form>
        )}
      </div>
    </div>
  )
}

export default CustomSignUp
