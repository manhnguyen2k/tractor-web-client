import React, { useEffect, useState } from 'react';
import { Table, TableHead, TableRow, TableCell, TableBody, IconButton,Checkbox } from '@material-ui/core';
import { Add as AddIcon } from '@material-ui/icons';
import axios from '../../_config/AxiosConfig';
import './tractor.css'

;
const Tractor = () => {
    
    const [tractors, setTractors] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);
    const [selectedTractors, setSelectedTractors] = useState({});
    useEffect(() => {
        axios.get('/tractors')
          .then(response => {
            console.log(response.data); 
            setTractors(response.data.data)
          })
          .catch(error => {
            console.log(error); 
          });
      }, []); 
      console.log(tractors)
      const handleFileChange = (e) => {
        const file = e.target.files[0];
        setSelectedFile(file);
        const initialSelectedTractors = tractors.reduce((acc, tractor) => {
            acc[tractor._id] = false;
            return acc;
          }, {});
          setSelectedTractors(initialSelectedTractors);
      };
      const handleTractorSelection = (tractorId) => {
        setSelectedTractors(prevSelectedTractors => ({
          ...prevSelectedTractors,
          [tractorId]: !prevSelectedTractors[tractorId],
        }));
      };
      const handleUpload = () => {
        const formData = new FormData()
        const selectedTractorIds = Object.keys(selectedTractors).filter(id => selectedTractors[id]);
        formData.append("tractorIds", JSON.stringify(selectedTractorIds));
        formData.append("fileConfig", selectedFile);
        if (selectedFile) {
          // Perform your file upload logic here using the selectedFile
          // After the upload is done, you can reset the selectedFile state
         // console.log(selectedFile)
          axios.post('/file-config',formData, {
            headers: {
                'Content-Type': 'multipart/form-data', // Thay đổi Content-Type thành multipart/form-data
              }
          })
            .then(response => {
              console.log('Form data with file submitted successfully:', response.data);
            })
            .catch(error => {
              console.error('Error submitting form data with file:', error);
            });

        }
      };
  return (
    <div className="tractors-list-container">
  <div className="tractors-table-container">
    <Table className="tractors-table">
      <TableHead>
        <TableRow>
          <TableCell>Id</TableCell>
          <TableCell>Tractor Id</TableCell>
          <TableCell>Created at</TableCell>
          <TableCell>Updated at</TableCell>
          <TableCell>Selected</TableCell> {/* Thêm cột cho checkbox */}
        </TableRow>
      </TableHead>
      <TableBody>
        {tractors.map(tractor => (
          <TableRow key={tractor._id}>
            <TableCell>{tractor._id}</TableCell>
            <TableCell>{tractor.tractorId}</TableCell>
            <TableCell>{tractor.createdAt}</TableCell>
            <TableCell>{tractor.updatedAt}</TableCell>
            <TableCell>
              <Checkbox
                checked={selectedTractors[tractor._id]}
                onChange={() => handleTractorSelection(tractor._id)}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </div>

  {/* Nút thêm file */}
  <div className="addfile">
    <label htmlFor="file-input">
      <IconButton color="primary" component="span" className="add-icon">
        <AddIcon />
      </IconButton>
    </label>
    <input
      type="file"
      id="file-input"
      style={{ display: 'none' }}
      onChange={handleFileChange}
    />
  </div>

  {/* Nút tải lên */}
  <div className="upload-button">
    <IconButton color="primary" onClick={handleUpload} className="upload-icon">
      Upload
    </IconButton>
  </div>
</div>

  )
}

export default Tractor
