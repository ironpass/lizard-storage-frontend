import axios from 'axios';

export function downloadFile(endpoint, file) {
    axios({
      url: endpoint+'/download?id='+file.id,
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

export function uploadFile(endpoint, form) {
    const url = endpoint+'/upload';
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

export function deleteFile(endpoint, file) {
    axios.get(endpoint+'/delete?id='+file.id)
}