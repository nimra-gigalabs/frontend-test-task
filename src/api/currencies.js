import { instance } from "."

export const fetchCurrencies = () =>
  new Promise((resolve, reject) => {
    instance
      .get('/currencies')
      .then(response => resolve(response.data))
      .catch(error => reject(error))
  })

export const getConvertedAmount = (code, amount) =>
  new Promise((resolve, reject) => {
    instance
      .get(`/converted_amount?code=${code}&amount=${amount}`, )
      .then(response => resolve(response.data))
      .catch(error => reject(error))
  })
