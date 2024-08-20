import VisualInspectionShiftDetailsForm from '@/components/forms/VisualInspectionShiftDetailsForm'
import React from 'react'

const page = () => {
  return (
    <div className='flex h-screen max-h-screen'>
      <section className='remove-scrollbar container my-auto'>
        <div className='sub-container max-w-[620px]'>
          <VisualInspectionShiftDetailsForm />
        </div>
      </section>
    </div>
  )
}

export default page