import { Component } from 'react'
import { createPortal } from 'react-dom'
import { MAP } from 'react-google-maps/lib/constants'
import PropTypes from 'prop-types'
export default class MapControl extends Component {

  static contextTypes = { [MAP]: PropTypes.object }

  componentWillMount() {
    this.map = this.context[MAP]
    this.controlDiv = document.createElement('div')
    this.map.controls[this.props.position].push(this.controlDiv)
  }

  render() {
    return createPortal(this.props.children, this.controlDiv)
  }
}