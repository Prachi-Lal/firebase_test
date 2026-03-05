import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import Auth from './components/Auth';
import Dashboard from './components/Dashboard';
import './App.css';

function App() {
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser ?? null);
    });
    return unsubscribe;
  }, []);

  if (user === undefined) {
    return <p className="loading">Loading…</p>;
  }

  return (
    <main className="app">
      <h1 className="app-title">Firebase Demo</h1>
      {user ? <Dashboard user={user} /> : <Auth />}
    </main>
  );
}

export default App;
