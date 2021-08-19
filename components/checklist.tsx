import React, { Fragment, useState, useEffect } from 'react'
import { Transition } from '@headlessui/react'
import { GetStaticProps } from 'next'
import { InferGetStaticPropsType } from 'next'

import { ChecklistModel } from '../models/checklist'

var checklistModel


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
  const id = task.id
  const [checked, check] = useState(false);
  const [expanded, expand] = useState(false);

  useEffect(() => {
    check(checklistModel.isChecked(task.id))
  }, []); // only run on first render

  const handleCheck = (event) => {
    checklistModel.check(task.id, !checked)
    check(!checked)
  }
  const handleExpand = (event) => expand(description && !expanded)

  return (
    <div
      className={`
        -ml-2 pl-2 pr-2 -mr-2
        rounded-l
        py-1 my-1 transition-all transform duration-400
        ${expanded ? 'bg-blue-50' : ''}
      `}>
      <div
        className="inline-flex mt-1">

        <input
          name="isTaskComplete"
          type="checkbox"
          className="form-checkbox rounded mt-1.5"
          checked={checked}
          onChange={handleCheck} />

        <div className="ml-2 mt-0 prose">
          <div className="ml-0 mt-0" onClick={handleExpand}>
            {task.check}
          </div>

          {description && (
            <Transition
              show={expanded}
              enter="transform transition-height ease-in-out duration-100"
              enterFrom="h-0"
              enterTo="h-full"
              leave="transform transition-height ease-in-out duration-200"
              leaveFrom="h-full"
              leaveTo="h-0"
              className="overflow-y-hidden"
            >
              <div className="pb-4">
                {rawToHtml(description, { className: "ml-0 text-sm prose" })}
              </div>
            </Transition>
          )}
        </div>
      </div>
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
  checklistModel = new ChecklistModel(checklist)

  const renderList = (listName) => {
    const list = checklist.lists[listName];
    const taskSets = list.taskSet;
    const [expanded, expand] = useState(false);

    useEffect(() => {
      expand(true)
    }, [])

    return (
      <>
        <div onClick={() => expand(!expanded)} className="flex">
          <h2 className="flex-initial">
            {list.title}
          </h2>
        </div>

        <div className={expanded ? "" : "hidden"}>
          {list.description &&
            rawToHtml(list.description, { className: "mt-2 mb-0 prose" })
          }

          {taskSets && taskSets.map((taskSet, index) => (
            <TaskSet key={index} taskSet={taskSet} />
          ))}
        </div>
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
