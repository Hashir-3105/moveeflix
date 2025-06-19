// import { clerk } from '@clerk/clerk-js';
// import { useState } from 'react';

// export default function ResetPassword() {
//     const [email, setEmail] = useState('');
//     const [status, setStatus] = useState('');

//     const handleReset = async () => {
//         try {
//             await clerk.sendPasswordResetEmail({ emailAddress: email });
//             setStatus('Reset link sent to your email.');
//         } catch (err) {
//             const msg = err?.errors?.[0]?.message || 'Something went wrong.';
//             setStatus(msg);
//         }
//     };

//     return (
//         <div className="h-screen flex justify-center items-center bg-gray-950">
//             <div className="bg-white p-8 rounded-md w-full max-w-sm">
//                 <h2 className="text-xl font-semibold mb-4 text-black">Reset Your Password</h2>
//                 <input
//                     className="border w-full px-3 py-2 mb-4 rounded"
//                     type="email"
//                     placeholder="Enter your email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                 />
//                 <button
//                     className="bg-blue-600 text-white px-4 py-2 rounded w-full"
//                     onClick={handleReset}
//                 >
//                     Send Reset Link
//                 </button>
//                 {status && <p className="mt-3 text-sm text-gray-700">{status}</p>}
//             </div>
//         </div>
//     );
// }
