import { useContext } from 'react';
// Import AuthContext after it has been exported
import { AuthContext } from '../providers/AuthProvider';
// Remove the incorrect import as AuthContextType is not exported

// Define your types locally since AuthContextType is not exported
interface AuthContextType {
  session: { user: any } | null;
  isLoading: boolean;
}

  const context = useContext<AuthContextType>(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
