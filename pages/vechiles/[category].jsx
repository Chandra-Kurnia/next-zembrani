/* eslint-disable react-hooks/exhaustive-deps */
import {useRouter} from 'next/router';
import {Fragment} from 'react';
import CardWrapper from '../../components/modules/CardWrapper';
import Card from '../../components/modules/Card';
import Layout from '../../components/Layout';
import {useEffect, useState} from 'react';
import axios from 'axios';
import Image from 'next/image';
import search from '../../assets/icons/search.png';
import styles from '../../styles/vechiles.module.css';
import Pagination from 'rc-pagination';
import 'rc-pagination/assets/index.css';
import {useSelector} from 'react-redux';

const Category = (props) => {
  const {query} = useRouter();
  const [vehicles, setvehicles] = useState(props.vehicles.data);
  const [keyword, setkeyword] = useState('');
  const [order, setorder] = useState('DESC');
  const [fieldOrder, setfieldOrder] = useState('vehicle_id');
  const [pagination, setpagination] = useState();
  const [limit, setlimit] = useState(5);
  // console.log(props.vehicles.data);

  useEffect(() => {
    axios
      .get(
        `${process.env.API_SERVER}/vehicle/?limit=${limit}&type=${
          query.category
        }&keyword=${keyword}&order=${order}&fieldOrder=${fieldOrder}&page=${pagination && pagination.currentPage}`
      )
      .then((result) => {
        setvehicles(result.data.data);
        setpagination(result.data.pagination);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [keyword, order, fieldOrder, pagination && pagination.currentPage, limit, query.category]);

  const handleOrder = () => {
    if (order === 'DESC') {
      setorder('ASC');
    } else {
      setorder('DESC');
    }
  };

  const handlePagination = (e) => {
    setpagination({...pagination, currentPage: e});
  };

  const handlefieldOrder = (e) => {
    setfieldOrder(e.target.value);
  };

  const handleLimit = (e) => {
    setlimit(e.target.value);
  };

  return (
    <Fragment>
      <Layout vechileType="navActive" title={`Zembrani | ${query.category}`} {...props}>
        <div className="container">
          <div className="input-group ms-0 ms-md-2">
            <input
              onChange={(e) => setkeyword(e.target.value)}
              type="text"
              placeholder="Search vehicle (ex. cars, cars name)"
              className={styles.search}
              aria-describedby="search"
            />
            <button className={styles.btnSearch} id="basic-addon2" itemID="search" disabled>
              <Image src={search} alt="search-logo" width="15px" height="15px" />
            </button>
          </div>
          <div className="mt-3 container">
            <div className="row">
              <div className="col-6 col-md-4 ps-0 ps-md-2 col-lg-2">
                <select onChange={handleOrder} className="form-select" aria-label="Default select example">
                  <option value="1">Ascending</option>
                  <option value="2" selected>
                    Descending
                  </option>
                </select>
              </div>
              <div className="col-6 col-md-4 pe-2 col-lg-2">
                <select
                  className="form-select"
                  aria-label="Default select example"
                  onChange={(e) => handlefieldOrder(e)}
                >
                  <option value="vehicle_id" selected>
                    Time
                  </option>
                  <option value="price">Price</option>
                </select>
              </div>
              <div className="col-12 col-md-4 mt-2 ps-0 mt-md-0 mt-lg-0 col-lg-2">
                <select className="form-select" aria-label="Default select example" onChange={(e) => handleLimit(e)}>
                  <option value="2">2 / Page</option>
                  <option value="5" selected>
                    {' '}
                    5 / page
                  </option>
                  <option value="10">10 / page</option>
                </select>
              </div>
              <div className="col-12 ps-0 ps-md-2 ps-lg-2 mt-3 col-md-4 mt-md-0 col-lg-6 mt-md-2 mt-lg-2">
                {pagination && (
                  <Pagination
                    onChange={(e) => handlePagination(e)}
                    pageSize={pagination.limit}
                    current={pagination.currentPage}
                    total={pagination.count_data}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
        <CardWrapper title={query.category} textSee="d-none">
          {vehicles
            ? vehicles.map((vehicle) => (
                <Card
                  key={vehicle.vehicle_id}
                  id={vehicle.vehicle_id}
                  imgsrc={vehicle.image}
                  title={vehicle.vehicle_name}
                  subtitle={vehicle.location_name}
                />
              ))
            : 'Data Not Found'}
        </CardWrapper>
      </Layout>
    </Fragment>
  );
};

export default Category;

// export const getStaticPaths = async () => {
//   const result = await axios.get(`${process.env.API_SERVER}/vehicle/?type=cars&limit=5`);
//   result.data.data.map((item) => ({params: {category: item.type_name}}));
//   const paths = [{params: {category: 'cars'}}];
//   return {
//     paths: paths,
//     fallback: true,
//   };
// };

// export const getStaticProps = async (context) => {
//   const category = context.params.category;
//   const {data} = await axios.get(`${process.env.API_SERVER}/vehicle/?type=${category}&limit=5`);
//   return {
//     props: {
//       vehicles: data,
//     },
//   };
// };

export const getServerSideProps = async(ctx) => {
  const category = ctx.params.category;
  const resVehicle = await axios.get(`${process.env.API_SERVER}/vehicle/?type=${category}&limit=5`)
  return{
    props: {
      vehicles: resVehicle.data.data
    }
  }
}