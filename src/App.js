import React, { useState } from 'react';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilters, setSelectedFilters] = useState([]);

  const filters = [
    { id: 'safety', label: 'Safety', icon: '🛡️' },
    { id: 'cost', label: 'Cost of Living', icon: '💰' },
    { id: 'weather', label: 'Weather', icon: '🌤️' },
    { id: 'transportation', label: 'Transportation', icon: '🚌' },
    { id: 'education', label: 'Education', icon: '🎓' },
    { id: 'housing', label: 'Housing', icon: '🏠' }
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching for:', searchTerm);
    // TODO: Implement search logic
  };

  const toggleFilter = (filterId) => {
    setSelectedFilters(prev => 
      prev.includes(filterId) 
        ? prev.filter(id => id !== filterId)
        : [...prev, filterId]
    );
  };

  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    },
    header: {
      textAlign: 'center',
      padding: '60px 20px 40px',
      color: 'white'
    },
    title: {
      fontSize: '3.5rem',
      fontWeight: '700',
      margin: '0 0 16px 0',
      textShadow: '0 2px 4px rgba(0,0,0,0.3)'
    },
    subtitle: {
      fontSize: '1.3rem',
      fontWeight: '300',
      opacity: '0.9',
      maxWidth: '600px',
      margin: '0 auto'
    },
    mainContent: {
      maxWidth: '1000px',
      margin: '0 auto',
      padding: '0 20px'
    },
    searchSection: {
      background: 'white',
      borderRadius: '20px',
      padding: '40px',
      marginBottom: '40px',
      boxShadow: '0 20px 60px rgba(0,0,0,0.1)'
    },
    searchForm: {
      display: 'flex',
      gap: '16px',
      marginBottom: '30px'
    },
    searchInput: {
      flex: '1',
      padding: '16px 20px',
      fontSize: '16px',
      border: '2px solid #e1e5e9',
      borderRadius: '12px',
      outline: 'none',
      transition: 'border-color 0.3s ease'
    },
    searchButton: {
      padding: '16px 32px',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      border: 'none',
      borderRadius: '12px',
      fontSize: '16px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'transform 0.2s ease',
      boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)'
    },
    filtersTitle: {
      fontSize: '18px',
      fontWeight: '600',
      marginBottom: '16px',
      color: '#2d3748'
    },
    filtersGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
      gap: '12px'
    },
    filterChip: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      padding: '12px 16px',
      border: '2px solid #e1e5e9',
      borderRadius: '12px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      fontSize: '14px',
      fontWeight: '500'
    },
    filterChipActive: {
      borderColor: '#667eea',
      background: 'rgba(102, 126, 234, 0.1)',
      color: '#667eea'
    },
    featuresSection: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '24px',
      marginBottom: '60px'
    },
    featureCard: {
      background: 'white',
      borderRadius: '16px',
      padding: '32px',
      textAlign: 'center',
      boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
      transition: 'transform 0.3s ease'
    },
    featureIcon: {
      fontSize: '3rem',
      marginBottom: '16px'
    },
    featureTitle: {
      fontSize: '1.5rem',
      fontWeight: '600',
      marginBottom: '12px',
      color: '#2d3748'
    },
    featureDescription: {
      color: '#718096',
      lineHeight: '1.6'
    },
    footer: {
      textAlign: 'center',
      padding: '40px 20px',
      color: 'rgba(255,255,255,0.8)'
    }
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>Smart City Data Aggregator</h1>
        <p style={styles.subtitle}>
          Compare livability factors across cities and neighborhoods. 
          Make informed decisions about where to live with comprehensive data analysis.
        </p>
      </header>

      <main style={styles.mainContent}>
        <section style={styles.searchSection}>
          <form onSubmit={handleSearch} style={styles.searchForm}>
            <input
              type="text"
              placeholder="Enter city name (e.g., San Francisco, CA)"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={styles.searchInput}
            />
            <button 
              type="submit" 
              style={styles.searchButton}
              onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
              onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
            >
              Get Livability Score
            </button>
          </form>

          <div>
            <h3 style={styles.filtersTitle}>Prioritize what matters to you:</h3>
            <div style={styles.filtersGrid}>
              {filters.map(filter => (
                <div
                  key={filter.id}
                  style={{
                    ...styles.filterChip,
                    ...(selectedFilters.includes(filter.id) ? styles.filterChipActive : {})
                  }}
                  onClick={() => toggleFilter(filter.id)}
                >
                  <span>{filter.icon}</span>
                  <span>{filter.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section style={styles.featuresSection}>
          <div style={styles.featureCard}>
            <div style={styles.featureIcon}>📊</div>
            <h3 style={styles.featureTitle}>Comprehensive Scoring</h3>
            <p style={styles.featureDescription}>
              Get detailed livability scores based on crime data, housing costs, 
              transportation, weather, and more from trusted public APIs.
            </p>
          </div>

          <div style={styles.featureCard}>
            <div style={styles.featureIcon}>⚖️</div>
            <h3 style={styles.featureTitle}>Side-by-Side Comparison</h3>
            <p style={styles.featureDescription}>
              Compare up to 3 cities at once to see which location best matches 
              your lifestyle preferences and priorities.
            </p>
          </div>

          <div style={styles.featureCard}>
            <div style={styles.featureIcon}>🗺️</div>
            <h3 style={styles.featureTitle}>Interactive Maps</h3>
            <p style={styles.featureDescription}>
              Explore neighborhood-level data with interactive maps showing 
              detailed breakdowns of each livability factor.
            </p>
          </div>
        </section>
      </main>

      <footer style={styles.footer}>
        <p>Powered by public APIs • Helping you make informed relocation decisions</p>
      </footer>
    </div>
  );
}

export default App;