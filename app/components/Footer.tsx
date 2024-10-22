import React from 'react';
import { useTheme } from '@/contexts/theme-context';
import { FaGithub } from "react-icons/fa";
import Link from "next/link";

const Footer: React.FC = () => {
  const { isDarkTheme } = useTheme();

  return (
    <div className={`w-full ${isDarkTheme ? 'bg-dark-theme-bg text-white' : 'bg-light-gray text-black'}`}>
      {/* Full-width background */}
      <div className="w-full px-4 py-4 flex flex-col items-center space-y-2 sm:space-y-0 sm:flex-row sm:justify-between">
        {/* Link Container */}
        <div className="flex flex-col items-center space-y-2 sm:flex-row sm:space-y-0 sm:space-x-4">
          <span>
            © 2024&nbsp;
            <a className="hover:underline" href={process.env.NEXT_FUTURAMA_URL}>
              helios.gallery
            </a>
          </span>
          <Link href="/privacy" legacyBehavior>
            <a className="hover:underline">Privacy Policy</a>
          </Link>
          <Link href="/tos" legacyBehavior>
            <a className="hover:underline">Terms of Service</a>
          </Link>
        </div>

        {/* GitHub Icon */}
        <div className="flex justify-center mt-2 sm:mt-0">
          <Link href="https://github.com/GMIC-Helios-Team/" legacyBehavior>
            <a className="hover:text-gray-300">
              <FaGithub size={30} />
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;


