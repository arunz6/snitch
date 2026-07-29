import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { 
  User, 
  Mail, 
  Phone, 
  ShieldCheck, 
  Key, 
  Copy, 
  Check, 
  Edit3, 
  Lock, 
  Sparkles,
  Palette,
  Award,
  Calendar,
  CheckCircle2
} from 'lucide-react';
import './Profile.css';

const defaultUser = {
  _id: '6a47ea74c4d29fb7a6b6402d',
  email: 'arunrajput88176894@gmail.com',
  contact: '8817689479',
  fullname: 'Arun Rajput',
  role: 'seller',
};

const Profile = () => {
  const reduxUser = useSelector((state) => state.auth?.user);
  const user = reduxUser || defaultUser;
  
  const [copiedId, setCopiedId] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const handleCopy = (text, type) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    if (type === 'id') {
      setCopiedId(true);
      setTimeout(() => setCopiedId(false), 2000);
    } else if (type === 'phone') {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    }
  };

  return (
    <section className="profile-page">
      {/* Background Dot Matrix Pattern */}
      <div className="ebon-grid-bg" />

      <div className="profile-container">
        {/* Ebon & Gilt Theme Header Tag */}
        <div className="theme-tag-bar">
          <div className="theme-branding">
            <Palette className="theme-icon" size={18} />
            <span className="theme-name">Ebon & Gilt</span>
          </div>
          <div className="palette-swatches">
            <span className="swatch primary" title="Primary Gold (#DAA520)" />
            <span className="swatch secondary" title="Secondary Ebon (#0D0D0D)" />
            <span className="swatch tertiary" title="Tertiary Sky Blue (#38BDF8)" />
            <span className="swatch neutral" title="Neutral White (#FFFFFF)" />
          </div>
        </div>

        {/* Hero Banner Card */}
        <div className="profile-hero-card">
          <div className="gold-accent-line" />
          
          <div className="hero-content">
            {/* Avatar Section */}
            <div className="avatar-wrapper">
              <div className="avatar-ring">
                <div className="avatar-inner">
                  <User size={38} className="avatar-icon" />
                </div>
              </div>
              <span className="status-badge" title="Active Status">
                <span className="pulse-dot" />
              </span>
            </div>

            {/* User Details Header */}
            <div className="user-header-info">
              <div className="name-role-row">
                <h1 className="profile-name">{user.fullname || 'Anonymous User'}</h1>
                <span className="role-pill">
                  <Award size={13} />
                  {user.role ? user.role.toUpperCase() : 'USER'}
                </span>
              </div>
              <p className="profile-subtitle">
                <ShieldCheck size={15} className="subtitle-icon" /> Verified Account Member
              </p>
            </div>
          </div>
        </div>

        {/* Metrics Overview Row */}
        <div className="metrics-grid">
          <div className="metric-card">
            <div className="metric-icon-box gold">
              <Award size={20} />
            </div>
            <div className="metric-info">
              <span className="metric-label">ACCOUNT ROLE</span>
              <span className="metric-value">{user.role ? user.role.toUpperCase() : 'BUYER'}</span>
            </div>
          </div>

          <div className="metric-card">
            <div className="metric-icon-box blue">
              <ShieldCheck size={20} />
            </div>
            <div className="metric-info">
              <span className="metric-label">ACCOUNT STATUS</span>
              <span className="metric-value status-active">
                <CheckCircle2 size={14} /> Active
              </span>
            </div>
          </div>

          <div className="metric-card">
            <div className="metric-icon-box white">
              <Calendar size={20} />
            </div>
            <div className="metric-info">
              <span className="metric-label">MEMBER SINCE</span>
              <span className="metric-value">July 2026</span>
            </div>
          </div>
        </div>

        {/* Account Details Container */}
        <div className="profile-details-card">
          <div className="card-header">
            <h2 className="section-title">User Information</h2>
            <span className="section-subtitle">Credentials and system access metadata</span>
          </div>

          <div className="info-grid">
            {/* Email Tile */}
            <div className="info-tile">
              <div className="tile-icon-bg blue">
                <Mail size={20} />
              </div>
              <div className="tile-content">
                <span className="tile-label">PRIMARY EMAIL</span>
                <span className="tile-value">{user.email || 'N/A'}</span>
              </div>
              <span className="tile-badge blue">Primary</span>
            </div>

            {/* Contact Tile */}
            <div className="info-tile">
              <div className="tile-icon-bg gold">
                <Phone size={20} />
              </div>
              <div className="tile-content">
                <span className="tile-label">CONTACT NUMBER</span>
                <span className="tile-value">{user.contact || 'N/A'}</span>
              </div>
              <button 
                className={`tile-action-btn ${copiedPhone ? 'copied' : ''}`}
                onClick={() => handleCopy(user.contact, 'phone')}
                title="Copy Contact Number"
              >
                {copiedPhone ? <Check size={16} /> : <Copy size={16} />}
              </button>
            </div>

            {/* Account ID Tile */}
            <div className="info-tile">
              <div className="tile-icon-bg blue">
                <Key size={20} />
              </div>
              <div className="tile-content">
                <span className="tile-label">ACCOUNT ID</span>
                <span className="tile-value monospace">{user._id || 'N/A'}</span>
              </div>
              <button 
                className={`tile-action-btn ${copiedId ? 'copied' : ''}`}
                onClick={() => handleCopy(user._id, 'id')}
                title="Copy Account ID"
              >
                {copiedId ? <Check size={16} /> : <Copy size={16} />}
              </button>
            </div>

            {/* Role & Privileges Tile */}
            <div className="info-tile">
              <div className="tile-icon-bg gold">
                <User size={20} />
              </div>
              <div className="tile-content">
                <span className="tile-label">ROLE & ACCESS</span>
                <span className="tile-value capitalize">{user.role || 'Standard'}</span>
              </div>
              <span className="tile-badge gold">Full Access</span>
            </div>
          </div>

          {/* Action Bar */}
          <div className="profile-actions-bar">
            <button className="btn-primary-gilt" onClick={() => setIsEditing(!isEditing)}>
              <Edit3 size={16} />
              <span>{isEditing ? 'Close Edit' : 'Edit Profile'}</span>
            </button>
            
            <button className="btn-secondary-ebon">
              <Lock size={16} />
              <span>Security</span>
            </button>

            <button className="btn-tertiary-blue" onClick={() => handleCopy(user._id, 'id')}>
              {copiedId ? <Check size={16} /> : <Sparkles size={16} />}
              <span>{copiedId ? 'ID Copied!' : 'Copy Account ID'}</span>
            </button>
          </div>

          {isEditing && (
            <div className="edit-banner">
              <Sparkles size={16} className="banner-sparkle" />
              <span>Editing active for <strong>{user.fullname}</strong> ({user.role}). Form submission ready.</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Profile;