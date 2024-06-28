import { FaDiscord, FaTelegram, FaInstagram, FaLinkedin } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

export default function Footer() {
  return (
    <>
      <footer className="fixed bottom-0 left-0 right-0 bg-gray-800 p-4">
        <div className="flex justify-center space-x-4">
          <a
            href="https://discordapp.com/users/299909491120537600/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaDiscord className="text-white h-6 w-6 hover:text-blue-500" />
          </a>
          <a
            href="https://t.me/macaReonie"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaTelegram className="text-white h-6 w-6 hover:text-blue-400" />
          </a>
          <a
            href="https://www.instagram.com/reon.chiang/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram className="text-white h-6 w-6 hover:text-pink-500" />
          </a>
          <a
            href="https://www.linkedin.com/in/rcry/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin className="text-white h-6 w-6 hover:text-blue-400" />
          </a>
          <a
            href="mailto:e0958490@u.nus.edu"
            target="_blank"
            rel="noopener noreferrer"
          >
            <MdEmail className="text-white h-6 w-6 hover:text-blue-500" />
          </a>
        </div>
      </footer>
    </>
  );
}
