import React from "react";
import Link from "next/link";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black text-gray-300 w-screen relative left-1/2 right-1/2 -mx-[50vw] mt-2">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-white text-xl font-bold mb-4">Car Rental</h3>
            <p className="text-sm">
              Premium car rental service with a wide range of vehicles for all
              your needs.
            </p>
          </div>
          <div>
            <h4 className="text-white text-lg font-semibold mb-3">
              Quick Links
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/cars"
                  className="hover:text-white transition-colors"
                >
                  Our Cars
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="hover:text-white transition-colors"
                >
                  About Us
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-white text-lg font-semibold mb-3">Legal</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/terms"
                  className="hover:text-white transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="hover:text-white transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="hover:text-white transition-colors"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-white text-lg font-semibold mb-3">
              Contact Us
            </h4>
            <ul className="space-y-2">
              <li>Email: info@carrental.com</li>
              <li>Phone: +36 1 234 5678</li>
              <li>Address: 1234 Main St, Budapest, Hungary</li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-gray-800 text-sm text-center">
          <p>© {currentYear} Car Rental. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
