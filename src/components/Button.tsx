import React, { ButtonHTMLAttributes } from 'react'

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode
  className?: string
}

const Button = ({ children, className, ...props }: Props) => {
  return (
    <button
      className={`px-4 py-2 rounded-sm font-medium text-white bg-blue-600 hover:bg-blue-500 disabled:bg-blue-400 ${
        className && className
      }`}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button
