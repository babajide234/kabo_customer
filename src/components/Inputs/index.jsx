import { motion } from 'framer-motion';
import React, {useState} from 'react'
import { FiSearch } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import searchStore from '../../store/searchSlice';
import useUserStore from '../../store/userSlice';

export const AuthInputs = ({placeholder, ...rest}) => {
  return (
    <div className="relative mt-10 z-0 mb-10 last-of-type:mb-9">
        <input 
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-dark dark:border-gray-600 dark:focus:border-primary focus:outline-none focus:ring-0 focus:border-primary peer"
            {...rest}
        />
        <label htmlFor="floating_standard" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-primary peer-focus:dark:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">{placeholder}</label>
    </div>
  )
}

export const SearchInput =({...rest})=>{
    const [searchTerm, setSearchTerm] = useState("");
    const [isFocused, setIsFocused] = useState(false);
  
    const getsearchResults = searchStore((state)=> state.getSearchResult)
    const setSearch = searchStore((state)=> state.setSearch)
    const token = useUserStore((state)=> state.token)

    const handleInputChange = (event) => {
      setSearchTerm(event.target.value);
    };

    const handleSearch = () => {
      const data = {
          token: token,
          query: searchTerm
      };

      getsearchResults(data);
    };

    const handleKeyDown = (event) => {
      if (event.keyCode === 13) {
        setSearch(searchTerm);
        handleSearch();
        console.log("searchTerm: ", searchTerm)
      }
    };

    return (
        <motion.div
        >
            <motion.div 
                className={`flex justify-between items-center rounded-full w-[275px] mx-auto bg-[#EFEEEE] px-5 py-1
            `}>
                <span className=" text-2xl text-gray-400">
                    <FiSearch/>
                </span>
                
                <input 
                    type="text"
                    placeholder="Search your food"
                    value={searchTerm}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}

                    className="w-full py-2 outline-none border-none bg-[#EFEEEE] px-3 text-sm placeholder:text-sm focus"
                />
                
            </motion.div>
         
        </motion.div >

    )
}