import { expect, assert } from "chai"
import { ethers } from "hardhat"
import { SimpleStorage, SimpleStorage__factory } from "../typechain-types"

describe("SimpleStorage", function () {
  let simpleStorage: SimpleStorage
  let SimpleStorageFactory: SimpleStorage__factory
  beforeEach(async () => {
    SimpleStorageFactory = (await ethers.getContractFactory(
      "SimpleStorage"
    )) as SimpleStorage__factory
    simpleStorage = await SimpleStorageFactory.deploy()
  })

  it("Should start with a favorite number of 0", async function () {
    let currentValue = await simpleStorage.retrieve()
    expect(currentValue).to.equal(0)
  })
  it("Should update when we call the store", async function () {
    const expectedValue = "7"
    const transactionResponse = await simpleStorage.store(expectedValue)
    await transactionResponse.wait(1)

    const currentValue = await simpleStorage.retrieve()
    assert.equal(currentValue.toString(), expectedValue)
  })
  it("Should add person when we call the addPerson", async function () {
    const expectedPersonName = "Batuhan Kacmaz"
    const expectedFavoriteNumber = "7"
    const transactionResponse = await simpleStorage.addPerson(
      expectedPersonName,
      expectedFavoriteNumber
    )
    await transactionResponse.wait(1)
    const { favoriteNumber, name } = await simpleStorage.people(0)
    const selectedFavoriteNumber = await simpleStorage.nameToFavoriteNumber(
      expectedPersonName
    )

    assert.equal(name, expectedPersonName)
    assert.equal(favoriteNumber.toString(), expectedFavoriteNumber)
    assert.equal(selectedFavoriteNumber.toString(), expectedFavoriteNumber)
  })
})
