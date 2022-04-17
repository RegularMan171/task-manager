require('../src/db/mongoose')
const User = require('../src/models/user')

// User.findByIdAndUpdate('620e8cc3309bd61e19c1c758', {age: 1}).then((user) => {
//     console.log(user)
//     return User.countDocuments({age: 1})
// }).then((result) => {
//     console.log(result)
// }).catch((e) => {
//     console.log(e)
// })


const updateAgeAndCount = async (id, age) => {
    const user = await User.findByIdAndUpdate(id, {age})
    const count = await User.countDocuments({age})
    return count
}

updateAgeAndCount('6214c7f8fbf2db760eef4a25', 20).then((count) => {
    console.log(count)
}).catch((e) => {
    console.log(e)
})