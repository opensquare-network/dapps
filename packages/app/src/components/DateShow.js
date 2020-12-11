import React, { memo } from 'react'
import dayjs from 'dayjs'

export default memo(function DateShow(props) {
  const { value, className, style, format = 'YYYY-MM-DD HH:mm:ss' } = props

  return (
    <div className={className} style={style}>
      {value ? dayjs(value).format(format) : value}
    </div>
  )
})
