import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Form, Title } from '../common';
import { postActions } from '../../actions';
import { constants } from '../../helpers';
import '../../../public/css/camera.css';

const decals = constants.DECALS;
const camProps = {
  width: 640,
  height: 480
};

class CamPage extends Component {

  constructor(props) {
    super(props)
    this.state = {
      started: false,
      cameraActive: false,
      snappedPhoto: false,
      showDecals: false,
      decalDeets: {
        x: null,
        y: null,
        image: null
      }
    };
    this.localStream;
    this.draggedImages = [];
  }

  componentDidMount() {
    if (navigator.mediaDevices === undefined) {
      navigator.mediaDevices = {};
    }
    if (navigator.mediaDevices.getUserMedia === undefined) {
      navigator.mediaDevices.getUserMedia = constraints => {
        const getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
        if (!getUserMedia) {
          return Promise.reject(new Error('getUserMedia is not implemented in this browser'));
        }
      }
    }
  }

  componentWillUmount() {
    if (this.state.cameraActive) {
      stopCamera();
    }
  }

  /*********
    Camera
  *********/

  startCamera() {
    this.setState({
      started: true,
      snappedPhoto: false,
      cameraActive: true,
    });
    this.clearDecals();
    
    const constraints = {
      audio: false,
      video: true
    };
    navigator.mediaDevices.getUserMedia(constraints)
    .then(stream => {
      this.localStream = stream;
      if ('srcObject' in video) {
        video.srcObject = stream;
      } else {
        video.src = window.URL.createObjectURL(stream);
      }
    })
    .catch(err => {
      console.log(`${err.name}: ${err.message}`);
    });
    video.onloadedmetadata = e => {
      video.play();
      this.timerCallback();
    }
  }

  stopCamera() {
    this.localStream.getTracks().forEach(track => {
      track.stop();
    });
    this.setState({ cameraActive: false });
  }

  // Stop video and draw to camera
  snapPhoto() {
    canvas.getContext('2d').drawImage(video, 0, 0, camProps.width, camProps.height);
    backup.getContext('2d').drawImage(video, 0, 0, camProps.width, camProps.height);
    for (let decal of this.draggedImages) {
      canvas.getContext('2d').drawImage(decal.image, decal.x, decal.y);
    }
    this.stopCamera();
    this.setState({ snappedPhoto: true });
  }

  // Draws from camera && decals to canvas
  computeFrame() {
    let context = canvas.getContext('2d');
    context.drawImage(video, 0, 0, camProps.width, camProps.height);
    for (let decal of this.draggedImages) {
      context.drawImage(decal.image, decal.x, decal.y);
    }

    return;
  }

  // Constantly redraw to the canvas
  timerCallback() {
    if (!this.localStream.active) {
      return;
    }
    this.computeFrame();
    setTimeout(() => {
      this.timerCallback();
    }, 0);
  }

  // Maybe another day we'll properly implement this
  // blurPhoto() {
  //   canvas.getContext('2d').filter = 'blur(5px)';
  // }

  handleSubmit(e) {
    e.preventDefault();

    const desc = e.target.description.value !== "" ? e.target.description.value : null;
    const payload = {
      image: canvas.toDataURL('image/png').replace(/^data:image\/(png|jpg);base64,/, ""),
      description: desc
    };

    this.props.dispatch(postActions.postImage(payload));
    this.startCamera();
  }

  /***********
     Decals
  ***********/

  allowDrop(e) {
    e.preventDefault();
  }

  dropOnCanvas(e) {
    e.preventDefault();
    let canvasPosition = canvas.getBoundingClientRect();
    this.draggedImages.push({
      image: this.state.decalDeets.image,
      x: e.clientX - canvasPosition.left - this.state.decalDeets.x,
      y: e.clientY - canvasPosition.top - this.state.decalDeets.y
    });
    if (this.state.snappedPhoto) {
      this.computeFrame();
    }
  }

  dragDecal(e) {
    let imagePosition = e.target.getBoundingClientRect();
    let x = e.clientX - imagePosition.left;
    let y = e.clientY - imagePosition.top;
    this.setState({
      decalDeets: {
        image: document.getElementById(e.target.id),
        x: x,
        y: y
      }
    });
  }

  clearDecals() {
    this.draggedImages = [];
    if (this.state.snappedPhoto) {
      this.computeFrame();
    }
  }

  showHideDecals(e) {
    this.setState({ showDecals: !this.state.showDecals });
  }

  render() {
    const border = this.state.cameraActive ? 'red' : 'black';
    return (
      <section>
        <Title>Cam Time!</Title>
        <br />
        {this.state.cameraActive
          ? <button className='camagruButton' id="snapBtn" onClick={ () => this.snapPhoto() }>Snap Photo</button>
          : <button className='camagruButton' id="startBtn" onClick={ () => this.startCamera() }>Start Camera</button>
        }
        {/*<button className='camagruButton' id="blurBtn" onClick={ () => this.blurPhoto() }>Blur Photo</button>*/}
        <button className='camagruButton' onClick={ () => this.clearDecals() }>Clear Decals</button>
        <div className='camContainer'>
          <div>
            <video id="video" width={camProps.width} height={camProps.height} />
            <canvas id="backup" width={camProps.width} height={camProps.height} />
            {this.state.started &&
              <canvas id="canvas" width={camProps.width} height={camProps.height} style={{outlineColor: border}} onDrop={e => this.dropOnCanvas(e)} onDragOver={e => this.allowDrop(e)} />
            }
          </div>
          <button className='camagruButton' id='decalBtn' onClick={ () => this.showHideDecals() }>
            {this.state.showDecals ? 'Hide decals' : 'Show decals'}
          </button>
          {this.state.showDecals &&
            <div className='decalContainer'>
              {decals && Object.keys(decals).map(decal =>
                <img key={decal} id={decal} src={decals[decal]} draggable={true} onDragStart={e => this.dragDecal(e)} />
              )}
            </div>
          }
          {this.state.snappedPhoto &&
            <div className='camFormContainer'>
              <Form
                handleSubmit={e => this.handleSubmit(e)}
                fields={[
                  {label: 'description', type: 'text', name: 'Description'}
                ]}
                submitBtn='Post picture'
              />
            </div>
          }
        </div>
      </section>
    )
  }
}

const mapStateToProps = state => {
  return {};
}
const connected = connect(mapStateToProps)(CamPage);
export { connected as CamPage };