import { connect } from 'react-redux';
import HomeScreen from '../components/Home.component';
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
  };
}

/** **********************
* Exports              *
************************
*/
export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
