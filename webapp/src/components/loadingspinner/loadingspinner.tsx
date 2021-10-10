import * as React from 'react'
import { Spinner, SpinnerSize } from '@fluentui/react'

interface IProps {
  isLoading: boolean
}

export const LoadingSpinner = (props: IProps) => {
  if (!props.isLoading) {
    return null
  }

  return <Spinner size={SpinnerSize.large} />
}