import { connect } from 'react-redux';
import FormScreen from '../components/Form.component';
import { updateIdea } from '../services/ideas.service'

const mapDispatchToProps = dispatch =>
({
  updateIdea: (idea) => {
    dispatch(updateIdea(idea));
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
