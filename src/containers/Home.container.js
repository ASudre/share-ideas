import { connect } from 'react-redux';
import HomeScreen from '../views/Home.view';
import { getIdeas } from '../services/ideas.service'

const mapDispatchToProps = dispatch =>
({
  requestIdeas: () => {
    dispatch(getIdeas());
  },
});

const mapStateToProps = state => {
  return {
    ideas: state.ideas,
    loadingIdeas: state.loadingIdeas,
  };
}

/** **********************
* Exports              *
************************
*/
export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
