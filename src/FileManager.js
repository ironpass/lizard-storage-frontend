import axios from 'axios';

export function downloadFile(file) {
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

export function uploadFile(form) {
    const url = 'http://localhost:7777/upload';
    const formData = new FormData();
    formData.append('uploadingfile', form.file)
    formData.append('name', form.name)
    const config = {
        headers: {
            'content-type': 'multipart/form-data'
        }
    }
    axios.post(url, formData, config)
}

export function deleteFile(file) {
    axios.get('http://localhost:7777/delete?id='+file.id)
}