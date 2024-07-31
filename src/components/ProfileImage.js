import React from 'react';
import defaultImage from '../images/profile.png';

const ProfileImage = ({ email, width, height, tempImage, imageCss }) => {

    let imageSource = defaultImage;

    const onErrorImage = (event) => {
        event.target.src = defaultImage;
    }

    return (
        <img
            className={"rounded-circle " + imageCss} 
            width={width} height={height}
            alt={email + " profile"}
            src={ tempImage || imageSource}
            onError = {onErrorImage}>
        </img>
    );
};

export default ProfileImage;