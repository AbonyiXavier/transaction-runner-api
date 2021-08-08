import faker from 'faker'


export const userOne  = {
  full_name: faker.name.firstName(),
  email: 'xavierfrancis@gmail.com',
  password: 'password',
}

export const userTwo  = {
    full_name: faker.name.firstName(),
    email: 'xavierfrancis@gmail.com',
    password: 'password',
  }

export const fakeUser = {
    full_name: faker.name.findName()
}

export const inValidAccount = {
  full_name: faker.name.firstName(),
  password: 'password'
}

