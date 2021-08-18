import {Fragment} from 'react';
import Layout from '../../components/Layout';
import Image from 'next/image';
import Back from '../../assets/icons/blackBack.png';
import {useRouter} from 'next/router';
import InputVehicle from '../../components/base/InputVehicle';
import InputVehicle2 from '../../components/base/InputVehicle2';
import styles from '../../styles/AddVehicle.module.css';
import {useState} from 'react';
import cam from '../../assets/icons/cam.png';
import addmore from '../../assets/icons/addMore.png';
import vehicle from '../../assets/img/vechiles/detail.png';
import ButtonPay from '../../components/base/ButtonPay';

const AddVehicle = () => {
  const [dropdown, setdropdown] = useState(0);
  const [status, setstatus] = useState('Select status');
  const {back} = useRouter();
  const handleDrop = () => {
    if (dropdown === 0) {
      setdropdown(1);
    } else {
      setdropdown(0);
    }
  };

  const changeStatus = (e) => {
    setstatus(e.target.textContent);
    setdropdown(0);
  };
  return (
    <Fragment>
      <Layout title="Zembrani | Add Vehicle">
        <div className="container mb-5 pb-5">
          <div className="d-flex align-items-center mt-3 mb-lg-5 mb-md-4 mb-4">
            <Image
              src={Back}
              alt="back Icon"
              width="20px"
              height="30px"
              style={{cursor: 'pointer'}}
              onClick={() => back()}
            />
            <span className="fw-bold d-block ms-3">Add new item</span>
          </div>
          <div className="row">
            <div className="col-12 col-md-6 col-lg-7">
              <InputVehicle name="vehicleName" placeholder="Name (max up to 50 words)" />
              <label htmlFor="img1" className={styles.cam}>
                <div className={styles.cam}>
                  <Image src={cam} alt="cam" />
                </div>
              </label>
              <div className="row mt-3">
                <div className="col-12 col-md-12 col-lg-6">
                  <label htmlFor="img2" className={styles.subcam}>
                    <div className={styles.subcam}>
                      <Image src={cam} alt="cam" />
                    </div>
                  </label>
                </div>
                <div className="col-12 col-md-12 col-lg-6 mt-3 mt-md-3 mt-lg-0">
                  <label htmlFor="img3" className={styles.subcam}>
                    <div className={styles.subcam}>
                      <Image src={addmore} alt="cam" />
                    </div>
                  </label>
                </div>
              </div>
              <input className="d-none" type="file" name="" id="img1" />
              <input className="d-none" type="file" name="" id="img2" />
              <input className="d-none" type="file" name="" id="img3" />
            </div>
            <div className="col-12 col-md-6 col-lg-5">
              <InputVehicle name="location" placeholder="Location" />
              <InputVehicle name="description" placeholder="Description (max up to 150 words)" />
              <InputVehicle2 name="price" placeholder="Type the price" title="Price : " />
              <span className={styles.inputTitle}>Status : </span>
              <span onClick={() => handleDrop()} className={styles.status}>
                {status}
              </span>
              {dropdown === 1 && (
                <div className={styles.dropdown}>
                  <div onClick={(e) => changeStatus(e)} className={styles.dropmenu}>
                    <span className={styles.avaiable}>Avaiable</span>
                  </div>
                  <div onClick={(e) => changeStatus(e)} className={styles.dropmenu}>
                    <span className={styles.full}>Full Booked</span>
                  </div>
                </div>
              )}
              <InputVehicle2 name="stock" placeholder="Insert stock" title="Stock : " />
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-12 col-md-6 col-lg-6">
                <ButtonPay text='category' className='w-100 bg-black'/>
            </div>
            <div className="col-12 col-md-6 col-lg-6 mt-3 mt-md-0 mt-lg-0">
                <ButtonPay text='Save' className='w-100 bg-orange'/>
            </div>
          </div>
        </div>
      </Layout>
    </Fragment>
  );
};

export default AddVehicle;
