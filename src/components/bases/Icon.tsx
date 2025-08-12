import { Icon, IconProps } from '@iconify/react'
import React from 'react'

const IconifyIcon = React.memo(({ icon, ...rest }: IconProps) => {
  return <Icon icon={icon} fontSize='1.5rem' {...rest} />
})

export default IconifyIcon
