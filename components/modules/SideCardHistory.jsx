import {Fragment} from 'react';
import Card from './Card';
import styles from '../../styles/history.module.css';

const sideCardHistory = () => {
  return (
    <Fragment>
      <div className={styles.arrival}>
        <span className={styles.titleSpan}>New Arrival</span>
        <Card imgsrc="/" title="Lambhorghini" subtitle="South Jakarta" />
      </div>
    </Fragment>
  );
};

export const getStaticPaths = async () => {
  const {data} = await axios.get('https://jsonplaceholder.typicode.com/users/');
  const dataUser2 = data.map((item) => ({params: {id: item.id.toString()}}));
  // ket: data paths harus sperti dibawah
  const paths = [{params: {id: '1'}}, {params: {id: '2'}}, {params: {id: '3'}}];
  return {
    paths: paths,
    fallback: true,
  };
};

export const getStaticProps = async (context) => {
  const id = context.params.id;
  const {data} = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`);
  return {
    props: {
      user: data,
    },
  };
};

export default sideCardHistory;
