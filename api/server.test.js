// Write your tests here
const server = require("./server.js")
const request = require("supertest")


describe("GET /", () => {
  it("has process.env.DB_ENV as testing", () => {
    expect(process.env.NODE_ENV).toBe("testing")
  })

  it("returns 200 OK", () => {
    return request(server).get("/")
    .expect(200)
  })
})
