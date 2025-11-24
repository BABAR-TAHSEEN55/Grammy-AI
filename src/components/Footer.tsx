import Link from "next/link";

const Footer = () => {
  return (
    <div className="flex flex-col items-center justify-center mt-4  ">
      <p className="text-lg mb-1 tracking-widest">Made with ❤️ by Kim</p>
      <p className="text-center tracking-widest">
        Copyright © Suho Kim 2025 All rights Reserved
      </p>
      <Link
        href="https://x.com/"
        target="_blank"
        rel="noopener noreferrer"
        className=" text-gray-500 hover:text-white transition duration-900 ease-in-out tracking-wider"
      >
        Twitter
      </Link>
    </div>
  );
};

export default Footer;
