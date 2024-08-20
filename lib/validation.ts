import { z } from "zod";

export const ShiftDetailsFormValidation = z.object({
    date: z.coerce.date(),
    shift: z.string().min(1, "Select at least one shift"),
    mill: z.string().min(1, "Select at least one mill"),
    lineNumber: z
    .string()
    .min(1, "Line number must be 1 or 2 if mill is 'RSM'")
    .max(6, "Line number must be in the range from 1 to 6 if mill is 'URM'"),
    railGrade: z.string().min(1, "Select at least one railGrade"),
    railSection: z.string().min(1, "Select at least one railSection"),
    railLength: z.string().min(1, "Select at least one railLength"),
    IE: z.string().min(1, "Select at least one IE"),
    RCLIE: z
    .string()
    .min(1, "Enter something freely"),
  })

export const VisualHomeFormValidation = z.object({
  shiftRemarks: z
  .string()
  .min(1, "Give the shift remarks correctly"),
})

export const VisualInspectionFormValidation = z.object({
  date: z.string(),
  shift: z.string().min(1, "Enter at least one shift"),
  serialNumber: z
  .string()
  .min(3, "S. No. should be at least three digits")
  .max(3, "S. No. should be at most three digits"),
  heatNumber: z
  .string()
  .min(1, "Heat No. must be greater than or equal to 1"),
  heatStatus: z
  .string()
  .min(2, "Please enter something"),
  railLength: z.string().min(0.01, "Please enter rail length greater than 0"),
  railAcceptanceLength: z.string().min(1, "Select at least one railLength"),
  number: z.string().min(1, "Number should be greater than or equal to 1"),
  railClass: z.string().min(1, "Select at least one class"),
  defect: z.string().min(1, "Select at least one defect category"),
  type: z.string().min(1, "Select at least one defect type"),
  location: z.string().min(0.01, "Location must be greater than or equal to 0.01"),
  position: z.string().min(1, "Select at least one position"),
})