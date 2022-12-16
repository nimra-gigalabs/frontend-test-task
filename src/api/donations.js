import { instance } from "."

export const postDonation = (body) =>
  new Promise((resolve, reject) => {
    instance
      .post('/donations', body)
      .then(response => resolve(response))
      .catch(error => reject(error))
  })