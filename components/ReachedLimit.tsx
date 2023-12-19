import React from 'react'
import Letters from './Letters'

const ReachedLimit = () => {
    return (
        <div className='text-center'>
            <p className='text-white font-bold text-lg sm:text-2xl mt-20 mb-5'>The Api calls have exceeded the rate limit for my plan by the API provider.</p>
            <Letters str='The Api will be updated in a few minutes...' />
        </div>)
}

export default ReachedLimit