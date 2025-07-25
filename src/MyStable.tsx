import { useAuth } from '@futureverse/auth-react';
import { useState, useEffect } from 'react';
import { CustodialAuthButton } from '@futureverse/auth-ui';

function MyStable() {
  const { userSession } = useAuth();
  const [assets, setAssets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Simulate asset loading for now since we need to check the actual SDK API
  useEffect(() => {
    if (userSession?.user?.profile?.sub) {
      setLoading(true);
      // Simulate API call delay
      setTimeout(() => {
        // Mock asset data for demo
        setAssets([
          { id: 'asset_1', name: 'Lightning Bolt', type: 'Horse NFT' },
          { id: 'asset_2', name: 'Storm Runner', type: 'Horse NFT' },
          { id: 'asset_3', name: 'Golden Saddle', type: 'Equipment NFT' }
        ]);
        setLoading(false);
      }, 1000);
    } else {
      setLoading(false);
    }
  }, [userSession?.user?.profile?.sub]);

  return (
    <div style={{ width: '100%', minHeight: '100vh', boxSizing: 'border-box', backgroundColor: '#f8f9fa', position: 'relative' }}>
      {/* Navigation Bar */}
      <nav style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        padding: '10px 20px', 
        borderBottom: '1px solid #ccc', 
        width: '100%',
        boxSizing: 'border-box',
        backgroundColor: '#fff',
        filter: userSession ? 'none' : 'blur(3px)'
      }}>
        <div style={{ flex: '0 0 auto' }}>
          <img src="/src/assets/Logo-and-Evolution-Grey.svg" alt="Evolution Stables Logo" style={{ height: '40px', verticalAlign: 'middle' }} />
        </div>
        <div style={{ flex: '1', textAlign: 'center' }}>
          <button onClick={() => window.location.href = '/'} style={{ margin: '0 15px' }}>Home</button>
          <button onClick={() => window.location.href = '/about'} style={{ margin: '0 15px' }}>About</button>
          <button style={{ margin: '0 15px', fontWeight: 'bold' }}>MyStable</button>
        </div>
        <div style={{ flex: '0 0 auto' }}>
          <button onClick={() => window.location.href = '/'}>Logout</button>
        </div>
      </nav>
      
      {/* Main Content Area */}
      <div style={{ 
        padding: '20px', 
        textAlign: 'center',
        filter: userSession ? 'none' : 'blur(5px)',
        minHeight: 'calc(100vh - 80px)'
      }}>
        <div style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '20px', backgroundColor: '#fff', maxWidth: '800px', margin: '0 auto' }}>
          <h1>MyStable</h1>
          <p>Your stable is ready! User: {userSession?.user?.profile?.sub || 'Loading...'}</p>
          
          <section style={{ marginTop: '30px', textAlign: 'left' }}>
            <h2>My Assets</h2>
            {loading ? (
              <p>Loading assets...</p>
            ) : (
              <div>
                {assets.length > 0 ? (
                  <ul style={{ listStyle: 'none', padding: 0 }}>
                    {assets.map(asset => (
                      <li key={asset.id} style={{ 
                        border: '1px solid #eee', 
                        borderRadius: '4px', 
                        padding: '10px', 
                        marginBottom: '10px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                      }}>
                        <div>
                          <strong>{asset.name}</strong>
                          <br />
                          <small style={{ color: '#666' }}>{asset.type} (ID: {asset.id})</small>
                        </div>
                        <button style={{ padding: '5px 10px' }}>View</button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No assets found in your wallet.</p>
                )}
                <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '4px' }}>
                  <p><em>Manage your horses and NFTs here (expanding in future iterations).</em></p>
                </div>
              </div>
            )}
          </section>
        </div>
      </div>

      {/* Login Overlay for Unauthenticated Users */}
      {!userSession && (
        <div style={{ 
          position: 'absolute', 
          top: '50%', 
          left: '50%', 
          transform: 'translate(-50%, -50%)',
          backgroundColor: '#fff',
          padding: '30px',
          borderRadius: '8px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          textAlign: 'center',
          zIndex: 1000
        }}>
          <h2>Authentication Required</h2>
          <p>Please log in to view your stable and manage your assets.</p>
          <CustodialAuthButton label="Login to MyStable" />
        </div>
      )}
    </div>
  );
}

export default MyStable;
