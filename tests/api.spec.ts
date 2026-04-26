import { test, expect } from '@playwright/test'

const API_KEY = process.env.REQRES_API_KEY ?? ''


//ก่อนรันใช้คำสั่ง => set REQRES_API_KEY=reqres_01b5e4dd43454445bfedb0d1c5a2d70d && npx playwright test api.spec.ts

test.describe('GET /api/users', () => {

    test('Get user profile success', async ({ request }) => {
        const response = await request.get('https://reqres.in/api/users/12', {
            headers: {
                'x-api-key': API_KEY
            }
        })

        expect(response.status()).toBe(200)

        const body = await response.json()
        const user = body.data

        expect(user.id).toBe(12)
        expect(user.email).toBe('rachel.howell@reqres.in')
        expect(user.first_name).toBe('Rachel')
        expect(user.last_name).toBe('Howell')
        expect(user.avatar).toBe('https://reqres.in/img/faces/12-image.jpg')
    })

    test('Get user profile but user not found', async ({ request }) => {
        const response = await request.get('https://reqres.in/api/users/1234', {
            headers: {
                'x-api-key': API_KEY
            }
        })

        expect(response.status()).toBe(404)

        const body = await response.json()
        expect(body).toEqual({})
    })

})