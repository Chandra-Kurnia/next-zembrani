import axios from 'axios';

const addvehicle = (req, res) => {
  if (req.method === 'POST') {
    axios
      .post(`${process.env.API_SERVER}/vehicle`, req.body)
      .then((result) => {
        res.status(200).json({
          data: result.data.data,
        });
      })
      .catch((err) => {
        res.status(400).json({
          error: err.response.data,
        });
      });
  }
};

export default addvehicle;
