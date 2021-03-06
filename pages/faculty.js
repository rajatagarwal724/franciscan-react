import React, { Component } from 'react'
import { graphql, compose } from 'react-apollo'
import { SampleQuery } from '../lib/queries/posts'
import withData from '../lib/withData'
import Layout from '../components/Layout'
import withRoot from '../components/withRoot'

class Faculty extends Component {
  static async getInitialProps ({ query: { id } }) {
    console.log(id)
    return { id }
  }
  render () {
    const { data } = this.props
    const loading = data.loading
    if (loading) {
      return (
        <Layout>
          <h1>Loading</h1>
        </Layout>
      )
    }
    return (
      <Layout>
        <div
          dangerouslySetInnerHTML={{
            __html: data.faculty.edges[0].node.content
          }}
        />
      </Layout>
    )
  }
}

export default compose(
  withRoot,
  withData,
  graphql(SampleQuery, {
    options: ({ id }) => ({ variables: { name: id } })
  })
)(Faculty)
