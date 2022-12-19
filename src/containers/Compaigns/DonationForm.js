import React, { useEffect, useState } from 'react';
import { Formik } from 'formik';

import Button from '../../components/Button'
import Modal from '../../components/Modal';
import { postDonation } from '../../api/donations';
import './donationForm.css'
import ErrorModal from '../../components/ErrorModal';
import { fetchCurrencies, getConvertedAmount } from '../../api/currencies';
import Dropdown from '../../components/DropDown';

const DonationForm = ({ showDonate, setShowDonate, compaign, setError }) => {
  const [errorMessage, setErrorMessage] = useState(null)
  const [currencies, setCurrencies] = useState([])
  const [selectedCurrency, setSelectedCurrency] = useState({ symbol: null }) 
  const [convertedGoalAmount, setConvertedGoalAmount] = useState(null)

  const validate = values => {
    const errors = {};
  
    if (!values.nickName) {
      errors.nickName = 'Required';
    } else if (!/^[a-zA-Z](((?!__)[a-zA-Z0-9_])*[a-zA-Z0-9])?$/i.test(values.nickName)) {
      errors.nickName = 'Username not valid';
    }
  
    if (!values.amount) {
      errors.amount = 'Required';
    } else if (values.amount <= 0) {
      errors.amount = 'Must be more than 0';
    } else if (values.amount > 0 && values.amount > convertedGoalAmount) {
      errors.amount = 'You have entered more amount than required or remaining.'
    }
  
    return errors;
  };

  const closeDonateHandler = () => {
    setShowDonate(false)
  }

  const submitHandler = async(values) => {
    try {
      await postDonation(values, compaign.compaign_id);
      setShowDonate(false)
      window.location.reload();
    } catch(error) {
      console.error(error)
      setErrorMessage(error.response.data);
      setShowDonate(false)
    }
  }

  useEffect(() => {
    async function fetchData() {
      try {
        let response = await fetchCurrencies();

        setCurrencies(response[0]);
        setSelectedCurrency(response[0].find((elem) => elem.symbol=='USD'));
      } catch(error) {
        setErrorMessage(error.response.data);
      }
    }

    fetchData()
  },[])

  useEffect(() => {
    async function fetchData() {
      if (selectedCurrency.symbol && compaign && showDonate) {
        const convetedAmount = await getConvertedAmount(selectedCurrency.symbol, (compaign.goal_amount-compaign.collected_amount))

        setConvertedGoalAmount(convetedAmount.amount_in_usd)
      }
    }
    fetchData()
  }, [compaign, selectedCurrency, selectedCurrency.symbol, showDonate])
  
  const setValues = (setFieldValue, donation) => {
    setSelectedCurrency({ symbol: donation.symbol })
    setFieldValue("currencyCode", donation.symbol);
    setFieldValue("currencyId", donation.id);
  }

  const clearError = () => {
    setErrorMessage(null);
    window.location.reload();
  }

  return (
  <>
    <ErrorModal error={errorMessage} onClear={clearError} />
    {showDonate && 
    <Modal
      show={showDonate}
      onCancel={closeDonateHandler}
      header={compaign.name}
      contentClass="compaign_item__modal-content"
    >
      <Formik
        initialValues={{ nickName: '', amount: 0, currencyCode: selectedCurrency?.symbol, currencyId: selectedCurrency?.id }}
        validate={validate}
        onSubmit={(values, actions) => {
          submitHandler(values)
        }}
      >
        {({handleSubmit, values, handleBlur, handleChange, touched, errors, setFieldValue}) => (
            <form>
              <div className='donation_form__field'>
                <label className='donation_form__label'>
                  Nick Name
                  </label>
                <input
                  type='text'
                  name={'nickName'}
                  value={values.nickName}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder='Nick Name'
                  required
                />
                {touched.nickName && errors.nickName ? <div className='donation_form__invalid'>{errors.nickName}</div> : null}
              </div>

              <br/>

              <div className='donation_form__field'>
                <label className='donation_form__label'>
                  Amount
                </label>
                <div className='donation_form__amount'>
                  <div className='donation_form__dropdown'>
                    <Dropdown 
                      itemToString={currency => currency.symbol}
                      items={currencies}
                      value={values.currencyCode}
                      selectedItem={selectedCurrency}
                      onChange={item => {
                        setValues(setFieldValue, item)
                      }}
                    />
                  </div>
                  <div>
                    <input
                      type='number'
                      name={'amount'}
                      value={values.amount}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder='Amount'
                      required
                    />
                    {touched.amount && errors.amount ? <div className='donation_form__invalid'>{errors.amount}</div> : null}
                  </div>
                </div>
              </div>
              <div className='compaign_item__modal-actions donation_form__buttons'>
                <Button inverse onClick={closeDonateHandler}>CLOSE</Button>
                <Button type="submit" className={'submit button'} onClick={handleSubmit}>CONFIRM</Button>
              </div>
            </form>
          )
        }
      </Formik>
    </Modal>
    }
  </>
  )
}

export default DonationForm