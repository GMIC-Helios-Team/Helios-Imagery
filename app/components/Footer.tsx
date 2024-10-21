import React from 'react';
import { useTheme } from '@/contexts/theme-context';
import { FaGithub } from "react-icons/fa";
import Link from "next/link";

const Footer: React.FC = () => {
  const { isDarkTheme } = useTheme();

  return (
    <div className={`w-full ${isDarkTheme ? 'bg-dark-theme-bg text-white' : 'bg-light-gray text-black'}`}>
      {/* Full-width background */}
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Max-width container */}
        <div className="flex items-center">
          <span>© 2024 Copyright:&nbsp;</span>
          <a className="hover:underline" href={process.env.NEXT_FUTURAMA_URL}>
            helios.gallery
          </a>
          <span className="mx-2">|</span>
          <Link href="/privacy" legacyBehavior>
            <a className="hover:underline">Privacy Policy</a>
          </Link>
        </div>
        <div className="flex items-center">
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