import React from 'react'

import Icon from '../assets/ector.svg'

import EmptyPage from '../components/EmptyPage'
const History = () => {
  return (
    <>
        <EmptyPage
            image={Icon}
            title={'No history yet'}
            subtitle={'Hit the orange button down below to Create an order'}
        />
    </>
  )
}

export default History