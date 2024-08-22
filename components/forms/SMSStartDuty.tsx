'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import * as React from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Form } from "@/components/ui/form"
import CustomFormField from "../CustomFormField"
import { SMS, Shifts, railGradesSMS } from "@/constants"
import { SelectItem } from "../ui/select"
import SubmitButton from "../SubmitButton"
import { useState } from "react"
import { SMSStartDutyFormValidation } from "@/lib/validation"
import { useRouter } from "next/navigation"
import { FormFieldType } from "./VisualInspectionShiftDetailsForm"


const SMSStartDutyForm = () => {
    const router = useRouter();

    const [isLoading, setIsLoading] = useState(false)
    
    const form = useForm<z.infer<typeof SMSStartDutyFormValidation>>({
        resolver: zodResolver(SMSStartDutyFormValidation),
        defaultValues: {
          date: new Date(Date.now()),
          shift: "",
          SMS: "",
          railGrade: "",
        },
      })
     
      async function onSubmit(values: z.infer<typeof SMSStartDutyFormValidation>) {
        setIsLoading(true);
        
        try {
            router.push('/SMS/home')
        } catch (error) {
            console.log(error)
        }
      }
      
  return (
    <div className="flex flex-col justify-evenly items-center min-h-[580px] bg-gray-100">
        <h1 className="text-3xl font-bold">SMS - Start Duty</h1>
        <div className="w-full max-w-lg p-8 border border-gray-300 rounded-lg bg-white shadow-lg">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
                    <div className="flex flex-col gap-6 sm:flex-row">
                        <CustomFormField 
                            fieldType={FormFieldType.DATE_PICKER}
                            control={form.control}
                            name='date'
                            label='Date'
                            placeholder='Date'
                            iconSrc='../assets/calendar.svg'
                            iconAlt='calendar'
                        />

                        <CustomFormField 
                            fieldType={FormFieldType.SELECT}
                            control={form.control}
                            name='shift'
                            label='Shift'
                            placeholder='Select a shift'
                        >
                            {Shifts.map(( shift ) => (
                                <SelectItem key={shift.name} value={shift.name}>
                                    <div className="flex cursor-pointer items-start gap-2">
                                        <p>{shift.name}</p>
                                    </div>
                                </SelectItem>
                            ))}
                        </CustomFormField>
                    </div>

                    <div className="flex flex-col gap-6 sm:flex-row">
                        <CustomFormField 
                            fieldType={FormFieldType.SELECT}
                            control={form.control}
                            name='SMS'
                            label='SMS'
                            placeholder='Select SMS'
                        >
                            {SMS.map(( sms ) => (
                                <SelectItem key={sms.name} value={sms.name}>
                                    <div className="flex cursor-pointer items-start gap-2">
                                        <p>{sms.name}</p>
                                    </div>
                                </SelectItem>
                            ))}
                        </CustomFormField>

                        <CustomFormField 
                            fieldType={FormFieldType.SELECT}
                            control={form.control}
                            name='railGrade'
                            label='Rail Grade'
                            placeholder='Select Rail Grade'
                        >
                            {railGradesSMS.map(( railGrade ) => (
                                <SelectItem key={railGrade.name} value={railGrade.name}>
                                    <div className="flex cursor-pointer items-start gap-2">
                                        <p>{railGrade.name}</p>
                                    </div>
                                </SelectItem>
                            ))}
                        </CustomFormField>
                    </div>

                    <hr />
                    
                    <div>
                        <p className="text-sm">These Shift Details will be applied to all the heats saved against these details.</p>
                    </div>

                    <hr />

                    <div className="flex justify-center">
                        <SubmitButton 
                            isLoading={isLoading}
                        >
                            Start Duty
                        </SubmitButton>
                    </div>
                </form>
            </Form>
        </div>
    </div>

  )
}

export default SMSStartDutyForm