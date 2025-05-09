import { RiLockPasswordFill } from 'react-icons/ri'
import { FaCopy } from 'react-icons/fa'
import { MdOutlinePassword } from 'react-icons/md'
import { RandomPassword } from './RandomPassword'

export default function RandomPasswordSection() {
    return (
        <div className="relative min-h-screen flex flex-col justify-center items-center px-4 md:px-10 py-20">
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-900/20 to-black" />
            
            {/* Content */}
            <div className="relative z-10 w-full">
                {/* Heading Section */}
                <div className="text-center animate-slide-up">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                        🔒 Generate a Strong Password Instantly!
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto mb-12 text-lg">
                        Tired of weak and repetitive passwords? Generate a highly
                        secure password with just one click.
                    </p>
                </div>

                {/* Buttons Section */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-5xl mx-auto mb-16 animate-fade-in">
                    {/* Random & Strong */}
                    <Button icon={<RiLockPasswordFill />} text="Random & Strong" />
                    {/* Copy with One Click */}
                    <Button icon={<FaCopy />} text="Copy with One Click" />
                    {/* Stay Secure Online */}
                    <Button
                        icon={<MdOutlinePassword />}
                        text="Stay Secure Online"
                    />
                </div>

                {/* Random Password Component */}
                <div className="animate-scale-in">
                    <RandomPassword />
                </div>
            </div>
        </div>
    )
}

// Button Component with Shimmer Effect
const Button = ({ icon, text }) => (
    <button className="relative inline-flex h-14 overflow-hidden p-[1px] w-full group">
        {/* Animated Gradient Border */}
        <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
        {/* Button Content */}
        <span className="inline-flex gap-3 h-full w-full items-center justify-center bg-slate-950 px-5 py-3 text-lg md:text-xl font-medium text-white backdrop-blur-3xl transition-all duration-300 group-hover:bg-slate-900">
            <span className="text-blue-400 group-hover:text-blue-300 transition-colors duration-300">
                {icon}
            </span>
            <p className="group-hover:text-gray-200 transition-colors duration-300">
                {text}
            </p>
        </span>
    </button>
)
