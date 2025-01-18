import React from 'react'

const Signup = () => {
  const {isCheckingAuth, isSignedIn, signup} = useAuthStore()

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  })

  const[showPassword, setShowPassword] = useState(false)

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value})
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(formData)
  }

  return (
    <div>

    </div>
  )
}

export default Signup