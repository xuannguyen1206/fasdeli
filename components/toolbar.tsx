import Link from 'next/link';
import styles from '../styles/toolbar.module.css'

type prop = {
  save:()=>void,
  undo:()=>void,
  redo:()=>void,
}

function Toolbar({undo,save,redo}:prop) {
  return ( 
    <nav className={styles.container} >
      <button onClick={save}>Save</button>
      <button onClick={undo}>Undo</button>
      <button onClick={redo}>Redo</button>
      <button><Link href='./Customer'><a target='_blank'>View</a></Link></button>
    </nav>
  );
}

export default Toolbar;