import LinkedinModal from './linkedinModal';
import TwitterModal from './twitterModal';

const homepage = () => {
    return (
        <div className = 'workflow-container'>
            <h1>Pick a workflow</h1>
            <div className="workflow-container__options">
            <LinkedinModal/>
            <TwitterModal/>
            </div>
        </div>
    );
};


export default homepage;