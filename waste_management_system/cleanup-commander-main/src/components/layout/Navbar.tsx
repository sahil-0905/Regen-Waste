
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from '@/hooks/use-toast';
import { useIsMobile } from '@/hooks/use-mobile';
import { Menu, ChevronDown, User, LogOut, Bell, X } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState<{name?: string, email: string} | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useIsMobile();
  
  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    const userData = localStorage.getItem('user');
    
    if (isAuthenticated && userData) {
      setUser(JSON.parse(userData));
    } else if (!['/login', '/signup', '/'].includes(location.pathname)) {
      navigate('/login');
    }
  }, [navigate, location.pathname]);
  
  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('user');
    setUser(null);
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
    navigate('/login');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm dark:bg-gray-900">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Button 
              variant="ghost" 
              className="p-0 mr-2" 
              onClick={() => navigate('/')}
            >
              <span className="text-2xl font-bold text-eco-primary">Regen</span>
              <span className="text-2xl font-bold text-earth-primary">Waste</span>
            </Button>
          </div>
          
          {/* Mobile menu button */}
          {isMobile && (
            <Button variant="ghost" size="icon" onClick={toggleMenu}>
              {isMenuOpen ? <X /> : <Menu />}
            </Button>
          )}
          
          {/* Desktop navigation */}
          {!isMobile && (
            <div className="flex items-center space-x-4">
              {user ? (
                <>
                  <Button 
                    variant="ghost" 
                    onClick={() => navigate('/dashboard')}
                    className={location.pathname === '/dashboard' ? 'bg-eco-background text-eco-primary' : ''}
                  >
                    Dashboard
                  </Button>
                  <Button 
                    variant="ghost" 
                    onClick={() => navigate('/report')}
                    className={location.pathname === '/report' ? 'bg-eco-background text-eco-primary' : ''}
                  >
                    Report Waste
                  </Button>
                  <Button 
                    variant="ghost" 
                    onClick={() => navigate('/schedule')}
                    className={location.pathname === '/schedule' ? 'bg-eco-background text-eco-primary' : ''}
                  >
                    Schedule Pickup
                  </Button>
                  <Button 
                    variant="ghost" 
                    onClick={() => navigate('/track')}
                    className={location.pathname === '/track' ? 'bg-eco-background text-eco-primary' : ''}
                  >
                    Track
                  </Button>
                  
                  <Button variant="ghost" size="icon" className="relative">
                    <Bell />
                    <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-eco-primary"></span>
                  </Button>
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="flex items-center space-x-1">
                        <User className="h-4 w-4 mr-1" />
                        <span>{user.name || user.email}</span>
                        <ChevronDown className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>My Account</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => navigate('/profile')}>
                        Profile
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => navigate('/settings')}>
                        Settings
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={handleLogout} className="text-red-500">
                        <LogOut className="h-4 w-4 mr-2" />
                        Logout
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </>
              ) : (
                <>
                  <Button variant="ghost" onClick={() => navigate('/login')}>
                    Sign In
                  </Button>
                  <Button 
                    className="bg-eco-primary hover:bg-eco-dark"
                    onClick={() => navigate('/signup')}
                  >
                    Sign Up
                  </Button>
                </>
              )}
            </div>
          )}
        </div>
        
        {/* Mobile menu */}
        {isMobile && isMenuOpen && (
          <div className="mt-4 animate-slide-in">
            <div className="flex flex-col space-y-2">
              {user ? (
                <>
                  <div className="py-2 px-4 bg-eco-background rounded-md mb-2">
                    <p className="font-medium">{user.name || user.email}</p>
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                  </div>
                  <Button 
                    variant="ghost" 
                    onClick={() => {
                      navigate('/dashboard');
                      setIsMenuOpen(false);
                    }}
                    className={`justify-start ${location.pathname === '/dashboard' ? 'bg-eco-background text-eco-primary' : ''}`}
                  >
                    Dashboard
                  </Button>
                  <Button 
                    variant="ghost" 
                    onClick={() => {
                      navigate('/report');
                      setIsMenuOpen(false);
                    }}
                    className={`justify-start ${location.pathname === '/report' ? 'bg-eco-background text-eco-primary' : ''}`}
                  >
                    Report Waste
                  </Button>
                  <Button 
                    variant="ghost" 
                    onClick={() => {
                      navigate('/schedule');
                      setIsMenuOpen(false);
                    }}
                    className={`justify-start ${location.pathname === '/schedule' ? 'bg-eco-background text-eco-primary' : ''}`}
                  >
                    Schedule Pickup
                  </Button>
                  <Button 
                    variant="ghost" 
                    onClick={() => {
                      navigate('/track');
                      setIsMenuOpen(false);
                    }}
                    className={`justify-start ${location.pathname === '/track' ? 'bg-eco-background text-eco-primary' : ''}`}
                  >
                    Track
                  </Button>
                  <Button 
                    variant="ghost" 
                    onClick={() => {
                      navigate('/profile');
                      setIsMenuOpen(false);
                    }}
                    className="justify-start"
                  >
                    Profile
                  </Button>
                  <Button 
                    variant="ghost" 
                    onClick={() => {
                      navigate('/settings');
                      setIsMenuOpen(false);
                    }}
                    className="justify-start"
                  >
                    Settings
                  </Button>
                  <Button 
                    variant="ghost" 
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="justify-start text-red-500"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Button 
                    variant="ghost" 
                    onClick={() => {
                      navigate('/login');
                      setIsMenuOpen(false);
                    }}
                    className="justify-start"
                  >
                    Sign In
                  </Button>
                  <Button 
                    className="bg-eco-primary hover:bg-eco-dark"
                    onClick={() => {
                      navigate('/signup');
                      setIsMenuOpen(false);
                    }}
                  >
                    Sign Up
                  </Button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
