import { PlusOutlined } from '@ant-design/icons'

const UploadButton = () => {
  return (
    <button className="" style={{ border: 0, background: "none" }} type="button">
    <PlusOutlined className="text-black" />
    <div className="text-black" style={{ marginTop: 8 }}>
      Upload
    </div>
  </button>
  )
}

export default UploadButton
