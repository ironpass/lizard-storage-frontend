import React from 'react';
import './App.css';
import axios from 'axios';
import { ListGroup, ListGroupItem } from 'reactstrap';
import logo from './static/lizard.svg';
import trash from './static/trash.svg';
import upload from './static/upload.svg';
import download  from './static/download.svg';

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      files: [],
    }
    this.uploadingFile = {
      file: null,
      name: '',
    }
  }

  updateState() {
    axios.get('http://localhost:7777/showall').then((res) => {
      this.setState({files: res.data.map(
        (file)=> ({
          "name":file.filename,
          "id":file._id
          })
        )
      })
    })
  }

  componentDidMount() {
    this.updateState()   
  }
  
  componentDidUpdate() {
    this.updateState()
  }
  
  downloadFile(file) {
    axios({
      url: 'http://localhost:7777/download?id='+file.id,
      method: 'GET',
      responseType: 'blob',
    }).then((res) => {
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', file.name);
      document.body.appendChild(link);
      link.click();
    });
  }

  uploadFile(form) {
    const url = 'http://localhost:7777/upload';
    const formData = new FormData();
    formData.append('uploadingfile', form.file)
    formData.append('name', form.name)
    const config = {
        headers: {
            'content-type': 'multipart/form-data'
        }
    }
    axios.post(url, formData, config).then((res) => {
      alert(res.data)
    })
    
  }

  deleteFile(file) {
    axios.get('http://localhost:7777/delete?id='+file.id)
  }

  onChange(e) {
    this.uploadingFile = {file: e.target.files[0], name:e.target.files[0].name}
  }

  generateList(fileList) {
    return (
        fileList.map((file)=>
        <div className='d-flex'>
          <ListGroupItem action className='fileitem'>
            {file.name}
            <button className='downloadBtn' type='submit' onClick={()=>this.downloadFile(file)}>
              <img className='downloadIcon' src={download} alt='download icon'/>
            </button>
            <button className='deleteBtn' type='submit' onClick={()=>this.deleteFile(file)}>
              <img className='deleteIcon' src={trash} alt='delete icon'/>
            </button>
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

        <div className='Files'>
          <ListGroup id="filelist">
            {this.generateList(this.state.files)}
          </ListGroup>
        </div>

        <div style={{textAlign:'center'}}>
          <form encType='multipart/form-data' onSubmit={()=>this.uploadFile(this.uploadingFile)}>
            <input type='file' name='uploadingfile' onChange={(e)=>this.onChange(e)}/>
            <input className='uploadBtn' src={upload} type='image' alt='upload icon' />
          </form>
        </div>
      </div>
    )
  }
}
export default App;
