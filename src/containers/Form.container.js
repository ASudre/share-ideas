import { connect } from 'react-redux';
import FormScreen from '../views/Form.view';
import { updateIdea, createIdea } from '../services/ideas.service'

const mapDispatchToProps = dispatch =>
({
  updateIdea: (idea) => {
    dispatch(updateIdea(idea));
  },
  createIdea: (idea) => {
    dispatch(createIdea(idea));
  },
});

const mapStateToProps = state => {
  return {
    saving: state.saving,
  };
}

/** **********************
* Exports              *
************************
*/
export default connect(mapStateToProps, mapDispatchToProps)(FormScreen);
