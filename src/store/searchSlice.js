import { create } from "zustand";
import { postrequest } from "../api/requests";

const searchStore = create(
    (set,get) =>({
            search: '',
            searchResult: null,
            loading: false,
            searchModal:false,
            setSearch:(value)=>{
                 set(state => ({ ...state, search: value}))
            },
            changeSearchModal:(value)=>{
                 set(state => ({ ...state, searchModal: value}))
            },
            getSearchResult:(data) => {
                set(state => ({ ...state, loading: true }));
                postrequest('store/search', data).then(
                    (res)=>{
                        console.log(res);
                        if( res.data.status == 'success'){
                            set(state => ({ ...state, searchResult: res.data.data }))
                            set(state => ({ ...state, loading: false }))
                            set(state => ({ ...state, searchModal: true }))
                        } else {
                            set(state => ({ ...state, loading: false }))
                        }
                    }
                )
            }
        }
    )
)

export default searchStore;