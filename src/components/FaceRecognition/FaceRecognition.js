import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({imageUrl, box, celebrity}) => {
    return (
        <div className='center ma'>
            <div className='absolute mt2'>
                <img id='inputImage' alt='' src={imageUrl} width='500px' heigh='auto'/>
                <div className='bounding-box' style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.bottomRow}}>
                    <div className='bounding-box-concepts'>
                        <div className='bounding-box__concept'>
                            <span className='concept__name'>{celebrity.celebrity}</span>
                            <span className='concept__prediction-val'>{celebrity.probability}</span>
                        </div>
                    </div>
                </div>   
            </div>
        </div>
    )
}

export default FaceRecognition;