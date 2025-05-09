import { FaInstagram, FaFacebook, FaLinkedin } from 'react-icons/fa'
import { SiGmail } from 'react-icons/si'

const socialLinks = [
    {
        icon: <SiGmail />,
        url: 'mailto:mustafareza47@gmail.com',
        color: 'hover:text-blue-500'
    },
    {
        icon: <FaLinkedin />,
        url: 'https://www.linkedin.com/in/ahmed-reza-b6926221b/',
        color: 'hover:text-blue-500',
    },
    {
        icon: <FaInstagram />,
        url: 'https://www.instagram.com/a.h_med_007/',
        color: 'hover:text-pink-500',
    },
    {
        icon: <FaFacebook />,
        url: 'https://www.facebook.com/profile.php?id=100036787094186',
        color: 'hover:text-blue-500',
    },
]

export const Footer = () => {
    return (
        <footer className="relative bg-black text-white py-16 overflow-hidden">
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-purple-900/20 to-black" />
            
            <div className="container mx-auto relative z-10">
                {/* Follow Us Section */}
                <div className="text-center animate-fade-in">
                    <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                        Follow Us
                    </h3>
                    <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-8 rounded-full"></div>
                </div>

                {/* Social Media Icons */}
                <div className="flex justify-center gap-8 mt-8">
                    {socialLinks.map((social, index) => (
                        <a
                            key={index}
                            href={social.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`text-gray-400 text-4xl md:text-5xl transition-all duration-300 transform hover:scale-110 ${social.color}`}
                        >
                            {social.icon}
                        </a>
                    ))}
                </div>

                {/* Copyright Section */}
                <div className="mt-12 text-center animate-fade-in">
                    <p className="text-gray-500 text-sm">
                        &copy; {new Date().getFullYear()} Ahmed Reza. All Rights
                        Reserved.
                    </p>
                </div>
            </div>
        </footer>
    )
}
