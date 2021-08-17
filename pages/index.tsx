import Head from 'next/head'
import Image from 'next/image'
import Layout from '../components/layout'
import Checklist from '../components/checklist'

import { GetStaticProps } from 'next'
import { InferGetStaticPropsType } from 'next'

function Home({ checklist }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <div>
      <Head>
        <title>Checklist Do Dev</title>
        <meta name="description" content="Checklists para devs" />
      </Head>

      <Layout>
        <main>
          <h1 className="mb-4">Checklist Do Dev</h1>

          <div className="mb-7 prose">
            <p>
              Este roadmap possui as habilidades necessárias para trabalhar com desenvolvimento.
            </p>
          </div>

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
      checklist: new ChecklistModel().checklist()
    }
  }
}

export default Home
