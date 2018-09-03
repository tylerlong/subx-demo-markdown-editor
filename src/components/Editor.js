import React from 'react'
import { debounceTime, map } from 'rxjs/operators'

class Editor extends React.Component {
  constructor (props) {
    super(props)
    this.propsChanged = this.propsChanged.bind(this)
    this.htmlChanged = this.htmlChanged.bind(this)
    this.article = props.article
    this.state = {
      html: this.article.html()
    }
    this.html$ = this.article.text$.pipe(debounceTime(1000), map(() => this.article.html()))
  }
  propsChanged () { // trigger render
    this.setState(this.state)
  }
  htmlChanged (html) {
    this.setState({ html })
  }
  componentDidMount () {
    this.article.text$.subscribe(this.propsChanged)
    this.html$.subscribe(this.htmlChanged)
  }
  componentWillUnmount () {
    this.article.text$.unsubscribe(this.propsChanged)
    this.html$.unsubscribe(this.htmlChanged)
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
