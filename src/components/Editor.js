import React from 'react'
import { debounceTime } from 'rxjs/operators'

class Editor extends React.Component {
  componentWillMount () {
    this.article = this.props.article
    this.propsSubscription = this.article.$.subscribe(() => this.forceUpdate())
    this.htmlSubscription = this.article.$.pipe(debounceTime(1000)).subscribe(event => {
      this.html = this.article.html
      this.forceUpdate()
    })
  }
  componentWillUnmount () {
    this.propsSubscription.unsubscribe()
    this.htmlSubscription.unsubscribe()
  }
  render () {
    console.log('render')
    return (
      <div>
        <textarea placeholder='Please enter some markdown...' id='markdown-textarea'
          value={this.article.text} onChange={e => { this.article.text = e.target.value }} />
        <div className='markdown-body' dangerouslySetInnerHTML={{ __html: this.html }} />
      </div>
    )
  }
}

export default Editor
