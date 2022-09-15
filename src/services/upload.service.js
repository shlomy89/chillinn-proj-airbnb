
export const uploadService = {
  uploadImg
}
function uploadImg(ev) {
  const CLOUD_NAME = "cajul22"
  const UPLOAD_PRESET = "zragacto"
  const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`

  const FROM_DATA = new FormData();
  FROM_DATA.append('upload_preset', UPLOAD_PRESET);
  FROM_DATA.append('file', ev.target.files[0])

  return fetch(UPLOAD_URL, {
    method: 'POST',
    body: FROM_DATA
  })
    .then(res => res.json())
    .then(res => {
      return res
    })
    .catch(err => console.error(err))
}