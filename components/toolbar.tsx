import Link from 'next/link';
import styles from '../styles/toolbar.module.css'

type prop = {
  save:()=>void,
}

function Toolbar({save}:prop) {
  return ( 
    <nav className={styles.container} >
      <button onClick={save}>Save</button>
      <button>Undo</button>
      <button>Redo</button>
      <button>Export</button>
      <button>Import</button>
       <button><Link href='./Customer'><a target='_blank'>View</a></Link></button>
    </nav>
  );
}

export default Toolbar;