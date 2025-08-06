// App.tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { FutureverseAuthProvider, FutureverseWagmiProvider } from '@futureverse/auth-react';
import { FutureverseAuthClient } from '@futureverse/auth-react/auth';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useAuth } from '@futureverse/auth-react';
import { AuthUiProvider, DefaultTheme, CustodialAuthButton } from '@futureverse/auth-ui';
import logoSvg from './assets/Logo-and-Evolution-Grey.svg';
import MyStable from './MyStable';
import { createWagmiConfig } from '@futureverse/auth-react/wagmi';

const authClient = new FutureverseAuthClient({
  clientId: 'Ug3k_XbN1wXZlPDvgK_Ge',
  environment: 'staging',
  redirectUri: 'http://localhost:5173/',
  postLogoutRedirectUri: 'http://localhost:5173/',
});

const queryClient = new QueryClient();

export const getWagmiConfig = async () => {
  return createWagmiConfig({
    authClient,
  }) as Promise<any>;
};


function NavBar() {
  const navigate = useNavigate();
  const { userSession, authClient, signIn } = useAuth();

  const handleLogout = async () => {
    try {
      await authClient.signOutPass({ flow: 'redirect' });
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  const handleMyStable = () => {
    navigate('/mystable');
  };

  return (
    <nav style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '10px 20px',
      borderBottom: '1px solid #ccc',
      width: '100%',
      boxSizing: 'border-box',
      backgroundColor: '#fff'
    }}>
      <div style={{ flex: '0 0 auto' }}>
        <img src={logoSvg} alt="Evolution Stables Logo" style={{ height: '40px', verticalAlign: 'middle' }} />
      </div>
      <div style={{ flex: '1', textAlign: 'center' }}>
        <button onClick={() => navigate('/')} style={{ margin: '0 15px' }}>Home</button>
        <button onClick={() => navigate('/about')} style={{ margin: '0 15px' }}>About</button>
        <button onClick={handleMyStable} style={{ margin: '0 15px' }}>MyStable</button>
      </div>
      <div style={{ flex: '0 0 auto' }}>
        {userSession ? <button onClick={handleLogout}>Logout</button> : <button onClick={signIn}>Login</button>}
      </div>
    </nav>
  );
}

function MainPage() {
  const { userSession, signIn } = useAuth();
  const navigate = useNavigate();

  return (
    <div style={{ width: '100%', minHeight: '100vh', boxSizing: 'border-box', backgroundColor: '#f8f9fa' }}>
      <NavBar />
      <div style={{ padding: '20px' }}>
        <section style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '20px', marginBottom: '20px', textAlign: 'center', backgroundColor: '#fff' }}>
          <h1>Home</h1>
          <p>Welcome to Evolution Stables!</p>
        </section>
        <section style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '20px', marginBottom: '20px', textAlign: 'center', backgroundColor: '#fff' }}>
          <h1>About</h1>
        </section>
        <section id="mystable-section" style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '20px', textAlign: 'center', backgroundColor: '#fff' }}>
          <h1>MyStable</h1>
          {userSession ? (
            <button onClick={() => navigate('/mystable')}>Go to MyStable</button>
          ) : (
            <button onClick={signIn}>Login</button>
          )}
        </section>
      </div>
    </div>
  );
}

function AppContent() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/about" element={<MainPage />} />
      <Route path="/mystable" element={<MyStable />} />
      <Route path="/callback" element={<div>Authenticating...</div>} />
    </Routes>
  );
}

export default function App() {
  // Create theme configuration that defaults to Web2 authentication
  const themeConfig = {
    ...DefaultTheme,
    defaultAuthOption: 'custodial' as const, // Default to Web2 (Email, Google, etc.)
    colors: DefaultTheme.colors,
    font: DefaultTheme.font,
    borderRadius: DefaultTheme.borderRadius
  };

  return (
    <QueryClientProvider client={queryClient}>
      <FutureverseWagmiProvider
        getWagmiConfig={getWagmiConfig}
      >
        <FutureverseAuthProvider authClient={authClient}>
          <AuthUiProvider authClient={authClient} themeConfig={themeConfig}>
            <AppContent />
          </AuthUiProvider>
        </FutureverseAuthProvider>
      </FutureverseWagmiProvider>
    </QueryClientProvider>
  );
}
