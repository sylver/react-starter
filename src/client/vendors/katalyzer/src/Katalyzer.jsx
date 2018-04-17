import { Component }  from 'react'
import PropTypes      from 'prop-types'

const themePropType = PropTypes.shape({
  palette: PropTypes.shape({
    primary: PropTypes.shape({
      color: PropTypes.string.isRequired,
      accent: PropTypes.string.isRequired,
    }).isRequired,
    secondary: PropTypes.shape({
      color: PropTypes.string.isRequired,
      accent: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  styles: PropTypes.isRequired,
})

class Katalyzer extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    theme: themePropType.isRequired,
  }

  static defaultProps = {
  }

  static childContextTypes = {
    theme: themePropType.isRequired,
  }

  getChildContext () {
    return {
      theme: this.props.theme || {},
    }
  }

  render () {
    return this.props.children
  }
}

export default Katalyzer
