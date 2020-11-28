// https://www.robinwieruch.de/javascript-fake-api

import { v4 as uuidv4 } from 'uuid'

const idOne = uuidv4()
const idTwo = uuidv4()

const timeout = 100

const users = {
  [idOne]: {
    id: idOne,
    username: 'super',
    password: 'user',
    authorizedTo: ['create'],
  },
  [idTwo]: {
    id: idTwo,
    username: 'dror',
    password: 'poliak',
    authorizedTo: ['read'],
  },
}

const getUsers = () =>
  new Promise((resolve, reject) => {
    if (!users) {
      return setTimeout(() => reject(new Error('Users not found')), timeout)
    }

    setTimeout(() => resolve(Object.values(users)), timeout)
  })

export const getUser = async ({ username, password }) => {
  console.log('args. username, password: ', username, password)
  try {
    const users = await getUsers()
    console.log('users: ', users)
    const userFound = users.find(
      user => user.username === username && user.password === password
    )
    console.log('userFound: ', userFound)
    if (userFound) return userFound
    throw new Error('No such user')
  } catch (error) {
    console.log('at catch')
    console.log(error)
  }
}

// Test

// getUser({ username: 'super', password: 'user' })
//   .then(user => console.log('user:', user))
//   .catch(error => console.error(error))

// getUser({ username: 'wrong', password: 'user' })
//   .then(user => console.log('user:', user))
//   .catch(error => console.error(error))
