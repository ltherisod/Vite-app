
const FormErrors = ({error}) => {
  return (
    <>
    {error && <small>{error.message}</small>}
    </>
  )
}

export default FormErrors