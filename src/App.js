import React from 'react';
import './App.css';
import axios from 'axios';
import { Button, ListGroup, ListGroupItem } from 'reactstrap';
import logo from './static/lizard.svg';
import upload from './static/upload.svg';
import download  from './static/download.svg';

import { RotateLoader } from 'react-spinners';

import {downloadFile, uploadFile, deleteFile} from './FileManager.js'
import ConfirmDeleteButton from './ConfirmDeleteButton.js'

class App extends React.Component {
  constructor() {
    super()
    this.production_url = 'https://lizard-storage-backend.herokuapp.com'
    this.state = {
      files: [],
      displaySpinner: true,
    }
    this.uploadingFile = {
      file: null,
      name: '',
    }
  }
  
  updateFileState() {
    axios.get(this.production_url+'/showall').then((res) => {
      this.setState({
        displaySpinner: false,
        files: res.data.map(
        (file)=> ({
          "name":file.filename,
          "id":file._id
          })
        )
      })
    })
  }

  componentDidMount() {
    this.updateFileState()   
  }

  componentDidUpdate() {
    this.updateFileState()
  }

  onChange(e) {
    if(e.target.files[0])
      this.uploadingFile = {file: e.target.files[0], name:e.target.files[0].name}
  }

  generateList(fileList) {
    return ( fileList.map((file)=>
      <div key={file.id} className='d-flex'>
        <ListGroupItem action className='fileitem'>
          {file.name}
          <Button className='downloadBtn' type='submit' onClick={()=>downloadFile(this.production_url, file)}>
            <img className='downloadIcon' src={download} alt='download icon'/>
          </Button>
          <ConfirmDeleteButton id={file.id} endpoint={this.production_url} file={file} deleteFile={deleteFile}/>
        </ListGroupItem>
      </div>)
    )
  }

  render() {
    return(
      <div className='App'>
        <div className='Header'>
          <img id='lizard-logo' src={logo} alt='logo' />
          <p id='project-name'>LIZARD STORAGE PROJECT</p>  
        </div>

        <div className='FileDisplay'>
          <ListGroup id="filelist">
            <RotateLoader loading={this.state.displaySpinner} size={20} sizeUnit={'px'} css={{margin:'80px !important'}}/>
            {this.generateList(this.state.files)}
          </ListGroup>
        </div>

        <div className='UploadForm'>
          <form encType='multipart/form-data' onSubmit={()=>uploadFile(this.production_url, this.uploadingFile)}>
            <input className='selectFile' type='file' name='uploadingfile' onChange={(e)=>this.onChange(e)}/>
            <input className='uploadBtn' src={upload} type='image' alt='upload icon' />
          </form>
        </div>
      </div>
    )
  }
}
export default App;
