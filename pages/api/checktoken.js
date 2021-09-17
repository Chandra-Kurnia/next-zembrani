import axios from 'axios';

const checktoken = (req, res) =>
  new Promise((resolve, reject) => {
    if (req.method === 'GET') {
      axios
        .get(`${process.env.API_SERVER}/user/checktoken`, {headers: {cookie: req.headers.cookie}})
        .then((result) => {
          res.status(200).json({data: result.data.data});
          resolve();
        })
        .catch((err) => {
          console.log(err);
          reject();
        });
    }
  });

export default checktoken;
