import React, { useState } from 'react';
import ReactModal from 'react-modal';

ReactModal.setAppElement('#root');

class LinkedInModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      selectedOption: '',
      modalIsOpen: false,
      showResults: false,
    };
    this.handelSelect = this.handelSelect.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handelSelect(e) {
    this.setState({ showResults: true });
    this.setState({ selectedOption: e.target.value });

  }
  handleChange(e) {
    this.setState({ value: e.target.value });
  }


  Results = () => {
    const snippet = this.state.value;
    try {
      if (snippet.length <= 0) {
        return(null);
      }
      if(snippet.indexOf('linkedin') < 0){
        return (
          <div className='linkedInModal--content__right__inputs--results linkedInModal--content__right__inputs--results--err'>
            <p>Invalid LinkedIn Snippet</p>
          </div>
        );
      }
      if (this.state.selectedOption === 'conversion-id') {
        const r = snippet
          .split('&')
          .filter((e) => {
            return e.split('=')[0] === 'conversionId';
          })[0]
          .split('=')[1];
        return (
          <div
            className='linkedInModal--content__right__inputs--results linkedInModal--content__right__inputs--results--ok'
            id={r}
          >
            <p
              onClick={() => {
                navigator.clipboard.writeText(
                  document.querySelector(
                    '.linkedInModal--content__right__inputs--results--ok'
                  ).innerText
                );
              }}
            >

              Conversion Id: {r}
            </p>
          </div>
        );
      } else if(this.state.selectedOption === 'img-src'){
        const r = snippet
          .split('src=')[1];
        return (
          <div
            className='linkedInModal--content__right__inputs--results linkedInModal--content__right__inputs--results--ok'
            id={r}
          >
            <p
              onClick={() => {
                navigator.clipboard.writeText(
                  document.querySelector(
                    '.linkedInModal--content__right__inputs--results--ok'
                  ).innerText
                );
              }}
            >
              {r.slice(1,r[0].length-5)}
            </p>
          </div>
        );
      }
    } catch (e) {
      return (
        <div className='linkedInModal--content__right__inputs--results linkedInModal--content__right__inputs--results--err'>
          <p> Error.Cannot Find Conversion Id. </p>
        </div>
      );
    }
  };

  render() {
    return (
      <div className='modalglobal linkedInModal-container'>
        <button
          onClick={() => {
            this.setState({ modalIsOpen: true });
          }}
        >
          LinkedIn
        </button>
        <ReactModal
          transparent={true}
          isOpen={this.state.modalIsOpen}
          shouldCLoseOnOverlayClick={false}
          onRequestClose={() => {
            this.setState({ modalIsOpen: false });
          }}
          className='linkedInModal'
        >
          <div className='linkedInModal--content'>
            <div className='linkedInModal--content__right'>
              <h1> Paste LinkedIn Event Snippet </h1>
              <div className='linkedInModal--content__right__inputs'>
                <input type='text' value={this.state.value} onChange={this.handleChange} />
                <div className='linkedInModal--content__right__inputs__container'>
                  <button type='submit' onClick={this.handelSelect} value="conversion-id">
                    Get Conversion Id
              </button>
                  <button
                    type='submit'
                    onClick={this.handelSelect}
                    value="img-src"
                  >
                    Get IMG SRC
                </button>
                </div>
              </div>
              {this.state.showResults ? <this.Results /> : null}
            </div>
            <div className='linkedInModal--content__left'></div>
          </div>
        </ReactModal>
      </div >
    );
  }
}

export default LinkedInModal;
