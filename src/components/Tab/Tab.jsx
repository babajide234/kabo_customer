import { useState, useRef, Children } from 'react';
import { motion } from "framer-motion";

export const Tab = ({ children }) => {
  const [activeTab, setActiveTab] = useState(0);
  const ref = useRef(null);

  return (
    <div className=" w-full h-full overflow-x-auto mt-5 scrollbar-hide">
      <motion.div className="flex px-5 mx-auto overflow-x-auto scrollbar-hide" ref={ref}>
      {
          Children.count(children) > 1 ? (
            Children.map(children, (child, index) => (
              <button
                key={index}
                className={`${
                  index === activeTab
                    ? 'border-b-2 border-gray-900 text-gray-900'
                    : 'text-[#9A9A9D] hover:text-gray-700'
                } px-2 h-8 font-normal text-sm focus:outline-none`}
                onClick={() => setActiveTab(index)}
              >
                {child.props.title}
              </button>
              ))
            ) : (
              <button
                className={`${
                  activeTab === 0
                    ? 'border-b-4 border-primary text-primary'
                    : 'border-b border-gray-500 text-[#9A9A9D] hover:text-gray-700'
                } w-fit px-4 font-bold text-lg focus:outline-none`}
                onClick={() => setActiveTab(0)}
              >
                {children.props.title}
              </button>
          )
      }
      </motion.div>  
      <div className=" h-full flex overflow-x-auto w-full scrollbar-hide py-10">
        {
          Children.count(children) > 1 ? (
            children[activeTab]
          ) : (
            children
          )
        }
      </div>
    </div>
  );
};

export const TabPanel = ({ children }) => <div className=' flex w-full text-center'>{children}</div>;


