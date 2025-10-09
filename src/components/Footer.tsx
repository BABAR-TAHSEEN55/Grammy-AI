import Link from "next/link";

const Footer = () => {
  return (
    <div className="flex flex-col items-center justify-center mt-8  ">
      <p className="text-lg">Made with ❤️ by Kim</p>
      <p className="text-center">
        Copyright © Suho Kim 2025 All rights Reserved
      </p>
      <Link
        href="https://x.com/Suhokim55"
        target="_blank"
        rel="noopener noreferrer"
        className=" text-gray-500 hover:text-white transition duration-900 ease-in-out"
      >
        Twitter
      </Link>
    </div>
  );
};

export default Footer;
