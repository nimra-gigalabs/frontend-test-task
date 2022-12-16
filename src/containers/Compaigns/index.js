import React, { useEffect, useState } from 'react';
import { fetchCompaigns } from '../../api/compaigns';
import CompaignItem from './CompaignItem';

import './styles.css';

const Compaign = props => {
  const [compaigns, setCompaigns] = useState([])

  useEffect(() => {
    async function fetchData() {
      let response = await fetchCompaigns();

      setCompaigns(response.data);
    }

    fetchData()
  }, [])

  return (
    <>
      <div className={'compaign-list'}>
        {
          compaigns.map((compaign) => (
            <CompaignItem compaign={compaign} key={compaign.uid} />
          ))
        }
      </div>
    </>
  )

}

export default Compaign;
