import { HeroSection } from '@/components/HeroSection'
import { Navbar } from '@/components/Navbar'

import RandomPasswordSection from '@/components/RandomPasswordSection'
import { Footer } from '@/components/Footer'
import Dashboard from '@/components/Dashboard'

export default async function Home() {
    return (
        <div className="bg-black text-white">
            {/* Navbar */}
            <Navbar />

            {/* Hero Section */}
            <HeroSection />

            {/* Random Password Section */}
            <RandomPasswordSection />

            {/* Save Password Section */}
            <Dashboard />

            {/* Footer */}
            <Footer />
        </div>
    )
}
