import React from 'react'

const FaceRecognition = ({imgUrl}) => {
    return (
        <div className='center'>
            <img alt='' src={imgUrl} />
        </div>
    );
}

export default FaceRecognition;