import { test, expect } from '@playwright/test'

const url = 'https://reqres.in/api'

test('response timings', async ({page})=> {
  const requestFinishedPromise = page.waitForEvent('requestfinished');
  await page.goto(`${url}/users/1`);
  const request = await requestFinishedPromise;
  console.log(request.timing());
})

test('api get first page test', async ({ request }) => {
    const requestAPI = await request.get(`${url}/users/1`, {})
    const body = await requestAPI.json()
    // console.log(await requestAPI.url())
    // console.table(await requestAPI.headers())
    // console.log(body.data.email)
    expect(requestAPI.ok()).toBeTruthy()
    expect(requestAPI.status()).toEqual(200)
    // console.log(await requestAPI.headers())
    expect(body.data.email).toEqual('george.bluth@reqres.in')
    expect(body.data.email).toBeTruthy()
    // expect(body.data.length).toBeGreaterThanOrEqual(1);
  })
  test('api get second page test', async ({ request }) => {
    const requestAPI = await request.get(`${url}/users/1`, {})
    const body = await requestAPI.json()
    // console.log(await requestAPI.url())
    // console.table(await requestAPI.headers())
    // console.log(body.data.email)
    expect(requestAPI.ok()).toBeTruthy()
    expect(requestAPI.status()).toEqual(200)
    // console.log(await requestAPI.headers())
    expect(body.data.email).toEqual('george.bluth@reqres.in')
    expect(body.data.email).toBeTruthy()
    // expect(body.data.length).toBeGreaterThanOrEqual(1);
  })

  test('api get first user test', async ({ request }) => {
    const requestAPI = await request.get(`${url}/users/1`, {})
    const body = await requestAPI.json()
    expect(requestAPI.status()).toEqual(200)
    expect(body.data.first_name).toEqual('George')
    expect(body.data.first_name).toBeTruthy()
    expect(body.data.last_name).toEqual('Bluth')
    expect(body.data.last_name).toBeTruthy()
  })
  test('api get second user test', async ({ request }) => {
    const requestAPI = await request.get(`${url}/users/2`, {})
    const body = await requestAPI.json()
    expect(requestAPI.status()).toEqual(200)
    expect(body.data.first_name).toBeTruthy()
    expect(body.data.last_name).toBeTruthy()
  })
  test('api get unexisting user test', async ({ request }) => {
    const requestAPI = await request.get(`${url}/users/23`, {})
    const body = await requestAPI.json()
    expect(requestAPI.status()).toEqual(404)
    expect(body).toEqual({}) // empty object
  })
  test('create user test', async ({ request }) => {
    const requestAPI = await request.post(`${url}/users?name=morpheus&job=QA manager`, {})
    const body = await requestAPI.json()
    expect(requestAPI.status()).toEqual(201)
    // console.log(body)
    expect(Number(body.id)).toBeGreaterThan(1)
    expect(body.id).toBeTruthy()
    expect(body.createdAt).toBeTruthy() // date can be compared and asserted
  })