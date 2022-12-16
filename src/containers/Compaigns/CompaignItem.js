import React, { useEffect, useState } from 'react'

import Card from '../../components/Card'
import Button from '../../components/Button'
import Modal from '../../components/Modal';
import DonationForm from './DonationForm';
import './compaignItem.css'
import Aos from 'aos';
import 'aos/dist/aos.css'
import { postDonation } from '../../api/donations';
import ErrorModal from '../../components/ErrorModal';

const CompaignItem = props => {
  const [error, setError] = useState();
  const [showDonate, setShowDonate] = useState(false)
  const [inputField, setInputField] = useState({
    nickName: '',
    amount: 0,
  })

  const compaign = props.compaign;

  const openDonateHandler = () => setShowDonate(true)

  const closeDonateHandler = (e) => {
    e.preventDefault()
    setShowDonate(false)
  }

  useEffect(() => {
    Aos.init({duration: 1000})
  }, [])

  const handleChange = (e) => {
    setInputField( {[e.target.name]: e.target.value} )
  }

  const handleSubmit = async(e) => {
    let response = await postDonation(inputField);
    e.preventDefault();
    
    setShowDonate(false)
    if (response.status !== '201') {
      setError('Operation not performed!')
    }
  }

  return (
    <>
      <ErrorModal error={error} onClear={() => setError(null)} />
      <Modal
        show={showDonate}
        onCancel={closeDonateHandler}
        header={compaign.name}
        contentClass="compaign_item__modal-content"
        footerClass="compaign_item__modal-actions"
        footer={
          <>
            <Button inverse onClick={closeDonateHandler}>CLOSE</Button>
            <Button type="submit" onClick={handleSubmit}>CONFIRM</Button>
          </>
        }
      >
        <form onSubmit={handleSubmit}>
          <DonationForm handleChange={handleChange} inputField={inputField} />
        </form>
      </Modal>
      <li className="compaign_item" data-aos='fade-up'>
        <Card className={`compaign_item__content`}>
          <div className="compaign_item__info">
            <h2>{compaign.name}</h2>
            <p>{compaign.description}</p>
            <p>{compaign.goal_amount}</p>
          </div>
          <div className="compaign_item__actions">
            <Button inverse onClick={openDonateHandler}>
              Donate
            </Button>
          </div>
        </Card>
      </li>
    </>
  );
};

export default CompaignItem;