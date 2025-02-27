import React from "react";
import Link from "next/link";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: "Quick Links",
      items: [
        { name: "Home", href: "/" },
        { name: "Our Cars", href: "/cars" },
        { name: "About Us", href: "/#about" },
      ],
    },
    {
      title: "Legal",
      items: [
        { name: "Terms of Service", href: "/terms" },
        { name: "Privacy Policy", href: "#", isStatic: true },
        { name: "FAQ", href: "/faq" },
      ],
    },
    {
      title: "Contact Us",
      items: [
        { name: "Email: info@carrental.com", isStatic: true },
        { name: "Phone: +36 1 234 5678", isStatic: true },
        { name: "Address: 1234 Main St, Budapest, Hungary", isStatic: true },
      ],
    },
  ];

  return (
    <footer className="bg-[#1C1F20] text-gray-300 w-screen relative left-1/2 right-1/2 -mx-[50vw] mt-12">
      <div className="max-w-7xl mx-auto px-6 md:px-16 py-12 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#AA4D2B] to-transparent opacity-30"></div>
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#AA4D2B]/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#AA4D2B]/5 rounded-full blur-3xl"></div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="space-y-4">
            <h3 className="text-white text-xl font-bold relative">
              Car Rental
              <span className="absolute -bottom-2 left-0 w-12 h-0.5 bg-[#AA4D2B]"></span>
            </h3>
            <p className="text-sm leading-relaxed">
              Premium car rental service with a wide range of vehicles for all
              your needs. We prioritize quality, safety, and customer
              satisfaction.
            </p>
          </div>

          {footerLinks.map((section, i) => (
            <div key={i}>
              <h4 className="text-white text-lg font-semibold mb-4 relative">
                {section.title}
                <span className="absolute -bottom-2 left-0 w-8 h-0.5 bg-[#AA4D2B]"></span>
              </h4>
              <ul className="space-y-2">
                {section.items.map((item, j) => (
                  <li key={j}>
                    {item.isStatic ? (
                      <span className="text-gray-400 hover:text-gray-300 transition-colors duration-200">
                        {item.name}
                      </span>
                    ) : (
                      <Link
                        href={item.href}
                        className="text-gray-400 hover:text-white transition-colors duration-200 hover:underline underline-offset-2"
                      >
                        {item.name}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-6 border-t border-gray-800 text-sm text-center">
          <p className="opacity-70 hover:opacity-100 transition-opacity duration-300">
            © {currentYear} Car Rental. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
