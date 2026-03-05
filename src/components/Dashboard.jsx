import { useState, useEffect } from 'react';
import { signOut, deleteUser } from 'firebase/auth';
import { doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';

export default function Dashboard({ user }) {
  const [profile, setProfile] = useState(null);
  const [newName, setNewName] = useState('');
  const [editing, setEditing] = useState(false);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      const snap = await getDoc(doc(db, 'users', user.uid));
      if (snap.exists()) {
        setProfile(snap.data());
        setNewName(snap.data().name);
      }
    };
    fetchProfile();
  }, [user.uid]);

  const handleUpdateName = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      await updateDoc(doc(db, 'users', user.uid), { name: newName });
      setProfile((prev) => ({ ...prev, name: newName }));
      setEditing(false);
      setMessage('Name updated successfully!');
    } catch (err) {
      setMessage('Error: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (!window.confirm('Are you sure you want to delete your account? This cannot be undone.')) return;
    setLoading(true);
    try {
      await deleteDoc(doc(db, 'users', user.uid));
      await deleteUser(user);
    } catch (err) {
      setMessage('Error: ' + err.message);
      setLoading(false);
    }
  };

  if (!profile) {
    return <p className="loading">Loading profile…</p>;
  }

  return (
    <div className="dashboard-container">
      <h2>Hello, {profile.name}!</h2>
      <p className="email-info">{profile.email}</p>

      {message && <p className="message">{message}</p>}

      {editing ? (
        <form onSubmit={handleUpdateName} className="update-form">
          <div className="form-group">
            <label htmlFor="newName">New Name</label>
            <input
              id="newName"
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              required
            />
          </div>
          <div className="btn-row">
            <button type="submit" disabled={loading}>
              {loading ? 'Saving…' : 'Save'}
            </button>
            <button type="button" className="secondary" onClick={() => { setEditing(false); setNewName(profile.name); }}>
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <button onClick={() => setEditing(true)}>Update Name</button>
      )}

      <div className="actions">
        <button className="secondary" onClick={() => signOut(auth)}>
          Logout
        </button>
        <button className="danger" onClick={handleDeleteAccount} disabled={loading}>
          Delete Account
        </button>
      </div>
    </div>
  );
}
