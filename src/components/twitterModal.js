import { useState } from 'react';
import ReactModal from 'react-modal';

ReactModal.setAppElement('#root');

const Results = (e) => {
    // const snippet = document.querySelector('input');
    const snippet = e.target;
    console.log(snippet);
    try {
        if (snippet.value.length <= 0) {
            return (<div className="twitterModal--content__right__inputs--results twitterModal--content__right__inputs--results--err">
                <p>ERROR. Enter a value.</p>
            </div>
            );
        }
        const r = snippet.value.split(".").filter((e) => {
            if (e.split("('")[0] === 'trackPid') return e.split("('")[1].split("',")[0];
        })[0];
        return (
            <div className="twitterModal--content__right__inputs--results twitterModal--content__right__inputs--results--ok" id= {r}>
                <p onClick={() => {navigator.clipboard.writeText(document.querySelector('.twitterModal--content__right__inputs--results--ok').innerText);}}>Conversion Id: {r}</p>
            </div>
        );
    } catch(err) {
        throw err;
        return (
            <div className="twitterModal--content__right__inputs--results twitterModal--content__right__inputs--results--err">
                <p>ERROR. Cannot Find Conversion Id.</p>
            </div>
        );
    }
};




const Modal = () => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [showResults, setShowResults] = useState(false);
    return (
        <div className="twitterModal-container">
            <button onClick={() => setModalIsOpen(true)}>Twitter</button>
            <ReactModal
                transparent={true}
                isOpen={modalIsOpen}
                shouldCLoseOnOverlayClick={false}
                onRequestClose={() => setModalIsOpen(false)}
                className="twitterModal">
                <div className="twitterModal--content">
                    <div className="twitterModal--content__right">
                        <h1>Paste Twitter Event Snippet</h1>
                        <div className="twitterModal--content__right__inputs">
                            <textarea></textarea>
                            {/* <input type="textarea" rows="5"/> */}
                            <button type="submit" onClick={(e) => setShowResults(Results(e))} >Submit</button>
                        </div>
                        {showResults ? <Results /> : null}
                    </div>
                    <div className="twitterModal--content__left">
                    </div>
                </div>
            </ReactModal>
        </div >
    );
};

export default Modal;