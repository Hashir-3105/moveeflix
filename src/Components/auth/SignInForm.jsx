import { useState, useEffect } from 'react';
import { useSignIn } from '@clerk/clerk-react';
import { Loader } from 'lucide-react';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';


//#8b311a

export default function SignInForm() {
    const { signIn, setActive, isLoaded } = useSignIn();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { isSignedIn } = useUser();

    useEffect(() => {
        if (isSignedIn) {
            navigate('/');
        }
    }, [isSignedIn]);

    const navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isLoaded) return;
        try {
            setLoading(true);
            const result = await signIn.create({
                identifier: email,
                password,
            });
            if (result.status === 'complete') {
                await setActive({ session: result.createdSessionId });
                navigate('/')
            }
        } catch (err) {
            const message = err.errors?.[0]?.message || 'Sign in failed';
            setError(message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-[#0b1012]">
            <form
                onSubmit={handleSubmit}
                className="bg-[#182423] text-white p-8 rounded-lg shadow-md w-full max-w-sm"
            >
                <h2 className="text-2xl font-bold mb-4 text-center">Sign In</h2>
                <div className='mb-4 text-center'>
                    <p className='font-semibold'>Welcome back</p>
                    <p className='text-[12px]'>Don't have an account? <Link className='hover:underline' to={'/sign-up'}>Sign up</Link></p>
                </div>
                {error && (
                    <div className="mb-4 text-[12px] text-center">
                        <span className='text-base text-[#c23414]'>Error</span> : {error}
                    </div>
                )}
                <div className="mb-4">
                    <label className="block mb-1">Email</label>
                    <input
                        type="email"
                        className={`w-full px-4 py-2 border  ${error && email === '' ? 'border-[#8b311a]' : 'border-[#233933]'} rounded focus:outline-none`}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-6">
                    <label className="block mb-1">Password</label>
                    <input
                        type="password"
                        className={`w-full px-4 py-2 border  ${error && password === '' ? 'border-[#8b311a]' : 'border-[#233933]'} rounded focus:outline-none`}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    {/* <div className="flex justify-end mt-2">
                        <Link to={'/reset-password'} className="cursor-pointer text-[12px] text-blue-600 hover:underline">
                            Forget Password?
                        </Link>
                    </div> */}
                </div>

                <button
                    type="submit"
                    className="w-full bg-[#111617] cursor-pointer flex justify-center items-center text-white py-2 rounded transition"
                >
                    {loading ? (
                        <div className='flex gap-2 justify-center items-center text-center'>
                            <Loader className='w-4 h-4 animate-spin text-center' />
                            <span>Logging In</span>
                        </div>
                    ) : "Sign in"}
                </button>
            </form>
        </div>
    );
}
