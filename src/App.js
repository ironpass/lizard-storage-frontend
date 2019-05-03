import React from 'react';
import './App.css';
import logo from './static/lizard.svg';
import axios from 'axios';

// function App() {
//   return (
//     <div className='App'>
//       <div className='Header'>
//         <img id='lizard-logo' src={logo} alt='logo'/>
//         <p id='project-name'>LIZARD STORAGE PROJECT</p>
//       </div>
//       <div className='FileList'>
//         FileList
//       </div>
//     </div>
//   )
// }

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      files: [],

    }
  }
  componentDidMount() {
    axios.get('http://localhost:7777/showall').then((res) => {
      console.log(res)
      this.setState({files: res.data.map((file)=>file.filename)})
    })
    
  }
  generateList(fileList) {
    return (
      fileList.map((file)=>
      <li>{file}</li>)
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
          <ul id="filelist">
            {this.generateList(this.state.files)}
          </ul>
        </div>
      </div>
    )
  }
}
export default App;
