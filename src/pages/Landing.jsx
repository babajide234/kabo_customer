import { motion,AnimatePresence } from 'framer-motion';
import React, { useState } from 'react'
import logo from '../assets/logo.jpeg'
import Buttons from '../components/buttons/Buttons';

const Step = ({ currentStep, stepNumber, children }) => {
  return currentStep === stepNumber ? (
    <div className='w-full h-full'>{children}</div>
  ) : null;
};

const StepIndicator = ({ currentStep, totalSteps }) => {
  return (
    <div className="flex justify-center w-full pb-8">
      <div className="flex justify-between w-14">
        {Array.from({ length: totalSteps }, (_, index) => (
          <span
            key={index}
            className={`w-3 h-3 block rounded-full ${
              index + 1 === currentStep ? 'bg-primary' : 'bg-gray-400'
            }`}
          ></span>
        ))}
      </div>
    </div>
  );
};

const Landing = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const handleNext = ()=>{
    
    if( currentStep == 3){

    } else {
      setCurrentStep(currentStep + 1);
    }

  }

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        // className="bg-hero-bg w-full h-screen bg-cover py-11 px-16 flex flex-col justify-between"
        className=" w-full h-screen relative bg-primary flex flex-col justify-end "
      >
          <div className=" flex flex-col w-full h-[70%] bg-default absolute top-0 rounded-br-3xl rounded-bl-3xl">
            <Step currentStep={currentStep} stepNumber={1}>
              <div className=" w-full h-full px-10 flex flex-col justify-center items-center">
                  <img src={logo} alt="" className=" w-36 h-36 mb-5" />
                  <h1 className=" text-lg text-primary font-bold text-center">Lorem ipsum dolor sit amet.</h1>
              </div>
            </Step>
            <Step currentStep={currentStep} stepNumber={2}>
              <div className=" w-full flex flex-col justify-center items-center">
                  <img src={logo} alt="" className=" w-36 h-36" />
                  <h1 className=" text-xl text-primary font-bold ">Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis delectus mollitia corporis expedita! Aperiam vitae nihil doloribus sed atque sunt voluptatum cum autem quas amet accusamus, tempore assumenda! Molestias, a?</h1>
              </div>
            </Step>
            <Step currentStep={currentStep} stepNumber={3}>
              <div className=" w-full flex flex-col justify-center items-center">
                  <img src={logo} alt="" className=" w-36 h-36" />
                  <h1 className=" text-3xl text-primary font-bold ">Food for Everyone 3</h1>
              </div>
            </Step>
            <StepIndicator currentStep={currentStep} totalSteps={3} />
          </div>
          <div className=" w-2/4 mx-auto mb-10">
            <Buttons
              type={'default'}
              to={'/shop'}
              btn={currentStep == 3 ? false : true}
              onClick={handleNext}
            > { currentStep == 3 ? "Continue" :"Next"}</Buttons>
          </div>
      </motion.div>
    </AnimatePresence>
  )
}

export default Landing;