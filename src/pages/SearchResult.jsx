import React, { useState } from 'react'
import icon from '../assets/feather_search.svg';
import EmptyPage from '../components/EmptyPage';

const SearchResult = () => {
    const [searhresult, setSearchresult] = useState({})
  return (
    <>
        <EmptyPage
            image={icon}
            title={'Item not found'}
            subtitle={'Try searching the item with a different keyword.'}
            />
        <div className={`
            absolute w-full rounded-tl-[30px] rounded-tr-[30px] bottom-0 bg-white
            ${ searhresult.lenght > 0 ? 'h-[95%]':'h-0'}
        `}>

        </div>
    </>
  )
}

export default SearchResult