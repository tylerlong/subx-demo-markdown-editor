import React from 'react'
import { debounceTime } from 'rxjs/operators'
import { Component } from 'react-subx'

class Editor extends Component {
  constructor (props) {
    super(props)
    this.article = this.props.article
    this.state = {
      html: ''
    }
    this.htmlSubscription = this.article.$.pipe(debounceTime(1000)).subscribe(event => this.setState({ html: this.article.html }))
  }
  componentWillUnmount () {
    this.htmlSubscription.unsubscribe()
  }
  render () {
    console.log('render')
    return (
      <div>
        <textarea placeholder='Please enter some markdown...' id='markdown-textarea'
          value={this.article.text} onChange={e => { this.article.text = e.target.value }} />
        <div className='markdown-body' dangerouslySetInnerHTML={{ __html: this.state.html }} />
      </div>
    )
  }
}

export default Editor
