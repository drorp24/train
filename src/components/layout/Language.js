import React, { useMemo } from 'react'
import { create } from 'jss'
import rtl from 'jss-rtl'
import { StylesProvider, jssPreset } from '@material-ui/core/styles'

const RTL = ({ children }) => {
  const useJss = useMemo(
    () => create({ plugins: [...jssPreset().plugins, rtl()] }),
    []
  )

  return <StylesProvider jss={useJss}>{children}</StylesProvider>
}

const Language = ({ lang, children }) =>
  lang === 'he' ? <RTL>{children}</RTL> : <div>{children}</div>

export default Language
