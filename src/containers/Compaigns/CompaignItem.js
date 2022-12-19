import React, { useEffect, useState } from 'react'

import Card from '../../components/Card'
import Button from '../../components/Button'
import DonationForm from './DonationForm';
import './compaignItem.css'
import Aos from 'aos';
import 'aos/dist/aos.css'
import ErrorModal from '../../components/ErrorModal';

const CompaignItem = props => {
  const [error, setError] = useState();
  const [showDonate, setShowDonate] = useState(false)

  const compaign = props.compaign;

  const openDonateHandler = () => setShowDonate(true)


  useEffect(() => {
    Aos.init({duration: 1000})
  }, [])

  const clearError = (e) => {
    e.preventDefault();
    setError(null)
  }

  useEffect(() => {
    if (showDonate || !!error) {
      document.getElementById('root').style.filter = 'blur(5px)'
    } else {
      document.getElementById('root').style.filter = ''
    }
  }, [showDonate, error])

  const formatDate = (date) => (new Date(date).toLocaleDateString())

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      <DonationForm
        showDonate={showDonate}
        setShowDonate={setShowDonate}
        compaign={compaign}
        setError={setError}
      />

      <li className="compaign_item" data-aos='fade-up'>
        <Card className={`compaign_item__content`}>
          <div className="compaign_item__info">
            <h2>{compaign.name}</h2>
            <p>{compaign.description}</p>
            <p><strong>Amount: </strong> ${compaign.goal_amount}</p>
            <p><strong>Remaining Amount:</strong> ${compaign.goal_amount - compaign.collected_amount}</p>
            <p><strong>Valid till: </strong> {formatDate(compaign.expiry_date)}</p>
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