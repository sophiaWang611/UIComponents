var React = require('react-native');

var {
  PropTypes,
  ListView
} = React;

var isPromise = require('is-promise');
var delay = require('./../utils/delay');
var ControlledRefreshableListView = require('./ControlledRefreshableListView');

const LISTVIEW_REF = 'listview';

var RefreshableListView = React.createClass({
  propTypes: {
    loadData: PropTypes.func.isRequired,
    minDisplayTime: PropTypes.number,
    minBetweenTime: PropTypes.number,
    // props passed to child
    refreshPrompt: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    refreshDescription: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    minPulldownDistance: PropTypes.number,
  },
  getDefaultProps() {
    return {
      minDisplayTime: 300,
      minBetweenTime: 300,
      minPulldownDistance: 40,
    }
  },
  getInitialState() {
    return {
      isRefreshing: false,
    }
  },
  handleRefresh() {
    if (this.willRefresh) return;

    this.willRefresh = true;

    var loadingDataPromise = new Promise((resolve) => {
      var loadDataReturnValue = this.props.loadData(resolve);

      if (isPromise(loadDataReturnValue)) {
        loadingDataPromise = loadDataReturnValue;
      }

      Promise.all([
        loadingDataPromise,
        new Promise((resolve) => this.setState({isRefreshing: true}, resolve)),
        delay(this.props.minDisplayTime)
      ])
        .then(() => delay(this.props.minBetweenTime))
        .then(() => {
          this.willRefresh = false;
          this.setState({isRefreshing: false})
        })
    })
  },
  getScrollResponder() {
    return this.refs[LISTVIEW_REF].getScrollResponder()
  },
  setNativeProps(props) {
    this.refs[LISTVIEW_REF].setNativeProps(props)
  },
  render() {
    var isRefreshing = this.props.isRefreshing || this.state.isRefreshing;
    return (
      <ControlledRefreshableListView
        {...this.props}
        ref={LISTVIEW_REF}
        onRefresh={this.handleRefresh}
        isRefreshing={isRefreshing}
      />
    )
  }
});

RefreshableListView.DataSource = ListView.DataSource;

module.exports = RefreshableListView;
