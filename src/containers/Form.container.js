// @flow

import { connect } from 'react-redux';
import FormScreen from '../views/Form.view';
import { getIdea, updateIdea, createIdea, deleteIdea } from '../services/ideas.service';

const mapDispatchToProps = dispatch => ({
  getIdea: (ideaId) => {
    dispatch(getIdea(ideaId));
  },
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

const mapStateToProps = state => ({
  savingIdea: state.savingIdea,
  deletingIdea: state.deletingIdea,
  idea: state.idea,
  loadingIdea: state.loadingIdea,
});

/** **********************
 * Exports              *
 ************************
 */
export default connect(mapStateToProps, mapDispatchToProps)(FormScreen);
