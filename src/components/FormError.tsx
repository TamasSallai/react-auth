type Props = {
  errorMessage: string
}

const FormError = ({ errorMessage }: Props) => {
  return (
    <p className="px-4 py-2 mt-2 font-medium rounded-sm outline outline-1 outline-red-700 bg-red-200 text-red-700">
      {errorMessage}
    </p>
  )
}

export default FormError
