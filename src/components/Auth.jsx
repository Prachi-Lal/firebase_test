import { useState } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../firebase';

export default function Auth() {
  const [isSignup, setIsSignup] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (isSignup) {
        const credential = await createUserWithEmailAndPassword(auth, email, password);
        await setDoc(doc(db, 'users', credential.user.uid), {
          uid: credential.user.uid,
          name,
          email,
          createdAt: serverTimestamp(),
        });
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <h2>{isSignup ? 'Sign Up' : 'Login'}</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        {isSignup && (
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              type="text"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
        )}
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            placeholder="email@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            placeholder="Password (min 6 chars)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Please wait…' : isSignup ? 'Sign Up' : 'Login'}
        </button>
      </form>
      <p className="toggle-auth">
        {isSignup ? 'Already have an account?' : "Don't have an account?"}{' '}
        <button className="link-btn" onClick={() => { setIsSignup(!isSignup); setError(''); }}>
          {isSignup ? 'Login' : 'Sign Up'}
        </button>
      </p>
    </div>
  );
}
