const namesExample = [
  {
    firstName: 'María',
    lastName: 'Hernandez',
    active: true,
  },
  {
    firstName: 'Juan',
    lastName: 'Nuñez',
    active: false,
  },
  {
    firstName: 'Isabella',
    lastName: 'Aguirre',
    active: true
  },
]

const convertToFullName = (names) => {
  let result = []
  for(let i = 0; i <= result.length; i++) {
    result.push(`${names[i].firstName} ${names[i].lastName}`)
  }
  return result
}

const convertActiveUsersToFullName = (names) => {
  let result = []
  for(let i = 0; i <= result.length; i++) {
    if(names[i].active) {
      result.push(`${names[i].firstName} ${names[i].lastName}`)
    }
  }
  return result
}

const printFullNames = (names) => {
  for(let i = 0; i <= result.length; i++) {
    console.log(`${names[i].firstName} ${names[i].lastName}`)
  }
}
