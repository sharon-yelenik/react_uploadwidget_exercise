import { useState } from 'react';
import UploadWidget from './uploadWidget';
import {Cloudinary} from "@cloudinary/url-gen";
import { AdvancedImage } from '@cloudinary/react';
import { format } from "@cloudinary/url-gen/actions/delivery";
import { auto } from "@cloudinary/url-gen/qualifiers/format";
import { quality } from "@cloudinary/url-gen/actions/delivery";
import { autoGood } from "@cloudinary/url-gen/qualifiers/quality";
import { source } from "@cloudinary/url-gen/actions/overlay";
import {text} from "@cloudinary/url-gen/qualifiers/source";
import {Position} from "@cloudinary/url-gen/qualifiers/position";
import {TextStyle} from "@cloudinary/url-gen/qualifiers/textStyle";
import {compass} from "@cloudinary/url-gen/qualifiers/gravity";
import { scale } from "@cloudinary/url-gen/actions/resize";

function Upload() {
    const [cloudName, setCloudName] = useState('');
    const [preset, setPreset] = useState('');
    const [uploadedImage, setUploadedImage] = useState('');
    const [textOverlay, setTextOverlay] = useState('');
    const [transformedImageURL, setTransformedImageURL] = useState('');
    const [publicID, setPublicID] = useState('');
  
    const handleCloudName = (e) => {
      setCloudName(e.target.value);
    };
  
    const handlePreset = (e) => {
      setPreset(e.target.value);
    };
  
  
    const handleTextOverlay = (e) => {
      setTextOverlay(e.target.value);
    };
    
  
    const isButtonVisible = cloudName !== '' && preset !=='';
  
    const openWidget = () => {
      const widget = window.cloudinary.createUploadWidget(
        {
          cloudName: cloudName,
          uploadPreset: preset,
        },
        (error, result) => {
          if (!error && result && result.event === "success") { 
            setUploadedImage(result.info.secure_url);
            setPublicID(result.info.public_id);
          }
        }
      );
  
      widget.open();
    };
  
    const handleTransform = () => {
      const cld = new Cloudinary({
        cloud: {
          cloudName: cloudName
        }
      });
  
      const myImage = cld.image(publicID); 
      const tImage=myImage.delivery(format(auto())).delivery(quality(autoGood()))
        .resize(scale().height(200))    
        .overlay(   
          source(
          text(textOverlay, new TextStyle('arial',50))
          .textColor('red')      
          )
          .position(new Position().gravity(compass('south')).offsetY(20)));
      setTransformedImageURL(tImage);
    };

    return (
        <div>
          <h2>Upload Page</h2>
          <p>
            <label>
              Cloud Name:
              <input type="text" value={cloudName} onChange={handleCloudName} />
            </label>
          </p>
          <p>
            <label>
              Preset:
              <input type="text" value={preset} onChange={handlePreset} />
            </label>
          </p>
          {isButtonVisible && <button onClick={openWidget}>Upload</button>}
          <div className="container">
            <UploadWidget />
          </div>
          {uploadedImage && (
            <div>
              <h3>Here's the image you uploaded:</h3>
              <img src={uploadedImage} alt="Uploaded" height="200" />
              <p>
                <label>
                  Text overlay:
                  <input type="text" value={textOverlay} onChange={handleTextOverlay} />
                </label>
                <br/><br/>
                  <button onClick={handleTransform}>Transform</button>
              </p>
            </div>
          )}
          {transformedImageURL && (
            <div>
              <h3>Here's your transformed image:</h3>
                
              <p>
              <AdvancedImage cldImg={transformedImageURL} />
              </p>
            </div>
          )}
        </div>
      );
}
export default Upload;