import { useState } from 'react';
import ReactModal from 'react-modal';

ReactModal.setAppElement('#root');

const Results = () => {
  const snippet = document.querySelector('input');
  try {
    if (snippet.value.length <= 0) {
      return (
        <div className='linkedInModal--content__right__inputs--results linkedInModal--content__right__inputs--results--err'>
          <p> ERROR.Enter a value. </p>{' '}
        </div>
      );
    }
    const r = snippet.value
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
          {' '}
          Conversion Id: {r}
        </p>{' '}
      </div>
    );
  } catch {
    return (
      <div className='linkedInModal--content__right__inputs--results linkedInModal--content__right__inputs--results--err'>
        <p> ERROR.Cannot Find Conversion Id. </p>{' '}
      </div>
    );
  }
};

const Modal = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [showResults, setShowResults] = useState(false);
  return (
    <div className='modalglobal linkedInModal-container'>
      <button onClick={() => setModalIsOpen(true)}> LinkedIn </button>{' '}
      <ReactModal
        transparent={true}
        isOpen={modalIsOpen}
        shouldCLoseOnOverlayClick={false}
        onRequestClose={() => setModalIsOpen(false)}
        className='linkedInModal'
      >
        <div className='linkedInModal--content'>
          <div className='linkedInModal--content__right'>
            <h1> Paste LinkedIn Event Snippet </h1>{' '}
            <div className='linkedInModal--content__right__inputs'>
              <input type='text' />
              <button type='submit' onClick={() => setShowResults(Results)}>
                {' '}
                Submit{' '}
              </button>{' '}
            </div>{' '}
            {showResults ? <Results /> : null}{' '}
          </div>{' '}
          <div className='linkedInModal--content__left'></div>{' '}
        </div>{' '}
      </ReactModal>{' '}
    </div>
  );
};

export default Modal;
