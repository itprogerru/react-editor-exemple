import React from 'react'
import logo from './logo.svg'
import './App.css'
import { Editor } from '@tinymce/tinymce-react'

class App extends React.Component {

  constructor (props) {
    super(props)

    this.state = {content: 'testsetestscf sdf dsf ds fs df sd fsd f '}
    this.handleEditorChange = this.handleEditorChange.bind(this)
  }

  handleEditorChange (content, editor) {
    console.log(content)
    this.setState({content})
  }

  render () {

    const elem = (<div
      dangerouslySetInnerHTML={(() => {
        return {__html: this.state.content}
      })()}
    />)
    return (

      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo"/>
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>

        </header>
        <div style={{maxWidth: '1000px', margin: '50px auto'}}>
          <Editor init={{
            plugins: 'print preview fullpage searchreplace autolink directionality visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists textcolor wordcount imagetools contextmenu colorpicker textpattern help code',
            toolbar: 'formatselect | bold italic strikethrough forecolor backcolor | link | alignleft aligncenter alignright alignjustify  | numlist bullist outdent indent  | removeformat image code',
            height: 500,
            image_list: [
              {title: 'My image 1', value: 'http://www.moxiecode.com/my2.gif'},
              {title: 'My image 2', value: 'http://www.moxiecode.com/my2.gif'}
            ],
            image_advtab: true,
            image_uploadtab: true,
            images_upload_handler: function (blobInfo, success, failure) {
              var xhr, formData

              xhr = new XMLHttpRequest()
              xhr.withCredentials = false
              xhr.open('POST', 'http://localhost:3123/uploadfile')

              xhr.onload = function () {
                var json

                if (xhr.status !== 200) {
                  failure('HTTP Error: ' + xhr.status)
                  return
                }

                json = JSON.parse(xhr.responseText)

                if (!json || typeof json.location != 'string') {
                  failure('Invalid JSON: ' + xhr.responseText)
                  return
                }

                success(json.location)
              }

              formData = new FormData()
              formData.append('file', blobInfo.blob(), blobInfo.filename())

              xhr.send(formData)
            },
            init_instance_callback: function (editor) {
              var freeTiny = document.querySelector('.tox .tox-notification--in')
              freeTiny.style.display = 'none'
            }

          }} value={this.state.content} onEditorChange={this.handleEditorChange}


          />
        </div>
        {elem}
      </div>
    )
  }
}

export default App
