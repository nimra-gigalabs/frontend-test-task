import { instance } from "."

export const postDonation = (body, compaign_id) => {
  return (new Promise((resolve, reject) => {
    instance
      .post(`/compaigns/${compaign_id}/donations`, body)
      .then(response => resolve(response))
      .catch(error => reject(error))
  }))
}