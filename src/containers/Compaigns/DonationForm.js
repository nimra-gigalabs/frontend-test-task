import React from 'react';

const DonationForm = ({ inputField, handleChange }) => (
  <>
    <label>
      NickName:
      <input
        type='text'
        name={'nickName'}
        value={inputField.nickName}
        onChange={handleChange}
        placeholder='Nick Name'
      />
    </label>

    <br/>

    <label>
      Amount:
      <input
        type='number'
        name={'amount'}
        value={inputField.amount}
        onChange={handleChange}
        placeholder='Amount'
      />
    </label>
  </>
)

export default DonationForm