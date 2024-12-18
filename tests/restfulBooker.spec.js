const { test, expect } = require('@playwright/test')
import { faker } from '@faker-js/faker'

const { DateTime } = require('luxon')
const url = 'https://restful-booker.herokuapp.com'

test.only('Create POST request using dinamic request body', async ({ request }) => {
  const firstName = faker.person.firstName() // random first name
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
  // validate json api response
  expect(postApiResponseBody.booking).toHaveProperty('firstname', firstName)
  expect(postApiResponseBody.booking).toHaveProperty('lastname', lastName)
  // validate nasted json objects
  expect(postApiResponseBody.booking.bookingdates).toHaveProperty('checkin', checkInDate)
  expect(postApiResponseBody.booking.bookingdates).toHaveProperty('checkout', chedkOutDate)
})
