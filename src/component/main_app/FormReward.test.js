const rewire = require("rewire")
const FormReward = rewire("./FormReward")
const mapStateToProps = FormReward.__get__("mapStateToProps")
// @ponicode
describe("mapStateToProps", () => {
    test("0", () => {
        let callFunction = () => {
            mapStateToProps({ rewardsForm: {} })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            mapStateToProps({ rewardsForm: undefined })
        }
    
        expect(callFunction).not.toThrow()
    })
})
