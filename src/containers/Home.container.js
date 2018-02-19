import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import HomeScreen from '../components/Home.component';
import requestIdeas from '../actions/ideas.actions';

const mapDispatchToProps = dispatch =>
({
  requestIdeas: () => {
    return dispatch(requestIdeas());
  },
});

const mapStateToProps = state =>
({
  ideas: state.ideas,
});

/** **********************
* Exports              *
************************
*/
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeScreen));
