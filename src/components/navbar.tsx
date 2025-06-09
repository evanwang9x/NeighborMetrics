import React from 'react';

export function Navbar() {
  const handleLinkClick = (section: string): void => {
    console.log(`Navigate to ${section}`);
    // TODO: Implement navigation logic
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLAnchorElement>): void => {
    (e.target as HTMLAnchorElement).style.color = styles.navLinkHover.color as string;
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLAnchorElement>): void => {
    (e.target as HTMLAnchorElement).style.color = styles.navLink.color as string;
  };

  const handleButtonMouseEnter = (e: React.MouseEvent<HTMLButtonElement>): void => {
    (e.target as HTMLButtonElement).style.transform = 'translateY(-2px)';
  };

  const handleButtonMouseLeave = (e: React.MouseEvent<HTMLButtonElement>): void => {
    (e.target as HTMLButtonElement).style.transform = 'translateY(0)';
  };

  return (
    <nav style={styles.navbar}>
      <div style={styles.navContainer}>
        <a href="/" style={styles.logo}>
          Neighbor Metrics
        </a>
        
        <ul style={styles.navLinks}>
          <li>
            <a 
              style={styles.navLink}
              onClick={() => handleLinkClick('home')}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              Home
            </a>
          </li>
          <li>
            <a 
              style={styles.navLink}
              onClick={() => handleLinkClick('compare')}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              Compare Cities
            </a>
          </li>
          <li>
            <a 
              style={styles.navLink}
              onClick={() => handleLinkClick('data-sources')}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              Data Sources
            </a>
          </li>
          <li>
            <a 
              style={styles.navLink}
              onClick={() => handleLinkClick('about')}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              About Us
            </a>
          </li>
          <li>
            <a 
              style={styles.navLink}
              onClick={() => handleLinkClick('contact')}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              Contact
            </a>
          </li>
          <li>
            <button 
              style={styles.ctaButton}
              onClick={() => handleLinkClick('get-started')}
              onMouseEnter={handleButtonMouseEnter}
              onMouseLeave={handleButtonMouseLeave}
            >
              Get Started
            </button>
          </li>
        </ul>

        <button style={styles.mobileMenuButton}>
          ☰
        </button>
      </div>
    </nav>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  navbar: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    background: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(10px)',
    borderBottom: '1px solid rgba(102, 126, 234, 0.1)',
    padding: '15px 0',
    zIndex: 1000,
    transition: 'all 0.3s ease'
  },
  navContainer: {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 20px'
  },
  logo: {
    fontSize: '1.5rem',
    fontWeight: '700',
    color: '#667eea',
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  },
  navLinks: {
    display: 'flex',
    gap: '32px',
    alignItems: 'center',
    listStyle: 'none',
    margin: 0,
    padding: 0
  },
  navLink: {
    color: '#4a5568',
    textDecoration: 'none',
    fontWeight: '500',
    fontSize: '16px',
    transition: 'color 0.3s ease',
    cursor: 'pointer'
  },
  navLinkHover: {
    color: '#667eea'
  },
  ctaButton: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    padding: '10px 20px',
    borderRadius: '8px',
    textDecoration: 'none',
    fontWeight: '600',
    fontSize: '14px',
    transition: 'transform 0.2s ease',
    border: 'none',
    cursor: 'pointer'
  },
  mobileMenuButton: {
    display: 'none',
    background: 'none',
    border: 'none',
    fontSize: '24px',
    cursor: 'pointer',
    color: '#4a5568'
  }
};

export default Navbar;