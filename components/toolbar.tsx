import styles from '../styles/toolbar.module.css'
function Toolbar() {
  return ( 
    <nav className={styles.container} >
      <button>Save</button>
      <button>Undo</button>
      <button>Redo</button>
      <button>Export</button>
      <button>Import</button>
      <button>View</button>
    </nav>
  );
}

export default Toolbar;