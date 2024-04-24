import React from 'react'

type Props = {
  children: React.ReactNode
  style?: string
}

const Button = ({ children, style }: Props) => {
  return (
    <button
      className={`px-4 py-1.5 rounded-sm font-medium text-white bg-blue-600 hover:bg-blue-500 ${
        style ? style : ''
      }`}
    >
      {children}
    </button>
  )
}

export default Button
