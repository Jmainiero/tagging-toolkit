import React, { useState } from 'react';
import ReactModal from 'react-modal';

ReactModal.setAppElement('#root');
class TwitterModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      modalIsOpen: false,
      showResults: false,
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e) {
    this.setState({ value: e.target.value });
  }

  Results = (e) => {
    const snippet = this.state.value;
    try {
      if (snippet.length <= 0) {
        return (null);
      }

      if (snippet.indexOf('twitter') < 0) {
        return (
          <div className='twitterModal--content__right__inputs--results twitterModal--content__right__inputs--results--err'>
            <p>Invalid Twitter Snippet.</p>
          </div>
        );
      }

      const r = snippet
        .split('.')
        .map((e) => {
          if (e.split("('")[0] === 'trackPid') {
            return e.split("('")[1].split("',")[0];
          }
          return;
        })
        .filter((e) => e !== undefined)[0];

      if (r.length > 0) {
        return (
          <div
            className='twitterModal--content__right__inputs--results twitterModal--content__right__inputs--results--ok'
            id={r}
          >
            <p
              onClick={() => {
                navigator.clipboard.writeText(
                  document.querySelector(
                    '.twitterModal--content__right__inputs--results--ok'
                  ).innerText
                );
              }}
            >
              Website Tag Id: {r}
            </p>
          </div>
        );
      } else {
        return (
          <div className='twitterModal--content__right__inputs--results twitterModal--content__right__inputs--results--err'>
            <p>Error. Cannot Find Website Tag Id.</p>
          </div>
        );
      }
    } catch (err) {
      return (
        <div className='twitterModal--content__right__inputs--results twitterModal--content__right__inputs--results--err'>
          <p>Error. Cannot Find Conversion Id.</p>
        </div>
      );
    }
  };

  render() {
    return (
      <div className='modalglobal twitterModal-container'>
        <button
          onClick={() => {
            this.setState({ modalIsOpen: true });
          }}
        >
          Twitter
        </button>
        <ReactModal
          transparent={true}
          isOpen={this.state.modalIsOpen}
          shouldCLoseOnOverlayClick={false}
          onRequestClose={() => {
            this.setState({ modalIsOpen: false });
          }}
          className='twitterModal'
        >
          <div className='twitterModal--content'>
            <div className='twitterModal--content__right'>
              <h1>Paste Twitter Event Snippet</h1>
              <div className='twitterModal--content__right__inputs'>
                <textarea
                  name='textarea'
                  onChange={this.handleChange}
                  value={this.state.value}
                ></textarea>
                <button
                  type='submit'
                  onClick={() => {
                    this.setState({ showResults: true });
                  }}
                >
                  Submit
                </button>

              </div>
              {this.state.showResults ? <this.Results /> : null}
            </div>
            <div className='twitterModal--content__left'></div>
          </div>
        </ReactModal>
      </div>
    );
  }
}

export default TwitterModal;
