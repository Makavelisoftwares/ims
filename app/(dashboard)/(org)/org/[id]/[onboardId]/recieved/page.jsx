import { OnBoardHeader } from '@/app/(dashboard)/(org)/_components/onboard-header'
import React from 'react'
import { AssignmentDisplay } from './_components/assignment-display';

function RecievedPage({params}) {

  const orgId = params.id;
  const onBoardId = params.onboardId;

  return (
    <div>
      <div>
        <OnBoardHeader onboardId={onBoardId} orgId={orgId}/>
      </div>

      <div>
        <AssignmentDisplay id={onBoardId}/>
      </div>
    </div>
  )
}

export default RecievedPage