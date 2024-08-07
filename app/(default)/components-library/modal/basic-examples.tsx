'use client'

import { useState } from 'react'
import ModalBasic from '@/components/modal-basic'

export default function BasicExamples() {

  const [basicModalOpen, setBasicModalOpen] = useState<boolean>(false)

  return (
    <div>
      <h2 className="text-2xl text-slate-800 dark:text-slate-100 font-bold mb-6">Basic</h2>
      <div className="flex flex-wrap items-center -m-1.5">

        <div className="m-1.5">
          <button className="btn bg-indigo-500 hover:bg-indigo-600 text-white" onClick={() => { setBasicModalOpen(true) }}>Basic Modal</button>
          <ModalBasic isOpen={basicModalOpen} setIsOpen={setBasicModalOpen} title="Basic Modal">
            <div className="px-5 pt-4 pb-1">
              <div className="text-sm">
                <div className="font-medium text-slate-800 dark:text-slate-100 mb-2">Let's Talk Paragraph</div>
                <div className="space-y-2">
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                  <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                </div>
              </div>
            </div>
            {/* Modal footer */}
            <div className="px-5 py-4">
              <div className="flex flex-wrap justify-end space-x-2">
                <button className="btn-sm border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 text-slate-600 dark:text-slate-300" onClick={() => { setBasicModalOpen(false) }}>Close</button>
                <button className="btn-sm bg-indigo-500 hover:bg-indigo-600 text-white">I Understand</button>
              </div>
            </div>
          </ModalBasic>
          {/* End */}
        </div>
      </div>
    </div>
  )
}
