import {Fragment} from 'react';
import styles from '../../styles/SearchHistory.module.css';
import {useState} from 'react';

const SearhHistory = (props) => {
  const [dropdown, setdropdown] = useState(0);
  const handleDropdown = () => {
    if (dropdown === 0) {
      setdropdown(1);
    } else {
      setdropdown(0);
    }
  };

  const handleFilter = (e) => {
    console.log(e.target.id);
    setdropdown(0);
  };
  return (
    <Fragment>
      <div className={`${props.className} ${styles.content}`}>
        <input type="text" placeholder="Search History" name={props.name} className={styles.input} />
        <span className={styles.span} onClick={() => handleDropdown()}>
          Filter
        </span>
        {dropdown === 1 && (
          <div className={styles.dropdown}>
            <div onClick={(e) => handleFilter(e)} className={styles.dropmenu}>
              <span id="type">Type</span>
            </div>
            <div onClick={(e) => handleFilter(e)} className={styles.dropmenu}>
              <span  id="time">Date Added</span>
            </div>
            <div onClick={(e) => handleFilter(e)} className={styles.dropmenu}>
              <span id="name">Name</span>
            </div>
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default SearhHistory;
