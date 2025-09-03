function Navbar() {
  return (
    <nav style={{
      backgroundColor: '#333',
      padding: '1rem',
      position: 'sticky',
      top: '0',
      zIndex: '100'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <div style={{
          color: 'white',
          fontSize: '1.5rem',
          fontWeight: 'bold'
        }}>
          MyCompany
        </div>
        <div>
          <a href="#home" style={{
            color: 'white',
            textDecoration: 'none',
            margin: '0 1rem',
            fontSize: '1.1rem'
          }}>Home</a>
          <a href="#about" style={{
            color: 'white',
            textDecoration: 'none',
            margin: '0 1rem',
            fontSize: '1.1rem'
          }}>About</a>
          <a href="#services" style={{
            color: 'white',
            textDecoration: 'none',
            margin: '0 1rem',
            fontSize: '1.1rem'
          }}>Services</a>
          <a href="#contact" style={{
            color: 'white',
            textDecoration: 'none',
            margin: '0 1rem',
            fontSize: '1.1rem'
          }}>Contact</a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;