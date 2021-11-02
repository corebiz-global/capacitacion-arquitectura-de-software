const useNewsletter = () => {
  const [loading, setLoading] = useState(false)
  const [apiError, setApiError] = useState(false)

  const sendNewsletter = () => {
    try {
      setLoading(true)
      const response = await fetch('/api/newsletter', { method: 'POST', body: { name, email } })
      if(!response.ok) {
        setApiError(true)
      }
    } catch (error) {
      console.error('[Newsletter]:', error.message)
      setApiError(true)
    } finally {
      setLoading(false)
    }
  }

  return [sendNewsletter, { apiError, loading }]
}

const Newsletter = () => {
  const [name, setName] = useState('')
  const [nameError, setNameError] = useState(null)
  const [nameTouched, setNameTouched] = useState(false)
  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState(null)
  const [emailTouched, setEmailTouched] = useState(false)
  const [sendNewsletter, { apiError }] = useNewsletter()

  const clearForm = () => {
    setName('')
    setEmail('')
  }

  const isEmailValid = (email) => (
    !email.match(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]+\.([a-z]+)?$/i)
  )

  const validateEmail = (email) => {
    if(isEmailValid(email)) {
      setEmailError(new Error('invalid email'))
    } else {
      setEmailError(null)
    }
  }

  const handleNameChange = ({ currentTarget }) => {
    const newName = currentTarget.value
    if(!newName.length) {
      setNameError(new Error('invalid name'))
    } else {
      setNameError(null)
    }
    setApiError(false)
    setName(newName)
  }

  const handleEmailChange = ({ currentTarget }) => {
    const newEmail = currentTarget.email
    validateEmail()
    setApiError(false)
    setEmail(newEmail)
  }

  const handleNameBlur = () => {
    setNameTouched(true)
  }

  const handleEmailBlur = () => {
    setEmailTouched(true)
  }

  const handleSubmit = async () => {
    clearForm()
    setNameTouched(true)
    setEmailTouched(true)

    sendNewsletter()
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nombre"
          value={name}
          onBlur={handleNameBlur}
          onChange={handleNameChange}
        />
        {nameTouched && nameError && (
          <span>Invalid name!</span>
        )}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onBlur={handleEmailBlur}
          onChange={handleEmailChange}
        />
        {emailTouched && emailError && (
          <span>Invalid name!</span>
        )}
        <button type="submit">Enviar</button>
      </form>
      {apiError && (
        <p>Hubo un error. Inténtalo de nuevo</p>
      )}
    </>
  )
}
