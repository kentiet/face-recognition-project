import React from 'react'
// import './ImageLinkForm.css'

const Rank = ({name, entries}) => {
    return (
        <div>
            <div className='white f3'>
                {name}
            </div>
            <div className='white f1'>
                {entries}
            </div>
        </div>
    );
}

export default Rank;