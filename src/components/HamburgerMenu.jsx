import React from 'react';

const HamburgerMenu = ({ onClick }) => {
  return (
    <div style={styles.container}>
      <button onClick={onClick} style={styles.button}>
        <div style={styles.bar}></div>
        <div style={styles.bar}></div>
        <div style={styles.bar}></div>
      </button>
    </div>
  );
};

const styles = {
  container: {
    position: 'absolute',
    top: '20px',
    left: '20px',
    zIndex: 1000,
  },
  button: {
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    padding: 0,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '24px',
  },
  bar: {
    width: '30px',
    height: '4px',
    backgroundColor: '#fff',
    borderRadius: '2px',
  },
};

export default HamburgerMenu;