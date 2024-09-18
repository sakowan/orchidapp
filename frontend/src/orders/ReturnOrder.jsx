import api from '../api'
import React, { useState, useEffect, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

// Components
import MainBody from '../MainBody';

// Styling
import { Collapse } from "@material-tailwind/react";
import { CloudUpload, CircleX } from 'lucide-react';

const ReturnOrder = () => {
  const location = useLocation();
  const { order } = location.state || {};
  const [collapseStates, setCollapseStates] = useState({});
  const [imgFiles, setImgFiles] = useState({});
  const [uploadDivs, setUploadDivs] = useState({});
  const [rmUploadArgs, setRmUploadArgs] = useState(null);
  const [runRemoveUpload, setRunRemoveUpload] = useState(false);
  const maxUploads = 3;
  const [data, setData] = useState({});

  const handleFormSubmit = (e) => {
    
    const form = document.getElementById("returnForm")
    // Create a new FormData object to hold the form's data
    const formData = new FormData(form);
    const submitData = new FormData();

    console.log(formData)
  
    // Put form data in data object
    let temp = {...data}
    for (let [k, val] of formData.entries()) {
      const {key, id} = getOpIdFromInput(k)
      if(key && id && (id in temp)){
        temp[id][key] = val
        submitData.append(`${key}_${id}`, val)
      }
    }

    // Sort files into data object
    Object.keys(imgFiles).forEach(id => {
      if(id in temp){
        temp[id]['files'] = imgFiles[id]
        // submitData.append(`img_${id}`, imgFiles[id]); // Use unique keys for each

        imgFiles[id].forEach((file, index) => {
          // submitData.append(`img_${id}_${index}`, file); // Use unique keys for each
          submitData.append(`imgFiles${id}[]`, file); // Use unique keys for each
        })
      }
    })

    setData(temp)
    // console.log(temp)
    // Submit form data via an API request or handle it as needed
    // api.post("complaints/", submitData)
    api.post("complaints/", submitData, {
      headers: {
        'Content-Type': 'multipart/form-data', // Axios will set this automatically
      }
    });
    
  };

  // const handleFormSubmit = (e) => {
  //   // e.preventDefault(); // Prevent default form submission
    
  //   const form = document.getElementById("returnForm");
  //   const formData = new FormData(form); // Hold the form's data
    
  //   // Append files to the formData
  //   Object.keys(imgFiles).forEach(id => {
  //     imgFiles[id].forEach((file, index) => {
  //       formData.append(`imgFiles_${id}_${index}`, file); // Use unique keys for each file
  //     });
  //   });

  //   // Submit the formData via an API request
    // api.post("complaints/", formData, {
    //   headers: {
    //     'Content-Type': 'multipart/form-data', // Axios will set this automatically
    //   }
    // });
  // };


  const getOpIdFromInput = (string) => {
    console.log('Function: getOpIdFromInput')
    var key=false;
    var id=false;
    const pattern = /_(?!.*_)/
    const match = string.match(pattern)
    if(match){
      key = string.slice(0, match.index)
      id = string.slice(match.index+1)
    }
    return {key, id}
  }

  const generateUUID = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = (Math.random() * 16) | 0;
      const v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  };

  const toggleCheck = (op) => {
    var checked = !collapseStates[op]
    setCollapseStates((prevStates) => ({
      ...prevStates,
      [op]: !prevStates[op]
    }));

    // If checked then add op key to data for submitting.
    var temp = {...data}
    if(checked){
      console.log('checked')
      temp[op] = {}
    } else {
      console.log('uncheck')
      delete temp[op]
    }
    console.log('check', temp)
    setData(temp)
  };

  const clickRemoveUploads = (op_id, uniqueID, index) => {
    setRmUploadArgs({op_id, uniqueID, index})
    setRunRemoveUpload(true); // Set flag to true on click
  }

  useEffect(() => {
    if (runRemoveUpload && rmUploadArgs) {
      const { op_id, uniqueID, index } = rmUploadArgs; 
      rmUpload(op_id, uniqueID, index); // Call abc with the latest state
      setRunRemoveUpload(false); // Reset the flag
    }
  }, [runRemoveUpload, rmUploadArgs, imgFiles, uploadDivs]);

  const rmUpload = (op_id, uniqueID, file) => {
    console.log('Function: rmUpload')
    
    // Remove img from imgFiles which will be sent to backend
    setImgFiles((prevFiles) => {
      let updatedFiles = [...imgFiles[op_id]]
      updatedFiles = updatedFiles.filter((f) => f !== file);
      return {
        ...prevFiles,
        [op_id]: updatedFiles
      };
    });
    
    setUploadDivs((prevDivs) => {
      let updatedDivs = [...(prevDivs[op_id] || [])];
      updatedDivs = updatedDivs.filter((div) => div.props.id !== uniqueID);
      return {
        ...prevDivs,
        [op_id]: updatedDivs
      };
    });

  }

  const uploadImg = (e, op_id) => {
    console.log("Function: uploadImg");
    const files = e.target.files;
    // Cut files array if adding eg. one by one, so index shouldn't start from 0.

    // Iterate through files and pass their index explicitly
    const temp = [...imgFiles[op_id]]
    if(temp.length == 0){
      Array.from(files).forEach((file, index) => {
        readImgFile(op_id, file, index);
      })
    } else {
      Array.from(files).forEach((file, index) => {
        const newIndex = temp.length + index;  // Adjust index to start after existing files
        readImgFile(op_id, file, newIndex);
      }
    )}
  };
  
  const readImgFile = (op_id, file, index) => {
    console.log("Function: readImgFile");
  
    var reader = new FileReader();
    
    // Store the current index so that it is retained in the callback
    reader.onloadend = function () {
      var src = reader.result;
      addImgDiv(src, op_id, index, file);
    };
  
    reader.readAsDataURL(file);
  };
  
  const addImgDiv = (src, op_id, index, file) => {
    const uniqueID = generateUUID();
  
    // Create new image div with proper index tracking
    const newDiv = (
      <div id={uniqueID} key={uniqueID} className="relative">
        <CircleX onClick={() => clickRemoveUploads(op_id, uniqueID, file)} className="ro_circlex" />
        <img src={src} className="ro_img" alt="Uploaded preview" />
      </div>
    );
  
    // Update imgFiles array at the correct index
    setImgFiles((prevFiles) => {
      const updatedFiles = [...(prevFiles[op_id] || [])];
      updatedFiles[index] = file; // Ensure that file is set at the correct index
      return {
        ...prevFiles,
        [op_id]: updatedFiles
      };
    });
  
    // Update uploadDivs array at the correct index
    setUploadDivs((prevDivs) => {
      const updatedDivs = [...(prevDivs[op_id] || [])];
      updatedDivs[index] = newDiv; // Ensure that div is set at the correct index
      return {
        ...prevDivs,
        [op_id]: updatedDivs
      };
    });
  };
  
  const initUploadDivsAndImgFiles = () => {
    console.log('Function: initUploadDivsAndImgFiles')
    var tempDivs = {}
    var tempImgFiles = {}
    order.order_products.forEach(elem => {
      tempDivs[elem.id] = []
      tempImgFiles[elem.id] = []
    });
    setUploadDivs(tempDivs)
    setImgFiles(tempImgFiles)
  }

  const initData = () => {
    console.log('Function: initData')
    var tempData = {}
    order.order_products.forEach(elem => {
      tempData[elem.id] = {
        title: '',
        body: '',
        quantity: 0,
        files: []
      }
    })
    setData(tempData)
  }

  useEffect(() => {
    console.log("useEffect")
    // Initialise data object that will be submitted with form
    // initData()

    // Initiate uploadDivs and imgFiles, object of empty arrays based on number of order_products. OpID as keys.
    initUploadDivsAndImgFiles()
    
  }, [])

  return (
    <MainBody>
      <div className='ord_main_div'>
        <h1 className="pv-h1 mt-2">Return</h1>
        <div className='ro_column_headers'>
          <p className="w-2/4">ITEMS</p>
          <p className="w-1/4">QTY</p>
          <p className="w-1/4">REFUNDABLE AMOUNT</p>
        </div>
        <form id="returnForm" className="flex w-full items-center justify-center">

          <div key={order} className="w-[70%] border rounded-bl-lg rounded-br-lg p-4 !mt-0">
            {order.order_products.map((op) => (
              <div key={op.id}>
                <div className="flex w-full py-2">
                  <div className="flex w-2/4 items-center">
                    <div className="flex items-center me-4">
                      <input name={`order_product_${op.id}`} onChange={() => toggleCheck(op.id)} type="checkbox" id={op.id} value={op.id} className="w-4 h-4 bg-colour-4"/>
                    </div>
                    <img src={`/src/assets/images/${op.product_info.main_img}`} className="ord_img" alt={op.product_info.name}/>
                    <p className="text-gray-600">{op.product_info.name}</p>
                  </div>

                  <div className="flex w-1/4 justify-center items-center ibm-light">
                    <select name={`quantity_${op.id}`} className="w-1/5 h-3/5 p-2 border border-gray-300 rounded-md">
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
                      <h2 className="ro_text_h2">Order Return Request</h2>
                      <input name={`title_${op.id}`} type='text' className="h-10 ro_text_input"/>
                      <h2 className="ro_text_h2 mt-4">Reason for Return</h2>
                      <textarea name={`body_${op.id}`} className="h-40 ro_text_input"></textarea>
                    </div>

                    <div className='flex flex-col w-2/5 justify-end'>
                      <div className="flex w-full h-full">
                        <label htmlFor={`dropzone-file${op.id}`} className="ro_dropzone_label">
                            <div className="flex flex-col items-center py-">
                                <CloudUpload className="w-10 h-10 text-colour-5"/>
                                <p className="mb-2 text-sm text-colour-5"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                <p className="text-xs text-colour-5">(MAX 4 IMAGES)</p>
                            </div>
                            <input 
                              id={`dropzone-file${op.id}`}
                              name="files"
                              type="file"
                              accept=".png, .jpeg, .jpg"
                              multiple
                              onChange={(e) => uploadImg(e, op.id)}
                              className="hidden" />
                        </label>
                      </div> 
                      <div className="flex w-full space-x-4">
                        {uploadDivs[op.id]}
                      </div>
                    </div>
                  </div>
                </Collapse>
                <hr className='border-gray-300'/>
              </div>
            ))}
          </div>
        </form>
        <button onClick={() => handleFormSubmit()} className="">Submit Return</button>
      </div>
    </MainBody>
  )
}

export default ReturnOrder