import { Link } from "react-router-dom";
// 1. Import the logo file here


const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-linear-to-r from-[#128e90] via-[#012136] to-[#01181F] text-white mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex  items-center space-x-3">
              {/* 2. Use the imported variable name here */}
              <img 
                src={"https://civoranexus.com/assets/Long_logo.png"} 
                alt="EduVillage Logo" 
                className="w-32 h-32 object-contain"
              />
              <div>
                
                
              </div>
            </div>
            
            {/* Social Links Section
            <div className="flex space-x-3">
              <a href="#" className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors" aria-label="Facebook">
                <span className="text-lg">📘</span>
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors" aria-label="Twitter">
                <span className="text-lg">🐦</span>
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors" aria-label="LinkedIn">
                <span className="text-lg">💼</span>
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors" aria-label="Instagram">
                <span className="text-lg">📷</span>
              </a>
            </div> */}
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/courses" className="text-[#CCE7EC] hover:text-white transition-colors text-sm">Browse Courses</Link></li>
              <li><Link to="/about" className="text-[#CCE7EC] hover:text-white transition-colors text-sm">About Us</Link></li>
              <li><Link to="/contact" className="text-[#CCE7EC] hover:text-white transition-colors text-sm">Contact</Link></li>
              <li><Link to="/blog" className="text-[#CCE7EC] hover:text-white transition-colors text-sm">Blog</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Support</h4>
            <ul className="space-y-2">
              <li><Link to="/faq" className="text-[#CCE7EC] hover:text-white transition-colors text-sm">FAQ</Link></li>
              <li><Link to="/help" className="text-[#CCE7EC] hover:text-white transition-colors text-sm">Help Center</Link></li>
              <li><Link to="/terms" className="text-[#CCE7EC] hover:text-white transition-colors text-sm">Terms of Service</Link></li>
              <li><Link to="/privacy" className="text-[#CCE7EC] hover:text-white transition-colors text-sm">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Contact Us</h4>
            <ul className="space-y-3 text-sm text-[#CCE7EC]">
              <li className="flex items-start gap-2">
                <span className="text-lg shrink-0">📍</span>
                <span>123 Education Street, Learning City, ED 12345</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-lg shrink-0">📧</span>
                <a href="mailto:info@eduvillage.com" className="hover:text-white transition-colors">info@eduvillage.com</a>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-lg shrink-0">📞</span>
                <a href="tel:+1234567890" className="hover:text-white transition-colors">+1 (234) 567-890</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 bg-[#01181F]">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-[#CCE7EC] opacity-80">
              © {currentYear} EduVillage. All rights reserved.
            </p>
            <div className="flex items-center gap-4 text-sm text-[#CCE7EC]">
              <span>Mission Education for learners worldwide</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;