import { useState } from 'react'; 
import { toast } from 'react-hot-toast'
const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });


  const validateform = () => {
    const { email, password} = formData
    if(!email || !password ) return toast.error('Please fill all fields')
    return true
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if(!validateform()) return
    setIsLoggingIn(true);
    // Add your login logic here
  };

  return (
    <div className="min-h-screen flex bg-gray-900">
      {/* Left Section - Login Form */}
      <div className="w-1/2 flex items-center justify-center p-8">
        <div className="max-w-md w-full space-y-8 p-8 bg-gray-800 rounded-lg shadow-xl">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
              Sign in to your account
            </h2>
            <p className="mt-2 text-center text-sm text-gray-400">
              Don&apos;t have an account?{' '}
              <a href="/signup" className="font-medium text-indigo-400 hover:text-indigo-300">
                Sign up
              </a>
            </p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="rounded-md shadow-sm space-y-4">
              <div>
                <label htmlFor="email" className="sr-only">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-600 bg-gray-700 placeholder-gray-400 text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Email address"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-600 bg-gray-700 placeholder-gray-400 text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="show-password"
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-600 rounded bg-gray-700"
                  onChange={() => setShowPassword(!showPassword)}
                />
                <label htmlFor="show-password" className="ml-2 block text-sm text-gray-300">
                  Show password
                </label>
              </div>
              <div className="text-sm">
                <a href="/forgot-password" className="font-medium text-indigo-400 hover:text-indigo-300">
                  Forgot your password?
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoggingIn}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500 disabled:opacity-50"
              >
                {isLoggingIn ? 'Signing in...' : 'Sign in'}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Right Section - Promotional Content */}
      <div className="w-1/2 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 flex flex-col items-center justify-center p-8 text-white">
        <div className="max-w-lg space-y-8">
          <h1 className="text-5xl font-bold mb-6">
            Welcome Back to the Future
          </h1>
          
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="bg-white/10 p-3 rounded-full">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-semibold">Real-time Updates</h3>
                <p className="text-white/80">Never miss an important conversation</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="bg-white/10 p-3 rounded-full">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-semibold">Smart Collaboration</h3>
                <p className="text-white/80">Work seamlessly with your team</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="bg-white/10 p-3 rounded-full">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-semibold">Analytics Dashboard</h3>
                <p className="text-white/80">Track your performance metrics</p>
              </div>
            </div>
          </div>

          <div className="pt-8">
            <div className="p-4 bg-white/10 rounded-lg">
              <p className="italic text-white/90">&quot;This platform has transformed how we handle our AI communications. Absolutely game-changing!&quot;</p>
              <div className="mt-4 flex items-center space-x-3">
                <img className="w-10 h-10 rounded-full border-2 border-white" src="https://randomuser.me/api/portraits/women/1.jpg" alt="Testimonial author" />
                <div>
                  <p className="font-semibold">Sarah Johnson</p>
                  <p className="text-sm text-white/80">Tech Lead, InnovateCo</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
