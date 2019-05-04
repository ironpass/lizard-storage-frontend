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
  }

  componentDidMount() {
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
  
  downloadFile(file) {
    axios({
      url: 'http://localhost:7777/download?id='+file.id,
      method: 'GET',
      responseType: 'blob', // important
    }).then((res) => {
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', file.name);
      document.body.appendChild(link);
      link.click();
    });
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
            <button className='deleteBtn' type='submit' onClick={()=>(alert("nigga"))}>
              <img classNme='deleteIcon' src={trash} alt='delete icon'/>
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
          <button className='uploadBtn' type='submit' onClick={()=>alert('numen')}>
            <img id='uploadIcon' src={upload} alt='upload icon'/>
          </button>
        </div>
      </div>
    )
  }
}
export default App;
