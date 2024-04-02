import React from 'react'
import { InternHeader } from '../_components/intern-header'
import { GenereateInternLink } from '../_components/generate-link'
import { InternTable } from '../_components/intern-table'


function InternPage() {
  return (
    <div>
        <div>
            <InternHeader/>
        </div>

        <div>
            <GenereateInternLink/>
        </div>

        <div className='mx-3 my-5'>
          <InternTable/>
        </div>
    </div>
  )
}

export default InternPage