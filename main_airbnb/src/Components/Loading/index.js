import React from 'react'
import { HashLoader } from 'react-spinners';

const Loading = () => {
    return (
        <div className='text-center flex items-center justify-center flex-col h-[100vh]'>
            <HashLoader color="#1EA7FD" size={50} />
        </div>
    )
}

export default Loading