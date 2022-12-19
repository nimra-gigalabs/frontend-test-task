import React, { useEffect, useState } from 'react';
import { fetchCompaigns } from '../../api/compaigns';
import ErrorModal from '../../components/ErrorModal';
import CompaignItem from './CompaignItem';

import './styles.css';

const Compaign = props => {
  const [compaigns, setCompaigns] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    async function fetchData() {
      try {
        let response = await fetchCompaigns();
        setCompaigns(response[0]);
      } catch(error) {
        setErrorMessage(error.response.data);
      }
    }

    fetchData()
  }, [])

  return (
    <>
      <ErrorModal error={errorMessage} onClear={() => setErrorMessage(null)} />
      <div className={'compaign-list'}>
        {
          compaigns.map((compaign) => (
            <CompaignItem compaign={compaign} key={compaign.compaign_id} />
          ))
        }
      </div>
    </>
  )

}

export default Compaign;
