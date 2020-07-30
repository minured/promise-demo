// promise基本使用

// const p1 = new Promise((resolve, reject) => {
//     const num = Math.random() * 10
//     if (num >= 5) {
//         resolve(num)
//     } else {
//         reject(num)
//     }
// })
// p1.then((num) => {
//     console.log(`数字大于等于5: ${num}`)
// }, (num) => {
//     console.log(`数字小于5: ${num}`)
// })



// function getRandom() {
//     return new Promise((resolve, reject) => {
//         const num = Math.random() * 10
//         if (num >= 5) {
//             resolve(num)
//         } else {
//             reject(num)
//         }
//     })
// }
// getRandom().then((num) => {
//     console.log(`resolve, 大于5, ${num}`)
//     return new Promise((resolve, reject) => {
//         reject()
//     })
// }, (num) => {
//     console.log(`reject, 小于5, ${num}`)
//     return new Promise((resolve, reject) => {
//         reject()
//     })
// }).then((result) => {
//     console.log("第二次resolve")
// }, (result) => {
//     console.log("第二次reject")
// })


// Promise.all
// const p1 = new Promise((resolve, reject) => {
//     const num = Math.random() * 10
//     if (num >= 5) {
//         resolve(num)
//     } else {
//         reject(num)
//     }
// })
// const p2 = new Promise((resolve, reject) => {
//     const num = Math.random() * 10
//     if (num >= 5) {
//         resolve(num)
//     } else {
//         reject(num)
//     }
// })

// Promise.all([p1, p2]).then((result) => {
//     console.log(`成功, ${result}`)
// }, (result) => {
//     console.log(`失败, ${result}`)
// })


// Promise.race
// const p1 = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         resolve("成功1")
//     }, 2000)
// })

// const p2 = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         // reject("失败")
//         resolve("成功2")
//     }, 1000);
// })

// Promise.all([p1, p2]).then((result) => {
//     console.log(result)
// }, (result) => {
//     console.log(result)
// })
// Promise.race([p1, p2]).then((result) => {
//     console.log(result)
// }, (result) => {
//     console.log(result)
// })

// 手写一个Promise
function MyPromise(executor) {

    var _this = this
    console.log(this)
    // 状态信息
    this.state = 'pending'
    this.value = undefined
    this.reason = undefined

    executor(resolve, reject)


    function resolve(value) {

        // 为什么执行时的this变成window
        // 函数resolve 传给了 executor
        // executor 是一个箭头函数
        console.log(this)

        if (_this.state === 'pending') {
            _this.value = value
            _this.state = "resolved"
        }
    }
    function reject(reason) {
        if (_this.state === 'pending') {
            _this.reason = reason
            _this.state = 'rejected'
        }

    }
}

MyPromise.prototype.then = function(onFulfilled, onRejected) {
    if (this.state === 'resolved') {
        if (typeof onFulfilled === 'function') {
            onFulfilled(this.value)
        }
    }
    if (this.state === 'rejected') {
        if (typeof onRejected === 'function') {
            onRejected(this.reason)
        }
    }
}


const p1 = new MyPromise((resolve, reject) => {
    console.log('执行了')
    const num = Math.random() * 10
    if (num >= 5) {

        // 看这个resolve的执行时机, 
        // executor是一个箭头函数
        resolve(num)
        console.log(this)  //window
    
    } else {
        reject(num)
    }
})
p1.then((result) => {
    console.log(`成功: ${result}`)
}, (result) => {
    console.log(`失败: ${result}`)
})
