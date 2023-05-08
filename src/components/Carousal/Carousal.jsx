import React, { useState } from 'react';

import AliceCarousel from 'react-alice-carousel';

export const Carousel = ({ children }) => {


    return (
        <>
            <div className=" w-full flex overflow-x-auto">
                {children}
            </div>
        </>
    );
  };