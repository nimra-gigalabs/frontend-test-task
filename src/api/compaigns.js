import { instance } from "."

export const fetchCompaigns = () =>
  new Promise((resolve, reject) => {
    instance
      .get('/compaigns')
      .then(response => resolve(response.data))
      .catch(error => reject(error))
  })