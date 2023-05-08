import { create } from "zustand";

const useAppStore = create(
    (set,get) =>({
            sidebar: false,
            toggleSidebar: ()=>{
                set(state => ({ ...state, sidebar: !get().sidebar }))
            },
            closeSidebar:()=>{
                set(state => ({ ...state, sidebar: false }))
            }
        }
    )
)

export default useAppStore;