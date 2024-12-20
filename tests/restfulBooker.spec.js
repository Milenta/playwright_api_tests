const { test, expect } = require('@playwright/test')
import { faker } from '@faker-js/faker'

const { DateTime } = require('luxon')
const url = 'https://restful-booker.herokuapp.com'

let bookId = ''
const firstName = faker.person.firstName() // random first name

test('Create POST request using dinamic request body', async ({ request }) => {
  
  const lastName = faker.person.lastName() // random last name
  const totalPrice = faker.number.int(1000) // random number between 0 and 1000

  const checkInDate = DateTime.now().toFormat('yyyy-MM-dd') // doday's date
  const chedkOutDate = DateTime.now().plus({ day: 5 }).toFormat('yyyy-MM-dd')

  const postApiResponse = await request.post(`${url}/booking`, {
    data: {
      firstname: firstName,
      lastname: lastName,
      totalprice: totalPrice,
      depositpaid: true,
      bookingdates: {
        checkin: checkInDate,
        checkout: chedkOutDate,
      },
      additionalneeds: 'hero',
    },
  })
  // vlidate status code
  expect(postApiResponse.status()).toBe(200)

  const postApiResponseBody = await postApiResponse.json()
  console.log(postApiResponseBody)
  console.log(postApiResponseBody.bookingid)
  bookId = postApiResponseBody.bookingid
  // validate json api response
  expect(postApiResponseBody.booking).toHaveProperty('firstname', firstName)
  expect(postApiResponseBody.booking).toHaveProperty('lastname', lastName)
  // validate nasted json objects
  expect(postApiResponseBody.booking.bookingdates).toHaveProperty('checkin', checkInDate)
  expect(postApiResponseBody.booking.bookingdates).toHaveProperty('checkout', chedkOutDate)

  const getResponse = await request.get(`${url}/booking/${bookId}`) // double check if data is created
  expect(getResponse.status()).toBe(200)

})

test('Execute GET api request to get book', async({request})=>{
  const getResponse = await request.get(`${url}/booking/${bookId}`) // double check if data is created
  expect(getResponse.status()).toBe(200)

  const getResponse2 = await request.get(`${url}/booking/`, {
    params: {
'firstname' : firstName
    }
  }) // double check if data is created
  console.log('first name is ' + firstName)
  expect(getResponse2.status()).toBe(200)
})