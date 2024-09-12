import api from '../api'
import React, { useState, useEffect, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

// Components
import MainBody from '../MainBody';

// Styling
import { Collapse } from "@material-tailwind/react";
import { CloudUpload } from 'lucide-react';

const ReturnOrder = () => {
  const location = useLocation();
  const { order } = location.state || {};
  const [collapseStates, setCollapseStates] = useState({});
  const [imgFiles, setImgFiles] = useState({});

  const toggleCollapse = (op) => {
    setCollapseStates((prevStates) => ({
      ...prevStates,
      [op]: !prevStates[op]
    }));
  };

  const indexImage = (op, file) => {
    setImgFiles((prev) => ({
      ...prev,
      [op]: {
        ...prev[op],  // Preserve the existing images for this op
        [Object.keys(prev[op] || {}).length]: file  // Add the new image at the next index
      }
    }));
  };
  
  const uploadImg = (e) => {
    const op_id = e.target.id.match(/\d{1,2}/)[0];
    for(var i = 0; i < e.target.files.length; i++){
      indexImage(op_id, e.target.files[i])
    }
  }

  useEffect(() => {
    Object.keys(imgFiles).forEach((op) => {
      Object.values(imgFiles[op]).forEach((file, i) => {
        var reader = new FileReader();
        var url = reader.readAsDataURL(file);
        reader.onloadend = function (e) {
          var id = `${op}_upload_${i}`;
          var img = document.getElementById(id);
          console.log("img", img)
          img.src = reader.result
        }
      })
    })
  }, [imgFiles])

  return (
    <MainBody>
      <div className='flex flex-col justify-center items-center mt-10 w-full space-y-6'>
        <h1 className="pv-h1 mt-2">Return</h1>
        <div id="column-headers" className='w-[70%] flex font-bold text-gray-600 bg-gray-100 text-center p-2 rounded-tl-lg rounded-tr-lg'>
          <p className="w-2/4">ITEMS</p>
          <p className="w-1/4">QTY</p>
          <p className="w-1/4">REFUNDABLE AMOUNT</p>
        </div>
        <div key={order} className="w-[70%] border rounded-bl-lg rounded-br-lg p-4 !mt-0">
        
          {order.order_products.map((op) => (
            <div key={op.id}>
              <div className="flex w-full py-2">
                <div className="flex w-2/4 items-center">
                  <div className="flex items-center me-4">
                    <input onChange={() => toggleCollapse(op.id)} type="checkbox" id={op.id} value={op.id} className="w-4 h-4 bg-colour-4"/>
                  </div>
                  <img src={`/src/assets/images/${op.product_info.main_img}`} className="w-[4rem] h-[4rem] mr-4 border border-gray-100 rounded-sm flex-shrink-0" alt={op.product_info.name}/>
                  <p className="text-gray-600">{op.product_info.name}</p>
                </div>

                <div className="flex w-1/4 justify-center items-center">
                  <select className="w-1/5 h-3/5 p-2 border border-gray-300 rounded-md">
                    {Array.from({ length: op.quantity }, (_, i) => (
                      <option key={i} value={i + 1}>{i + 1}</option>
                    ))}
                  </select>
                </div>

                <div className="flex w-1/4 justify-center items-center">
                  <p>hi</p>
                </div>

              </div>
              <Collapse open={collapseStates[op.id] || false}>
                <div className="flex w-full p-4 mt-2 bg-gray-50">
                  <div className='flex flex-col w-3/5 '>
                    <h2 className="text-md text-gray-600 font-bold">Order Return Request</h2>
                    <input type='text' className="w-[95%] rounded-md border-[1.5px] border-gray-300 h-10 p-2 focus:border-2 focus:border-colour-4 focus:outline-none"/>
                    <h2 className="text-md text-gray-600 font-bold mt-4">Reason for Return</h2>
                    <textarea className="w-[95%] rounded-md border-[1.5px] border-gray-300 h-[10rem] p-2 focus:border-2 focus:border-colour-4 focus:outline-none"></textarea>
                  </div>

                  <div className='flex flex-col w-2/5 justify-end'>
                    <div className="flex w-full h-full">
                      <label htmlFor={`dropzone-file${op.id}`} className="flex flex-col items-center justify-center w-full h-5/6 border-2 border-colour-3 border-dashed rounded-lg cursor-pointer bg-gray-50">
                          <div className="flex flex-col items-center py-">
                              <CloudUpload className="w-10 h-10 text-colour-5"/>
                              <p className="mb-2 text-sm text-colour-5"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                              <p className="text-xs text-colour-5">SVG, PNG, JPG (MAX. 800x400px)</p>
                          </div>
                          <input 
                            id={`dropzone-file${op.id}`}
                            type="file"
                            accept=".png, .jpeg, .jpg"
                            multiple
                            onChange={uploadImg}
                            className="hidden" />
                      </label>
                    </div> 
                    <div className="flex w-full space-x-4">
                      <div className="w-1/4 aspect-square bg-colour-7">
                        <img id={`${op.id}_upload_0`}/>
                      </div>
                      <div className="w-1/4 aspect-square bg-colour-7">
                        <img id={`${op.id}_upload_1`}/>

                      </div>
                      <div className="w-1/4 aspect-square bg-colour-7">
                        <img id={`${op.id}_upload_2`}/>

                      </div>
                    </div>
                  </div>
                </div>
              </Collapse>
              <hr className='border-gray-300'/>
            </div>
          ))}
        </div>
      </div>
    </MainBody>
  )
}

export default ReturnOrder