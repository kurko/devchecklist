import React, { Fragment, useState, useEffect } from 'react'
import { GetStaticProps } from 'next'
import { InferGetStaticPropsType } from 'next'

function textToParagraph(text: string, options?: { tag: string }): string {
  var tag = "<p>"

  if (options?.tag) {
    tag = options?.tag
  }

  text = text.replace("\n\n", "</p>"+tag);
  text = `${tag}${text}</p>`;
  return text
}

/**
 * React won't render strings as HTML. It automatically converts `<` to `&lt;`.
 * This function returns a tag with text converted to final HTML. For example,
 *
 *     rawToHtml(description, { tag: "div", className: "ml-0 mt-0 mb-1 text-sm prose" })
 */
function rawToHtml(text: string, options?: { className: string }) {
  return (
    <div
      className={options?.className}
      dangerouslySetInnerHTML={{ __html: textToParagraph(text) }}>
    </div>
  )
}

function Task({ task }: InferGetStaticPropsType<GetStaticProps>) {
  const description = task.description
  const taskId = (id) => `task-${id}`
  const [checked, check] = useState(false);

  useEffect(() => {
    check(window.localStorage.getItem(taskId(task.id)) == "true")
  }, []); // only run on first render

  const handleCheck = (event) => {
    check(!checked)
    window.localStorage.setItem(taskId(task.id), `${!checked}`)
  }

  return (
    <div className="py-1">
      <label className="inline-flex mt-1">
        <input
          name="isTaskComplete"
          type="checkbox"
          className="form-checkbox rounded mt-1.5"
          checked={checked}
          onChange={handleCheck} />

        <div className="ml-2 mt-0 prose">
          <div className="ml-0 mt-0">
            {task.check}
          </div>

          {description && (
            <div className="pb-4">
              {rawToHtml(description, { className: "ml-0 text-sm prose" })}
            </div>
          )}
        </div>
      </label>
    </div>
  )
}

function TaskSet({ taskSet }: InferGetStaticPropsType<GetStaticProps>) {
  const tasks = taskSet.tasks;

  return (
    <div className="mb-8">
      {taskSet.description &&
        rawToHtml(taskSet.description, { className: "mt-6 prose" })
      }

      {tasks.map((task, index) => (
        <Task key={index} task={task} />
      ))}
    </div>
  )
}

function Checklist({ checklist }: InferGetStaticPropsType<GetStaticProps>) {
  const renderList = (listName) => {
    const list = checklist.lists[listName];
    const taskSets = list.taskSet;

    return (
      <>
        <h2>{list.title}</h2>

        {list.description &&
          rawToHtml(list.description, { className: "mt-2 mb-0 prose" })
        }

        {taskSets && taskSets.map((taskSet, index) => (
          <TaskSet key={index} taskSet={taskSet} />
        ))}
      </>
    )
  }

  const renderLists = () => {
    return Object
      .entries(checklist.lists)
      .map(([listName, _], key) => (
        <Fragment key={key}>
          {renderList(listName)}
        </Fragment>
      ));
  }

  return (
    <>
      <div>
        {renderLists()}
      </div>
    </>
  )
}

export default Checklist
