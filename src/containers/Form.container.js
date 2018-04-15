import { connect } from 'react-redux';
import FormScreen from '../views/Form.view';
import { updateIdea, createIdea, deleteIdea } from '../services/ideas.service'

const mapDispatchToProps = dispatch =>
({
  updateIdea: (idea) => {
    dispatch(updateIdea(idea));
  },
  createIdea: (idea) => {
    dispatch(createIdea(idea));
  },
  deleteIdea: (idea) => {
    dispatch(deleteIdea(idea));
  },
});

const mapStateToProps = state => {
  return {
    savingIdea: state.savingIdea,
    deletingIdea: state.deletingIdea,
  };
}

/** **********************
* Exports              *
************************
*/
export default connect(mapStateToProps, mapDispatchToProps)(FormScreen);
