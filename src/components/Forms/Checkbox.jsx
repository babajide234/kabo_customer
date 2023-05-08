import React, { useState } from 'react'

const Checkbox = ({label, ...rest}) => {
    const [isChecked, setIsChecked] = useState(false);

    const handleCheck = () => {
      setIsChecked(!isChecked);
    };
  return (

    <div className="flex items-center">
        <label className="inline-flex items-center cursor-pointer w-full">
            <div className="relative">
                <input
                    type="checkbox"
                    className="hidden"
                    checked={isChecked}
                    onChange={handleCheck}
                />
                <div className={`w-6 h-6 border-2 border-solid ${ isChecked ? 'border-primary': 'border-gray-500'}  rounded-full relative flex justify-center items-center`}>
                    <div className={`w-3 h-3 bg-primary rounded-full ${ !isChecked && 'hidden' }`}></div>
                </div>
            </div>
            <span className="ml-2 text-gray-700 font-bold ">{label}</span>
        </label>
    </div>
  )
}

export default Checkbox