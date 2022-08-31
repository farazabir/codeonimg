import React, { Component } from "react";
import * as htmlToImage from 'html-to-image';
import LazyLoad from 'react-lazyload';
import download from "downloadjs";



class ImageUploadPreviewComponent extends Component {

 
  fileObj = [];
  fileArray = [];

  constructor(props) {
    super(props);
    this.state = {
      file: [null],
    };
    this.uploadMultipleFiles = this.uploadMultipleFiles.bind(this);
    this.uploadFiles = this.uploadFiles.bind(this);
  }
// select and upload multiple file 
  uploadMultipleFiles(e) {
    this.fileObj.push(e.target.files);
    for (let i = 0; i < this.fileObj[0].length; i++) {
      this.fileArray.push(URL.createObjectURL(this.fileObj[0][i]));
    }
    this.setState({ file: this.fileArray });
  }

  uploadFiles(e) {
    e.preventDefault();
    console.log(this.state.file);
  }

   //download img as jpeg
    handleJpeg = (e) => {
      e.preventDefault()
      htmlToImage
      .toJpeg(document.getElementById("my-img"), { quality: 0.95 })
      .then(function (dataUrl) {
        var link = document.createElement("a");
        link.download = "product-img.jpeg";
        link.href = dataUrl;
        link.click();
        console.log("downloading")
        });
    };
 
  render() {
   var number = ((document.getElementById("number")||{}).value)||"";
   var tag = ((document.getElementById("tag")||{}).value)||"";
    return (
      
      <form>
        <div className="mx-5 form-group">
          <h3>Enter Page or Product Tag</h3>
          <input
            type="text"
            className="form-control "
            id="tag"
            placeholder="sample"
          />
          <h3>Enter Code</h3>
          <input
            type="text"
            className="form-control "
            id="number"
            placeholder="100"
          />
          <div className="form-group m-3">
          <input
            type="file"
            className="form-control"
            onChange={this.uploadMultipleFiles}
            multiple
          />
          </div>
          <button className="m-2 btn btn-primary" onClick={(e)=>this.handleJpeg(e)}>Download</button>
        </div>
       

        <div className=" img-fluid DisplayImg">
         
          {(this.fileArray || []).map((url) => (

            
            <div
            id="my-img"
              className="DisplayImg"
              // style={{
              //   backgroundImage: `url(${url})`,
              //   backgroundRepeat: "no-repeat",
              //   backgroundSize: "100%",
              //   height: "100vh",
              // }}
            >
              <LazyLoad>
                <img
                    src={url}
                    className="img-fluid img-thumbnail"
                    alt=""
                    width="100%"
                  />
                  </LazyLoad>
              <h1 className="topText">{tag}- {++number}</h1>
              
            </div>
            
          ))}
         
        </div>
       
      </form>
      
    );
  }
}

export default ImageUploadPreviewComponent;
