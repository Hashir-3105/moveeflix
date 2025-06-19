import { useClerk } from '@clerk/clerk-react';
import { CircleUser, Loader, LogOut } from 'lucide-react';
import { useState } from 'react';

export default function SignOutCustomButton() {
    const [loading, setLoading] = useState(false);
    const { signOut } = useClerk();

    const handleSignOut = async () => {
        try {
            setLoading(true);
                await signOut();
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div
                onClick={handleSignOut}
                className="flex justify-center items-center px-4 py-2 rounded cursor-pointer transition-transform ease-in-out hover:scale-105 "
            >
                {loading ? (
                    <Loader className="w-4 h-4 animate-spin text-center" />
                ) : <CircleUser />}
            </div>
        </>
    );
}
