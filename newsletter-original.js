const Newsletter = () => {
  const [name, setName] = useState('')
  const [nameError, setNameError] = useState(null)
  const [nameTouched, setNameTouched] = useState(false)
  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState(null)
  const [emailTouched, setEmailTouched] = useState(false)
  const [apiError, setApiError] = useState(false)

  const handleNameChange = event => {
    setServerError(false)
    setName(event.currentTarget.value)
  }

  const handleEmailChange = event => {
    setServerError(false)
    setEmail(event.currentTarget.value)
  }

  const handleNameBlur = () => {
    setNameTouched(true)
  }

  const handleEmailBlur = () => {
    setEmailTouched(true)
  }

  const handleSubmit = async () => {
    setName('')
    setEmail('')
    setNameTouched(true)
    setEmailTouched(true)

    try {
      const response = await fetch('/api/newsletter', { method: 'POST', body: { name, email } })
      if(!response.ok) {
        setApiError(true)
      }
    } catch (error) {
      console.error('[Newsletter]:', error.message)
      setApiError(true)
    }
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
