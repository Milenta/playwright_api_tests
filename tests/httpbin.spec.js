import { test, expect } from '@playwright/test'

let employName = 'Marko'
let DOB = '26.09.1989'
let department = 'QA automation'
let joiningDate = '01.01.2025'
const data = {
  empName: employName,
  empBirthDate: DOB,
  empJoinDate: joiningDate,
  empDepartment: department,
}

test('api post test', async ({ request }) => {
  const requestAPI = await request.post(`/post`, { data })
  expect(requestAPI.ok()).toBeTruthy()
  const body = await requestAPI.json()
  // console.log(body)
  // console.log(body.json)
  expect(body.json).toEqual(expect.objectContaining(data))
})
const data2 = {
  emp2Name: 'Marko',
  emp2DOB: '26.09.1989',
}
test('api test 2', async ({ request }) => {
  const apiRequest = await request.post('/post', { data2 })
})
