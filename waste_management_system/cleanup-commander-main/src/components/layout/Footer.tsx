
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";

const Footer = () => {
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 py-8 border-t">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="font-bold text-lg">
              <span className="text-eco-primary">Regen</span>
              <span className="text-earth-primary">Waste</span>
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Making waste management efficient, sustainable, and accessible for everyone.
            </p>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-semibold">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Button variant="link" className="p-0 h-auto" onClick={() => navigate('/')}>Home</Button>
              </li>
              <li>
                <Button variant="link" className="p-0 h-auto" onClick={() => navigate('/about')}>About Us</Button>
              </li>
              <li>
                <Button variant="link" className="p-0 h-auto" onClick={() => navigate('/services')}>Services</Button>
              </li>
              <li>
                <Button variant="link" className="p-0 h-auto" onClick={() => navigate('/contact')}>Contact</Button>
              </li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-semibold">Services</h4>
            <ul className="space-y-2">
              <li>
                <Button variant="link" className="p-0 h-auto" onClick={() => navigate('/report')}>Report Waste</Button>
              </li>
              <li>
                <Button variant="link" className="p-0 h-auto" onClick={() => navigate('/schedule')}>Schedule Pickup</Button>
              </li>
              <li>
                <Button variant="link" className="p-0 h-auto" onClick={() => navigate('/track')}>Track Status</Button>
              </li>
              <li>
                <Button variant="link" className="p-0 h-auto" onClick={() => navigate('/education')}>Recycling Education</Button>
              </li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-semibold">Contact</h4>
            <address className="not-italic text-sm text-gray-600 dark:text-gray-400">
              <p>123 Green Street</p>
              <p>Eco City, EC 12345</p>
              <p className="mt-2">Phone: (123) 456-7890</p>
              <p>Email: info@ecowaste.com</p>
            </address>
          </div>
        </div>
        
        <div className="border-t mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            &copy; {currentYear} EcoWaste Management. All rights reserved.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Button variant="link" className="p-0 h-auto" onClick={() => navigate('/privacy')}>Privacy Policy</Button>
            <Button variant="link" className="p-0 h-auto" onClick={() => navigate('/terms')}>Terms of Service</Button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
