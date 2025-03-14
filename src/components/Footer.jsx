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
        <footer className="bg-black text-white text-center py-10">
            <div className="container mx-auto">
                {/* Follow Us Section */}
                <h3 className="text-2xl font-semibold mb-3">Follow Us</h3>
                <div className="w-16 mx-auto h-1 bg-indigo-500 mb-6"></div>

                {/* Social Media Icons */}
                <div className="flex justify-center gap-6 mt-6">
                    {socialLinks.map((social, index) => (
                        <a
                            key={index}
                            href={social.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`text-gray-400 text-4xl md:text-5xl transition duration-300 ${social.color}`}
                        >
                            {social.icon}
                        </a>
                    ))}
                </div>

                {/* Copyright Section */}
                <p className="text-gray-500 text-sm mt-10">
                    &copy; {new Date().getFullYear()} Ahmed Reza. All Rights
                    Reserved.
                </p>
            </div>
        </footer>
    )
}
