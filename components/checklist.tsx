//import Model from '../models/checklist'

function Task({ task }: InferGetStaticPropsType<typeof getStaticProps>) {

}

function Checklist({ checklist }: InferGetStaticPropsType<typeof getStaticProps>) {
  const renderSection = (sectionName) => {
    const section = checklist[sectionName];
    const tasks = section.tasks;

    return (
      <>
        <h2>{section.title}</h2>

        {tasks.map((value, index) => (
          <div key={value.id} className="py-1">
            <label class="inline-flex">
              <input type="checkbox" class="form-checkbox rounded mt-1" />
              <span class="ml-2 mt-0">
                {value.check}
              </span>
            </label>
          </div>
        ))}
      </>
    )
  }

  return (
    <>
      <h1>Checklist</h1>
      <div>
        {renderSection('basic')}
      </div>
    </>
  )
}

export default Checklist
