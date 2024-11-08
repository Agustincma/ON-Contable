
import Logo from '../../images/Logo_on_original_transparent.png';

const IndiceComponent = () => {
  return (
    <section style={styles.footer}>
      <img src={Logo} alt="Logo" style={styles.logo} />
    </section>
  );
};

const styles = {
  section: {
    display: 'flex',
    flexDirection: 'row',
    
    padding: '10px 20px',
    width: '100%',
    boxSizing: 'border-box',
  },
  logo: {
    height: '90px',
  },
  text: {
    margin: 0,
  },
};

export default IndiceComponent;
