'use client'
import { useCustomContext } from '@/contextApi/Context';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'
import { BiSearch } from 'react-icons/bi';
import Letters from './Letters';

export default function SearchBar() {
    const { searchItem, setSearchItem, query, setQuery } = useCustomContext();
    const router = useRouter();

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setSearchItem(e.target.value);
        setQuery(e.target.value);
    }

    useEffect(() => {
        router.push(`/search/${query}`);
    }, [query])

    return (
        <>
            <div className='bg-slate-950 sticky left-0 top-0 py-3 w-full z-50 '>
                <form className='text-center'>
                    <div className='relative w-[270px] sm:w-[400px] md:w-[350px] ml-auto sm:mx-auto'>
                        <div className='absolute left-[20px] top-1/2 -translate-y-1/2 text-white text-xl'>
                            <BiSearch />
                        </div>
                        <label htmlFor='1'></label>
                        <input id='1' aria-label='search' onChange={handleChange} value={searchItem} className='w-full text-[12px] sm:text-[16px] border-white border bg-slate-900 text-white outline-white rounded-full px-12 py-2' type="search" placeholder='What do you want to listen?' />
                    </div>
                </form>
            </div>

            {searchItem.length === 0 && <Letters str='You can search by Artist, Album, Track name.' />}
        </>
    )
}
