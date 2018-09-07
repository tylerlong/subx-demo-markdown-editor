import React from 'react'
import { debounceTime, map } from 'rxjs/operators'

class Editor extends React.Component {
  componentWillMount () {
    this.article = this.props.article
    this.setState({
      html: this.article.html()
    })
    this.html$ = this.article.text$.pipe(debounceTime(1000), map(() => this.article.html()))
    this.propsSubscription = this.article.text$.subscribe(() => this.forceUpdate())
    this.htmlSubscription = this.html$.subscribe(html => this.setState({ html }))
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
        <div className='markdown-body' dangerouslySetInnerHTML={{ __html: this.state.html }} />
      </div>
    )
  }
}

export default Editor
