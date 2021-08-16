import React, { Fragment } from 'react'
import { GetStaticProps } from 'next'
import { InferGetStaticPropsType } from 'next'

function textToParagraph(text: string, options?: { tag: string }): string {
  var tag = "<p>"

  if (options?.tag) {
    tag = options?.tag
  }

  console.log(tag)
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
  let description = null

  if (task.description) {
    description = task.description;
  }

  return (
    <div className="py-1">
      <label className="inline-flex mt-1">
        <input type="checkbox" className="form-checkbox rounded mt-1.5" />
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
        <Task key={task.id} task={task} />
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
      .map(([listName, _]) => renderList(listName));
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
