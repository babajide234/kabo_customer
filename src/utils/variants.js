export const container = {
    hidden: { opacity:0 },
    show: {
      opacity: 1,
      transition: {
        delayChildren: 0.3
      }
    }
  }
  
export const item = {
    hidden: { y:-2000, opacity:0 },
    show: { y:0, opacity:1 }
}

export const scaleDown ={
    hidden: {
        scale: 1,
        x:0,
        y:0
    },
    show: {
        x:280
    },
}
export const leftToRight ={
    hidden: {
        x:'-100%',
        y:0
    },
    show: {
        x:0
    },
}

export const headerVariants = {
  fixed: {
    position: 'fixed',
    top: 0,
    left: 0,
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    paddingBlock: '10px',
    transition: { duration: 0.3 },
  },
  unfixed: {
    position: 'relative',
    top: null,
    backgroundColor: null,
    boxShadow: null,
    padding: null,
    transition: { duration: 0.3 },
  },
};