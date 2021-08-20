import { useState, useEffect } from 'react'

import Head from 'next/head'
import Image from 'next/image'
import Layout from '../components/layout'
import Checklist from '../components/checklist'
import NewsletterForm from '../components/newsletter_form'

import { GetStaticProps } from 'next'
import { InferGetStaticPropsType } from 'next'

function Home({ checklist }: InferGetStaticPropsType<typeof getStaticProps>) {
  const [isNewsletterVisible, showNewsletter] = useState(false)

  return (
    <div>
      <Head>
        <title>Checklist Do Dev</title>
        <meta name="description" content="Checklists para devs" />
      </Head>

      <Layout>
        <main>
          <div className="mb-7 prose">
            <p>
              Use esta checklist na sua trajetória como desenvolvedor.&nbsp;
              <a onClick={() => showNewsletter(!isNewsletterVisible)}>
                Aprenda como usar essa checklist.
              </a>
              &nbsp;
              <a onClick={() => showNewsletter(!isNewsletterVisible)}>
                Inscreva-se para receber updates.
              </a>
            </p>
          </div>

          <NewsletterForm className={`${isNewsletterVisible ? "" : "hidden"}`} />

          <Checklist checklist={checklist}/>
        </main>
      </Layout>
    </div>
  )
}

export const getStaticProps = async (context) => {
  const { ChecklistModel } = require("../models/checklist")

  return {
    props: {
      checklist: ChecklistModel.all()
    }
  }
}

export default Home
