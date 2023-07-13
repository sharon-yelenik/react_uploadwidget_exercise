import { useEffect, useRef } from 'react';
import Upload from './App';


const UploadWidget = () => {
    const cloudinaryRef = useRef();
    useEffect(() => {
        cloudinaryRef.current =window.cloudinary;
    }, [])
}

export default UploadWidget;